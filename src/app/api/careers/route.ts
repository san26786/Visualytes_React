import { NextResponse } from "next/server";

import { email, escapeHtml, isFile, requiredText, textToHtml, ValidationError } from "@/src/lib/server/forms";
import { mailRecipient, mailTransport, verifyCaptcha } from "@/src/lib/server/services";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = requiredText(formData.get("name"), "Name", { max: 120 });
    const senderEmail = email(formData.get("email"));
    const designation = requiredText(formData.get("designation"), "Preferred role", { max: 160 });
    const message = requiredText(formData.get("message"), "Message", { max: 5_000 });
    const resume = formData.get("resume");

    if (!isFile(resume) || resume.size === 0) throw new ValidationError("A resume is required.");
    if (resume.size > MAX_RESUME_BYTES) throw new ValidationError("Resume must be 5 MB or smaller.");
    if (!ALLOWED_RESUME_TYPES.has(resume.type)) throw new ValidationError("Resume must be a PDF, DOC, or DOCX file.");

    await verifyCaptcha(formData.get("captchaToken"));
    await mailTransport().sendMail({
      from: `"Visualyte Careers" <${mailRecipient()}>`,
      to: mailRecipient(),
      replyTo: senderEmail,
      subject: `New Career Application — ${designation}`,
      html: `<div style="font-family:Arial,sans-serif"><h2>New Career Application</h2><table cellpadding="10" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr><tr><td><b>Email</b></td><td>${escapeHtml(senderEmail)}</td></tr><tr><td><b>Preferred role</b></td><td>${escapeHtml(designation)}</td></tr><tr><td><b>Message</b></td><td>${textToHtml(message)}</td></tr></table></div>`,
      attachments: [{
        filename: resume.name.replace(/[^a-zA-Z0-9._-]/g, "_"),
        content: Buffer.from(await resume.arrayBuffer()),
        contentType: resume.type,
      }],
    });

    return NextResponse.json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    console.error("Career application failed", error);
    return NextResponse.json({ success: false, message: "Unable to submit your application right now." }, { status: 500 });
  }
}
