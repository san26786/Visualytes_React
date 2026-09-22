"use client";

import { useCallback, useEffect, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  ExternalLink,
  Highlighter,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
} from "lucide-react";

import { readingMinutes, type TiptapDoc } from "@/src/lib/blog/tiptap";
import { ApiError, blogApi } from "../../blog/_lib/api";
import { useToast } from "../UI/Toast";
import { MediaPickerDialog } from "./MediaPickerDialog";

type Props = {
  /** Loaded once when the editor mounts; the editor owns the document afterwards. */
  initialContent: TiptapDoc;
  onChange: (doc: TiptapDoc) => void;
  placeholder?: string;
  error?: string;
  minHeight?: number;
  /** Distance in px the toolbar keeps from the top while scrolling (below a sticky header). */
  stickyTop?: number;
  disabled?: boolean;
};

const BLOCKS = [
  { value: "paragraph", label: "Paragraph" },
  { value: "h1", label: "Heading 1" },
  { value: "h2", label: "Heading 2" },
  { value: "h3", label: "Heading 3" },
  { value: "h4", label: "Heading 4" },
  { value: "h5", label: "Heading 5" },
  { value: "h6", label: "Heading 6" },
  { value: "codeBlock", label: "Code block" },
] as const;

function normalizeUrl(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(value)) return value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return `mailto:${value}`;
  return `https://${value}`;
}

function blockOf(editor: Editor) {
  if (editor.isActive("codeBlock")) return "codeBlock";
  for (let level = 1; level <= 6; level++) {
    if (editor.isActive("heading", { level })) return `h${level}`;
  }
  return "paragraph";
}

export default function RichTextEditor({
  initialContent,
  onChange,
  placeholder = "Start writing your article…",
  error,
  minHeight = 460,
  stickyTop = 64,
  disabled = false,
}: Props) {
  const { showToast } = useToast();
  const openLinkRef = useRef<() => void>(() => {});
  const editorRef = useRef<Editor | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const uploadAndInsert = useCallback(
    async (files: File[]) => {
      for (const file of files) {
        try {
          const media = await blogApi.upload(file);
          editorRef.current
            ?.chain()
            .focus()
            .setImage({ src: media.url, alt: file.name.replace(/\.[^/.]+$/, "") })
            .run();
        } catch (err) {
          showToast(`${file.name}: ${err instanceof ApiError ? err.message : "Upload failed."}`, "error");
        }
      }
    },
    [showToast]
  );

  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        link: { openOnClick: false, autolink: true, linkOnPaste: true, defaultProtocol: "https" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      TextStyle,
      Color,
    ],
    content: initialContent,
    onUpdate: ({ editor: instance }) => onChangeRef.current(instance.getJSON() as TiptapDoc),
    onCreate: ({ editor: instance }) => {
      editorRef.current = instance;
    },
    editorProps: {
      attributes: {
        class: "rte-content px-6 py-5 outline-none",
        style: `min-height:${minHeight}px`,
        "aria-label": "Article content",
      },
      handleKeyDown: (_view, event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          openLinkRef.current();
          return true;
        }
        return false;
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"));
        if (!files.length) return false;
        void uploadAndInsert(files);
        return true;
      },
      handleDrop: (_view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((f) => f.type.startsWith("image/"));
        if (!files.length) return false;
        event.preventDefault();
        void uploadAndInsert(files);
        return true;
      },
    },
  });

  if (!editor) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="h-12 animate-pulse border-b border-slate-100 bg-slate-50" />
        <div style={{ minHeight }} className="flex items-center justify-center text-xs text-slate-400">
          Loading editor…
        </div>
      </div>
    );
  }

  // The toolbar lives in a child so useEditorState always receives a real editor instance
  // (Tiptap 3 does not re-subscribe a state hook that started with a null editor).
  return (
    <EditorBody
      editor={editor}
      error={error}
      minHeight={minHeight}
      stickyTop={stickyTop}
      disabled={disabled}
      openLinkRef={openLinkRef}
    />
  );
}

function EditorBody({
  editor,
  error,
  stickyTop,
  disabled,
  openLinkRef,
}: {
  editor: Editor;
  error?: string;
  minHeight: number;
  stickyTop: number;
  disabled: boolean;
  openLinkRef: MutableRefObject<() => void>;
}) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    openLinkRef.current = () => {
      setLinkValue((editor.getAttributes("link").href as string | undefined) ?? "");
      setLinkOpen(true);
    };
  }, [editor, openLinkRef]);

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      block: blockOf(e),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      code: e.isActive("code"),
      highlight: e.isActive("highlight"),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      link: e.isActive("link"),
      image: e.isActive("image"),
      imageAlt: (e.getAttributes("image").alt as string | undefined) ?? "",
      alignLeft: e.isActive({ textAlign: "left" }),
      alignCenter: e.isActive({ textAlign: "center" }),
      alignRight: e.isActive({ textAlign: "right" }),
      alignJustify: e.isActive({ textAlign: "justify" }),
      color: (e.getAttributes("textStyle").color as string | undefined) ?? "#0f172a",
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
      text: e.getText(),
    }),
  });

  const words = state.text.trim() ? state.text.trim().split(/\s+/).length : 0;
  const minutes = readingMinutes({ type: "text", text: state.text });

  const setBlock = (value: string) => {
    const chain = editor.chain().focus();
    if (value === "paragraph") chain.setParagraph().run();
    else if (value === "codeBlock") chain.setCodeBlock().run();
    else chain.setHeading({ level: Number(value.slice(1)) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
  };

  const openLinkBar = () => {
    setLinkValue((editor.getAttributes("link").href as string | undefined) ?? "");
    setLinkOpen((open) => !open);
  };

  const applyLink = () => {
    const url = normalizeUrl(linkValue);
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setLinkOpen(false);
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkOpen(false);
  };

  const showBar = linkOpen || state.image;

  return (
    <div>
      <div
        className={`rounded-2xl border bg-white shadow-sm transition ${
          error ? "border-rose-300" : "border-slate-200 focus-within:border-cyan-400"
        }`}
      >
        <div
          style={{ top: stickyTop }}
          className="sticky z-20 rounded-t-2xl border-b border-slate-200 bg-slate-50/95 backdrop-blur"
        >
          <div className="flex flex-wrap items-center gap-1 p-2">
            <select
              aria-label="Text style"
              value={state.block}
              disabled={disabled}
              onChange={(event) => setBlock(event.target.value)}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-cyan-500"
            >
              {BLOCKS.map((block) => (
                <option key={block.value} value={block.value}>
                  {block.label}
                </option>
              ))}
            </select>

            <Divider />

            <Btn title="Bold (Ctrl+B)" active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
              <Bold size={15} />
            </Btn>
            <Btn title="Italic (Ctrl+I)" active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
              <Italic size={15} />
            </Btn>
            <Btn title="Underline (Ctrl+U)" active={state.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}>
              <UnderlineIcon size={15} />
            </Btn>
            <Btn title="Strikethrough" active={state.strike} onClick={() => editor.chain().focus().toggleStrike().run()}>
              <Strikethrough size={15} />
            </Btn>
            <Btn title="Inline code" active={state.code} onClick={() => editor.chain().focus().toggleCode().run()}>
              <Code size={15} />
            </Btn>
            <Btn title="Highlight" active={state.highlight} onClick={() => editor.chain().focus().toggleHighlight().run()}>
              <Highlighter size={15} />
            </Btn>
            <label
              title="Text colour"
              className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-white text-sm font-bold transition hover:border-slate-200 hover:bg-slate-100"
            >
              <span style={{ color: state.color }}>A</span>
              <span className="absolute bottom-1 h-0.5 w-4 rounded-full" style={{ backgroundColor: state.color }} />
              <input
                type="color"
                value={/^#[0-9a-f]{6}$/i.test(state.color) ? state.color : "#0f172a"}
                onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="Text colour"
              />
            </label>

            <Divider />

            <Btn title="Bullet list" active={state.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <List size={16} />
            </Btn>
            <Btn title="Numbered list" active={state.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <ListOrdered size={16} />
            </Btn>
            <Btn title="Blockquote" active={state.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              <Quote size={15} />
            </Btn>
            <Btn title="Code block" active={state.block === "codeBlock"} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
              <Code2 size={15} />
            </Btn>
            <Btn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              <Minus size={15} />
            </Btn>

            <Divider />

            <Btn title="Align left" active={state.alignLeft} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
              <AlignLeft size={15} />
            </Btn>
            <Btn title="Align centre" active={state.alignCenter} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
              <AlignCenter size={15} />
            </Btn>
            <Btn title="Align right" active={state.alignRight} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
              <AlignRight size={15} />
            </Btn>
            <Btn title="Justify" active={state.alignJustify} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
              <AlignJustify size={15} />
            </Btn>

            <Divider />

            <Btn title="Link (Ctrl+K)" active={state.link || linkOpen} onClick={openLinkBar}>
              <LinkIcon size={15} />
            </Btn>
            <Btn title="Insert image" onClick={() => setPickerOpen(true)}>
              <ImagePlus size={16} />
            </Btn>

            <Divider />

            <Btn title="Undo (Ctrl+Z)" disabled={!state.canUndo} onClick={() => editor.chain().focus().undo().run()}>
              <Undo2 size={15} />
            </Btn>
            <Btn title="Redo (Ctrl+Shift+Z)" disabled={!state.canRedo} onClick={() => editor.chain().focus().redo().run()}>
              <Redo2 size={15} />
            </Btn>
            <Btn
              title="Clear formatting"
              onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            >
              <RemoveFormatting size={15} />
            </Btn>
          </div>

          {showBar && (
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 bg-white px-3 py-2">
              {linkOpen ? (
                <>
                  <LinkIcon size={14} className="text-slate-400" />
                  <input
                    autoFocus
                    value={linkValue}
                    onChange={(event) => setLinkValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        applyLink();
                      }
                      if (event.key === "Escape") {
                        setLinkOpen(false);
                        editor.commands.focus();
                      }
                    }}
                    placeholder="Paste or type a link, e.g. https://visualytes.com/contact-us"
                    className="h-8 min-w-[220px] flex-1 rounded-lg border border-slate-200 px-2.5 text-xs outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
                  />
                  <button type="button" onClick={applyLink} className="h-8 rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white transition hover:bg-slate-800">
                    Apply
                  </button>
                  {state.link && (
                    <>
                      <a
                        href={(editor.getAttributes("link").href as string) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        <ExternalLink size={12} /> Open
                      </a>
                      <button type="button" onClick={removeLink} className="flex h-8 items-center gap-1 rounded-lg border border-rose-200 px-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50">
                        <Unlink size={12} /> Remove
                      </button>
                    </>
                  )}
                  <button type="button" onClick={() => setLinkOpen(false)} className="h-8 rounded-lg px-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100">
                    Close
                  </button>
                </>
              ) : (
                <>
                  <ImagePlus size={14} className="text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500">Alt text</span>
                  <input
                    value={state.imageAlt}
                    onChange={(event) => editor.chain().updateAttributes("image", { alt: event.target.value }).run()}
                    placeholder="Describe this image for screen readers & SEO"
                    maxLength={300}
                    className="h-8 min-w-[220px] flex-1 rounded-lg border border-slate-200 px-2.5 text-xs outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
                  />
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteSelection().run()}
                    className="h-8 rounded-lg border border-rose-200 px-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    Remove image
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <EditorContent editor={editor} />

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-b-2xl border-t border-slate-100 bg-slate-50/60 px-4 py-2 text-[11px] text-slate-500">
          <span>
            {words.toLocaleString()} words · {minutes} min read
          </span>
          <span className="hidden sm:inline">Tip: paste or drag images straight into the article · Ctrl+K adds a link</span>
        </div>
      </div>

      {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}

      <MediaPickerDialog
        open={pickerOpen}
        askAlt
        title="Insert image"
        confirmLabel="Insert image"
        onClose={() => setPickerOpen(false)}
        onPick={(media, alt) => {
          editor
            .chain()
            .focus()
            .setImage({ src: media.url, alt: alt || media.alt || "" })
            .run();
          setPickerOpen(false);
        }}
      />
    </div>
  );
}

function Btn({
  children,
  onClick,
  title,
  active = false,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  title: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      // Keep the editor selection when the toolbar is clicked.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-slate-600 transition ${
        active ? "border-cyan-300 bg-cyan-100 text-cyan-700" : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-100"
      } ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px bg-slate-200" />;
}
