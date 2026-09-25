import "server-only";

import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

import type { ReportSection } from "./report";

export type PdfInput = {
  reference: string;
  submittedAt: Date;
  clientName: string;
  clientEmail: string;
  business: string;
  sections: ReportSection[];
  /** Shown under the heading, e.g. that passwords are not stored. */
  note?: string;
};

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 44;
const CONTENT_W = PAGE_W - MARGIN * 2;
const LABEL_W = CONTENT_W * 0.34;
const PAD = 8;

const NAVY = rgb(0.043, 0.063, 0.125);
const INK = rgb(0.06, 0.09, 0.16);
const MUTED = rgb(0.39, 0.45, 0.55);
const LINE = rgb(0.886, 0.91, 0.941);
const LABEL_BG = rgb(0.973, 0.98, 0.988);
const FUCHSIA = rgb(0.851, 0.275, 0.937);
const CYAN = rgb(0.133, 0.827, 0.933);

/** Standard PDF fonts only cover Latin-1: replace anything else with "?" instead of failing. */
function safe(font: PDFFont, text: string): string {
  let out = "";
  for (const ch of text.replace(/\r/g, "").replace(/\t/g, "  ")) {
    if (ch === "\n") {
      out += ch;
      continue;
    }
    try {
      font.encodeText(ch);
      out += ch;
    } catch {
      out += ch === "‑" || ch === "–" || ch === "—" ? "-" : "?";
    }
  }
  return out;
}

function wrap(font: PDFFont, text: string, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of safe(font, text).split("\n")) {
    let line = "";
    for (const word of paragraph.split(" ")) {
      let candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      // A single very long token (URL, password mask): break it by characters.
      candidate = word;
      while (font.widthOfTextAtSize(candidate, size) > maxWidth) {
        let cut = candidate.length - 1;
        while (cut > 1 && font.widthOfTextAtSize(candidate.slice(0, cut), size) > maxWidth) cut -= 1;
        lines.push(candidate.slice(0, cut));
        candidate = candidate.slice(cut);
      }
      line = candidate;
    }
    lines.push(line);
  }
  return lines.length ? lines : [""];
}

const formatDate = (date: Date) => date.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/London" });

/** Builds the downloadable report (same sections and order as the e-mail the team receives). */
export async function buildQuestionnairePdf(input: PdfInput): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`SEO Questionnaire ${input.reference}`);
  pdf.setAuthor("Visualytes");
  pdf.setSubject(`SEO questionnaire for ${input.business || input.clientName}`);

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = pdf.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H;

  const drawHeader = () => {
    page.drawRectangle({ x: 0, y: PAGE_H - 78, width: PAGE_W, height: 78, color: NAVY });
    page.drawRectangle({ x: 0, y: PAGE_H - 82, width: PAGE_W / 3, height: 4, color: CYAN });
    page.drawRectangle({ x: PAGE_W / 3, y: PAGE_H - 82, width: PAGE_W / 3, height: 4, color: FUCHSIA });
    page.drawRectangle({ x: (PAGE_W / 3) * 2, y: PAGE_H - 82, width: PAGE_W / 3 + 1, height: 4, color: rgb(0.925, 0.286, 0.6) });
    page.drawText("VISUALYTES", { x: MARGIN, y: PAGE_H - 40, size: 20, font: bold, color: rgb(1, 1, 1) });
    page.drawText("WEB & MARKETING SOLUTIONS", { x: MARGIN, y: PAGE_H - 58, size: 7.5, font: bold, color: rgb(0.4, 0.91, 0.98) });
    y = PAGE_H - 82 - 26;
  };

  const newPage = () => {
    page = pdf.addPage([PAGE_W, PAGE_H]);
    page.drawRectangle({ x: 0, y: PAGE_H - 6, width: PAGE_W, height: 6, color: NAVY });
    y = PAGE_H - MARGIN;
  };

  const ensure = (height: number) => {
    if (y - height < MARGIN + 18) newPage();
  };

  drawHeader();

  // Title block
  page.drawText("SEO Questionnaire Report", { x: MARGIN, y, size: 20, font: bold, color: INK });
  y -= 22;
  const who = [input.business, input.clientName].filter(Boolean).join("  |  ");
  for (const line of wrap(regular, who, 11, CONTENT_W)) {
    page.drawText(line, { x: MARGIN, y, size: 11, font: regular, color: MUTED });
    y -= 15;
  }
  y -= 4;

  // Meta cards
  const meta: [string, string][] = [
    ["REFERENCE", input.reference],
    ["SUBMITTED", formatDate(input.submittedAt)],
    ["CLIENT EMAIL", input.clientEmail],
  ];
  const cardW = (CONTENT_W - 16) / 3;
  meta.forEach(([label, value], index) => {
    const x = MARGIN + index * (cardW + 8);
    page.drawRectangle({ x, y: y - 38, width: cardW, height: 38, color: LABEL_BG, borderColor: LINE, borderWidth: 1 });
    page.drawText(label, { x: x + 9, y: y - 14, size: 6.5, font: bold, color: MUTED });
    const text = wrap(bold, value, 9, cardW - 18)[0];
    page.drawText(text, { x: x + 9, y: y - 28, size: 9, font: bold, color: INK });
  });
  y -= 38 + 12;

  if (input.note) {
    for (const line of wrap(regular, input.note, 8.5, CONTENT_W)) {
      page.drawText(line, { x: MARGIN, y, size: 8.5, font: regular, color: MUTED });
      y -= 12;
    }
    y -= 2;
  }

  // Sections
  for (const section of input.sections) {
    ensure(20 + 34);
    y -= 14;
    page.drawRectangle({ x: MARGIN, y: y - 3, width: 3.5, height: 16, color: FUCHSIA });
    page.drawText(safe(bold, section.title), { x: MARGIN + 11, y, size: 13, font: bold, color: INK });
    y -= 12;

    section.rows.forEach((row) => {
      const labelLines = wrap(bold, row.label, 9, LABEL_W - PAD * 2);
      const valueLines = row.value ? wrap(regular, row.value, 9.5, CONTENT_W - LABEL_W - PAD * 2) : ["-"];
      const rowH = Math.max(labelLines.length * 12, valueLines.length * 12.5) + PAD * 2 - 2;

      ensure(rowH);
      const top = y;
      page.drawRectangle({ x: MARGIN, y: top - rowH, width: LABEL_W, height: rowH, color: LABEL_BG, borderColor: LINE, borderWidth: 0.6 });
      page.drawRectangle({ x: MARGIN + LABEL_W, y: top - rowH, width: CONTENT_W - LABEL_W, height: rowH, color: rgb(1, 1, 1), borderColor: LINE, borderWidth: 0.6 });

      labelLines.forEach((line, i) => page.drawText(line, { x: MARGIN + PAD, y: top - PAD - 8 - i * 12, size: 9, font: bold, color: rgb(0.2, 0.25, 0.33) }));
      valueLines.forEach((line, i) =>
        page.drawText(line, { x: MARGIN + LABEL_W + PAD, y: top - PAD - 8 - i * 12.5, size: 9.5, font: regular, color: row.value ? INK : rgb(0.58, 0.64, 0.72) }),
      );
      y = top - rowH;
    });
  }

  // Footer on every page
  const pages = pdf.getPages();
  pages.forEach((p, index) => {
    p.drawLine({ start: { x: MARGIN, y: 34 }, end: { x: PAGE_W - MARGIN, y: 34 }, thickness: 0.6, color: LINE });
    p.drawText("Visualytes  |  +023 8097 0305  |  visualytes.com", { x: MARGIN, y: 20, size: 8, font: regular, color: MUTED });
    const label = `${input.reference}  |  Page ${index + 1} of ${pages.length}`;
    p.drawText(label, { x: PAGE_W - MARGIN - regular.widthOfTextAtSize(label, 8), y: 20, size: 8, font: regular, color: MUTED });
  });

  return pdf.save();
}
