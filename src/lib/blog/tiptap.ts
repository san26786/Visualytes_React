/**
 * Shared (server + client) helpers for the Tiptap JSON document that stores a
 * blog article body. Nothing here touches the DOM or the database.
 */

export type TiptapMark = { type: string; attrs?: Record<string, unknown> };

export type TiptapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
};

export type TiptapDoc = TiptapNode & { type: "doc"; content: TiptapNode[] };

export const EMPTY_DOC: TiptapDoc = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export const MAX_DOC_BYTES = 2 * 1024 * 1024;
const MAX_DEPTH = 24;

const ALIGNMENTS = new Set(["left", "center", "right", "justify"]);
const COLOR_PATTERN =
  /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)|[a-z]{3,20})$/i;

/** Allow http(s), mailto, tel, in-page anchors and site-relative paths only. */
export function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const url = value.trim();
  if (!url || url.length > 2048) return null;
  if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) return url;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#")) return url;
  return null;
}

/** Image sources may not be `mailto:`/`tel:`/anchors, and `data:` is never allowed. */
export function safeImageUrl(value: unknown): string | null {
  const url = safeUrl(value);
  if (!url || /^(mailto:|tel:|#)/i.test(url)) return null;
  return url;
}

export function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function cleanColor(value: unknown) {
  return typeof value === "string" && COLOR_PATTERN.test(value.trim())
    ? value.trim()
    : undefined;
}

function cleanText(value: unknown, max = 500) {
  return typeof value === "string" && value ? value.slice(0, max) : undefined;
}

function sanitizeMarks(marks: unknown): TiptapMark[] | undefined {
  if (!Array.isArray(marks)) return undefined;
  const out: TiptapMark[] = [];

  for (const raw of marks) {
    if (!raw || typeof raw !== "object") continue;
    const mark = raw as TiptapMark;
    const attrs = (mark.attrs ?? {}) as Record<string, unknown>;

    switch (mark.type) {
      case "bold":
      case "italic":
      case "underline":
      case "strike":
      case "code":
        out.push({ type: mark.type });
        break;
      case "link": {
        const href = safeUrl(attrs.href);
        if (href) out.push({ type: "link", attrs: { href } });
        break;
      }
      case "highlight": {
        const color = cleanColor(attrs.color);
        out.push({ type: "highlight", ...(color ? { attrs: { color } } : {}) });
        break;
      }
      case "textStyle": {
        const color = cleanColor(attrs.color);
        if (color) out.push({ type: "textStyle", attrs: { color } });
        break;
      }
    }
  }

  return out.length ? out : undefined;
}

const INLINE = new Set(["text", "hardBreak"]);

/** Block containers may only hold blocks: wrap stray inline runs (e.g. from an unknown node) in paragraphs. */
function toBlocks(nodes: TiptapNode[]): TiptapNode[] {
  const out: TiptapNode[] = [];
  let run: TiptapNode[] = [];
  const flush = () => {
    if (run.length) out.push({ type: "paragraph", content: run });
    run = [];
  };
  for (const node of nodes) {
    if (INLINE.has(node.type)) run.push(node);
    else {
      flush();
      out.push(node);
    }
  }
  flush();
  return out;
}

function sanitizeNode(raw: unknown, depth: number): TiptapNode[] {
  if (!raw || typeof raw !== "object" || depth > MAX_DEPTH) return [];
  const node = raw as TiptapNode;
  const attrs = (node.attrs ?? {}) as Record<string, unknown>;

  const children = (): TiptapNode[] | undefined => {
    if (!Array.isArray(node.content)) return undefined;
    const list = node.content.flatMap((child) => sanitizeNode(child, depth + 1));
    return list.length ? list : undefined;
  };

  const align = (): Record<string, unknown> =>
    typeof attrs.textAlign === "string" && ALIGNMENTS.has(attrs.textAlign)
      ? { textAlign: attrs.textAlign }
      : {};

  switch (node.type) {
    case "text": {
      if (typeof node.text !== "string" || !node.text) return [];
      const marks = sanitizeMarks(node.marks);
      return [{ type: "text", text: node.text, ...(marks ? { marks } : {}) }];
    }
    case "paragraph": {
      const content = children();
      const a = align();
      return [
        {
          type: "paragraph",
          ...(Object.keys(a).length ? { attrs: a } : {}),
          ...(content ? { content } : {}),
        },
      ];
    }
    case "heading": {
      const level = Math.min(6, Math.max(1, Number(attrs.level) || 2));
      const content = children();
      return [
        {
          type: "heading",
          attrs: { level, ...align() },
          ...(content ? { content } : {}),
        },
      ];
    }
    case "bulletList": {
      const content = children();
      return content ? [{ type: "bulletList", content }] : [];
    }
    case "blockquote": {
      const content = children();
      return content ? [{ type: "blockquote", content: toBlocks(content) }] : [];
    }
    case "orderedList": {
      const content = children();
      const start = Math.max(1, Math.floor(Number(attrs.start) || 1));
      return content ? [{ type: "orderedList", attrs: { start }, content }] : [];
    }
    case "listItem": {
      const content = children();
      return [{ type: "listItem", content: content ? toBlocks(content) : [{ type: "paragraph" }] }];
    }
    case "codeBlock": {
      const content = children();
      const language = cleanText(attrs.language, 40);
      return [
        {
          type: "codeBlock",
          ...(language ? { attrs: { language } } : {}),
          ...(content ? { content } : {}),
        },
      ];
    }
    case "hardBreak":
    case "horizontalRule":
      return [{ type: node.type }];
    case "image": {
      const src = safeImageUrl(attrs.src);
      if (!src) return [];
      const alt = cleanText(attrs.alt, 300);
      const title = cleanText(attrs.title, 300);
      return [
        {
          type: "image",
          attrs: { src, ...(alt ? { alt } : {}), ...(title ? { title } : {}) },
        },
      ];
    }
    default:
      // Unknown block: keep its children rather than silently losing text.
      return Array.isArray(node.content)
        ? node.content.flatMap((child) => sanitizeNode(child, depth + 1))
        : [];
  }
}

/**
 * Rebuilds a document from a strict whitelist of nodes, marks and attributes.
 * Returns null when the input is not a Tiptap document at all.
 */
export function sanitizeTiptapDoc(input: unknown): TiptapDoc | null {
  if (!input || typeof input !== "object") return null;
  const doc = input as TiptapNode;
  if (doc.type !== "doc") return null;

  const content = toBlocks(
    Array.isArray(doc.content) ? doc.content.flatMap((child) => sanitizeNode(child, 1)) : []
  );

  return { type: "doc", content: content.length ? content : [{ type: "paragraph" }] };
}

/** Lenient parse for values read back from the database. */
export function toTiptapDoc(value: unknown): TiptapDoc {
  let candidate = value;
  if (typeof candidate === "string") {
    try {
      candidate = JSON.parse(candidate);
    } catch {
      return EMPTY_DOC;
    }
  }
  return sanitizeTiptapDoc(candidate) ?? EMPTY_DOC;
}

export function extractPlainText(node: TiptapNode | null | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.text ?? "";
  const parts = (node.content ?? []).map(extractPlainText);
  const separator = node.type === "doc" || node.type === "listItem" || node.type === "blockquote" ? "\n" : " ";
  return parts.join(separator);
}

export function hasImage(node: TiptapNode | null | undefined): boolean {
  if (!node) return false;
  if (node.type === "image") return true;
  return (node.content ?? []).some(hasImage);
}

/** An article body counts as "written" if it has text or at least one image. */
export function hasMeaningfulContent(doc: TiptapNode | null | undefined) {
  return extractPlainText(doc).trim().length > 0 || hasImage(doc);
}

export function countWords(doc: TiptapNode | null | undefined) {
  const text = extractPlainText(doc).trim();
  return text ? text.split(/\s+/).length : 0;
}

export function readingMinutes(doc: TiptapNode | null | undefined) {
  return Math.max(1, Math.ceil(countWords(doc) / 220));
}
