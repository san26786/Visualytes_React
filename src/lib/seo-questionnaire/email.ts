import { reportToText, type ReportRow, type ReportSection } from "./report.ts";

export type EmailContent = { subject: string; html: string; text: string };

type Common = {
  /** Sections from buildReport(): the client copy is built with passwords hidden, the team copy without. */
  sections: ReportSection[];
  /** The client's answers to the name / email / business fields chosen in the questionnaire settings. */
  client: { name: string; email: string; business: string };
  reference: string;
  submittedAt: Date;
  siteUrl: string;
};

const BRAND_GRADIENT = "linear-gradient(90deg,#22d3ee,#d946ef,#ec4899)";
const INK = "#0f172a";
const MUTED = "#64748b";
const LINE = "#e2e8f0";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

const multiline = (value: string) => esc(value).replace(/\r?\n/g, "<br />");

function formatDate(date: Date): string {
  return date.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/London" });
}

function sectionHtml(section: ReportSection): string {
  const title = `<tr><td style="padding:26px 0 10px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="width:4px;background:#d946ef;border-radius:2px;">&nbsp;</td><td style="padding-left:10px;font:700 16px ${FONT};color:${INK};">${esc(section.title)}</td></tr></table></td></tr>`;

  const rows = section.rows
    .map(
      (row, index) =>
        `<tr><td width="38%" valign="top" style="padding:10px 14px;background:#f8fafc;border-bottom:1px solid ${LINE};font:600 13px ${FONT};color:#334155;">${esc(row.label)}</td><td valign="top" style="padding:10px 14px;background:${index % 2 ? "#fcfcfd" : "#ffffff"};border-bottom:1px solid ${LINE};font:400 14px ${FONT};color:${INK};word-break:break-word;">${rowValue(row)}</td></tr>`,
    )
    .join("");
  const body = `<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:10px;overflow:hidden;border-collapse:separate;">${rows}</table></td></tr>`;

  return `${title}${body}`;
}

const tagPills = (tags: string[]) =>
  tags
    .map(
      (tag) =>
        `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;background:#f5f3ff;border:1px solid #e9d5ff;border-radius:999px;font:600 12px ${FONT};color:#6b21a8;">${esc(tag)}</span>`,
    )
    .join("");

function rowValue(row: ReportRow): string {
  if (row.tags) return row.tags.length ? tagPills(row.tags) : `<span style="color:#94a3b8;">&mdash;</span>`;
  return row.value ? multiline(row.value) : `<span style="color:#94a3b8;">&mdash;</span>`;
}

function shell({ preheader, heroTitle, heroSub, inner, siteUrl }: { preheader: string; heroTitle: string; heroSub: string; inner: string; siteUrl: string }): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${heroTitle}</title></head>
<body style="margin:0;padding:0;background:#eef2f7;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:28px 12px;"><tr><td align="center">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.08);">
  <tr><td style="background:#0b1020;padding:26px 32px 22px 32px;">
    <div style="font:800 20px ${FONT};letter-spacing:.14em;color:#ffffff;">VISUALYTES</div>
    <div style="font:600 10px ${FONT};letter-spacing:.3em;color:#67e8f9;margin-top:4px;">WEB &amp; MARKETING SOLUTIONS</div>
  </td></tr>
  <tr><td style="height:4px;line-height:4px;font-size:0;background:#d946ef;background-image:${BRAND_GRADIENT};">&nbsp;</td></tr>
  <tr><td style="padding:32px 32px 6px 32px;">
    <div style="font:800 26px/1.25 ${FONT};color:${INK};">${heroTitle}</div>
    <div style="font:400 15px/1.6 ${FONT};color:${MUTED};margin-top:10px;">${heroSub}</div>
  </td></tr>
  <tr><td style="padding:8px 32px 32px 32px;">${inner}</td></tr>
  <tr><td style="background:#f8fafc;border-top:1px solid ${LINE};padding:22px 32px;font:400 12px/1.7 ${FONT};color:${MUTED};">
    <strong style="color:#334155;">Visualytes</strong> &middot; +023 8097 0305 &middot; <a href="${esc(siteUrl)}" style="color:#a21caf;text-decoration:none;">${esc(siteUrl.replace(/^https?:\/\//, ""))}</a>
  </td></tr>
</table></td></tr></table></body></html>`;
}

const pill = (label: string, value: string) =>
  `<td style="padding:0 10px 0 0;"><div style="padding:10px 14px;background:#f8fafc;border:1px solid ${LINE};border-radius:10px;"><div style="font:600 10px ${FONT};letter-spacing:.12em;color:${MUTED};text-transform:uppercase;">${esc(label)}</div><div style="font:700 14px ${FONT};color:${INK};margin-top:3px;">${esc(value)}</div></div></td>`;

/** Confirmation e-mail sent to the client (passwords hidden). */
export function clientEmail({ sections, client, reference, submittedAt, siteUrl }: Common): EmailContent {
  const firstName = client.name.split(/\s+/)[0] || client.name;

  const steps = [
    ["1", "We review your answers", "Our SEO team checks your business, keywords and competitors."],
    ["2", "We prepare your campaign", "We set up tracking and benchmark your site against your competitors."],
    ["3", "We get in touch", "You will hear from us about the plan of action for your business."],
  ]
    .map(
      ([n, title, text]) =>
        `<tr><td valign="top" style="padding:0 14px 14px 0;width:34px;"><div style="width:30px;height:30px;text-align:center;border-radius:50%;background:${BRAND_GRADIENT};background-color:#d946ef;color:#fff;font:700 13px ${FONT};line-height:30px;">${n}</div></td><td style="padding:0 0 14px 0;font:400 14px/1.5 ${FONT};color:#334155;"><strong style="color:${INK};">${title}</strong><br />${text}</td></tr>`,
    )
    .join("");

  const inner = `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0 4px 0;"><tr>${pill("Reference", reference)}${pill("Received", formatDate(submittedAt))}</tr></table>
    <div style="font:700 16px ${FONT};color:${INK};margin:26px 0 14px 0;">What happens next</div>
    <table role="presentation" cellpadding="0" cellspacing="0">${steps}</table>
    <div style="height:1px;background:${LINE};margin:14px 0 22px 0;"></div>
    <div style="font:700 18px/1.4 ${FONT};color:${INK};">Dear ${esc(client.name)}, you have provided us with this information.</div>
    <div style="font:400 12px ${FONT};color:${MUTED};margin-top:6px;">For your security, passwords are hidden in this copy.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sections.map(sectionHtml).join("")}</table>
    <div style="font:400 13px/1.6 ${FONT};color:${MUTED};margin-top:28px;">If anything above is wrong, simply reply to this email and we will correct it.</div>`;

  return {
    subject: `We've received your SEO questionnaire - ${reference}`,
    html: shell({
      preheader: `Thanks ${firstName}! Your SEO questionnaire (${reference}) has been received.`,
      heroTitle: `Thanks, ${esc(firstName)} &mdash; we&rsquo;ve got everything.`,
      heroSub: "Your SEO questionnaire has been received. Here is a copy of the information you provided.",
      inner,
      siteUrl,
    }),
    text: `Dear ${client.name}, you have provided us with this information.\nReference: ${reference}\nReceived: ${formatDate(submittedAt)}\n(Passwords are hidden in this copy.)\n\n${reportToText(sections)}\n\nVisualytes - ${siteUrl}`,
  };
}

/** Internal e-mail to the Visualytes team (full details, including credentials). */
export function teamEmail({ sections, client, reference, submittedAt, siteUrl, portalUser }: Common & { portalUser: string }): EmailContent {
  const business = client.business || client.name;

  const inner = `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0 4px 0;"><tr>${pill("Reference", reference)}${pill("Submitted", formatDate(submittedAt))}${pill("Signed in as", portalUser)}</tr></table>
    <div style="margin:18px 0 6px 0;padding:12px 14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;font:400 13px/1.5 ${FONT};color:#9a3412;"><strong>Contains account credentials.</strong> Handle securely and delete this email once the details are stored safely. Replying goes straight to the client.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sections.map(sectionHtml).join("")}</table>`;

  return {
    subject: `New SEO questionnaire - ${business} (${reference})`,
    html: shell({
      preheader: `${business} submitted the SEO questionnaire (${reference}).`,
      heroTitle: `New SEO questionnaire: ${esc(business)}`,
      heroSub: `${esc(client.name)} &middot; ${esc(client.email)}`,
      inner,
      siteUrl,
    }),
    text: `New SEO questionnaire: ${business}\nReference: ${reference}\nSubmitted: ${formatDate(submittedAt)}\nSigned in as: ${portalUser}\n\n${reportToText(sections)}`,
  };
}
