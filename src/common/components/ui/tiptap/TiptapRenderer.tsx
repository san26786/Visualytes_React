import { Fragment, type CSSProperties, type ReactNode } from "react";

import {
  isExternalUrl,
  safeImageUrl,
  safeUrl,
  toTiptapDoc,
  type TiptapMark,
  type TiptapNode,
} from "@/src/lib/blog/tiptap";

type Props = {
  /** Tiptap JSON exactly as stored in the database (object or JSON string). */
  content: unknown;
  className?: string;
};

const ALIGN_CLASS: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

function alignClass(node: TiptapNode) {
  const align = node.attrs?.textAlign;
  return typeof align === "string" ? ALIGN_CLASS[align] : undefined;
}

function renderMarks(text: string, marks: TiptapMark[] | undefined, key: string): ReactNode {
  let element: ReactNode = text;

  for (const mark of marks ?? []) {
    switch (mark.type) {
      case "bold":
        element = <strong>{element}</strong>;
        break;
      case "italic":
        element = <em>{element}</em>;
        break;
      case "underline":
        element = <u>{element}</u>;
        break;
      case "strike":
        element = <s>{element}</s>;
        break;
      case "code":
        element = <code>{element}</code>;
        break;
      case "highlight": {
        const color = mark.attrs?.color;
        const style: CSSProperties | undefined =
          typeof color === "string" ? { backgroundColor: color } : undefined;
        element = <mark style={style}>{element}</mark>;
        break;
      }
      case "textStyle": {
        const color = mark.attrs?.color;
        if (typeof color === "string") element = <span style={{ color }}>{element}</span>;
        break;
      }
      case "link": {
        const href = safeUrl(mark.attrs?.href);
        if (href) {
          const external = isExternalUrl(href);
          element = (
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {element}
            </a>
          );
        }
        break;
      }
    }
  }

  return <Fragment key={key}>{element}</Fragment>;
}

function renderChildren(node: TiptapNode, path: string): ReactNode[] {
  return (node.content ?? []).map((child, index) => renderNode(child, `${path}.${index}`));
}

function renderNode(node: TiptapNode, path: string): ReactNode {
  switch (node.type) {
    case "text":
      return renderMarks(node.text ?? "", node.marks, path);

    case "paragraph":
      // Empty paragraphs are editor spacing; keep them as a visible blank line.
      return (
        <p key={path} className={alignClass(node)}>
          {node.content?.length ? renderChildren(node, path) : <br />}
        </p>
      );

    case "heading": {
      const level = Math.min(6, Math.max(1, Number(node.attrs?.level) || 2));
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag key={path} className={alignClass(node)}>
          {renderChildren(node, path)}
        </Tag>
      );
    }

    case "bulletList":
      return <ul key={path}>{renderChildren(node, path)}</ul>;

    case "orderedList": {
      const start = Number(node.attrs?.start);
      return (
        <ol key={path} start={Number.isFinite(start) && start > 1 ? start : undefined}>
          {renderChildren(node, path)}
        </ol>
      );
    }

    case "listItem":
      return <li key={path}>{renderChildren(node, path)}</li>;

    case "blockquote":
      return <blockquote key={path}>{renderChildren(node, path)}</blockquote>;

    case "codeBlock":
      return (
        <pre key={path}>
          <code>{renderChildren(node, path)}</code>
        </pre>
      );

    case "horizontalRule":
      return <hr key={path} />;

    case "hardBreak":
      return <br key={path} />;

    case "image": {
      const src = safeImageUrl(node.attrs?.src);
      if (!src) return null;
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      const title = typeof node.attrs?.title === "string" ? node.attrs.title : undefined;
      // eslint-disable-next-line @next/next/no-img-element -- sizes of editor images are unknown
      return <img key={path} src={src} alt={alt} title={title} loading="lazy" decoding="async" />;
    }

    default:
      return null;
  }
}

/**
 * Renders a Tiptap JSON document as React elements. The document is re-sanitised
 * against the same whitelist the API uses and every URL is checked, so no
 * `dangerouslySetInnerHTML` is needed.
 */
export default function TiptapRenderer({ content, className }: Props) {
  const doc = toTiptapDoc(content);
  return (
    <div className={["blog-article-content", className].filter(Boolean).join(" ")}>
      {renderChildren(doc, "n")}
    </div>
  );
}
