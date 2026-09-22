import { NextResponse } from "next/server";

import { email, escapeHtml, requiredText, textToHtml, ValidationError } from "@/src/lib/server/forms";
import { mailRecipient, mailTransport, verifyCaptcha } from "@/src/lib/server/services";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new ValidationError("Invalid request body.");
    const payload = body as Record<string, unknown>;

    const name = requiredText(payload.name, "Full name", { max: 200 });
    const phone = requiredText(payload.phone, "Phone number", { max: 40 });
    const address = email(payload.email);
    const service = requiredText(payload.service, "Service", { max: 120 });
    const message = requiredText(payload.message, "Enquiry details", { max: 4_000 });

    await verifyCaptcha(payload.captchaToken);

    await mailTransport().sendMail({
      from: `"Visualytes Enquiry Form" <${mailRecipient()}>`,
      to: mailRecipient(),
      replyTo: address,
      subject: `New Enquiry — ${service}`,
      html: `<div style="font-family:Arial,sans-serif"><h2>New Enquiry</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td><strong>Full Name</strong></td><td>${escapeHtml(name)}</td></tr><tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr><tr><td><strong>Email</strong></td><td>${escapeHtml(address)}</td></tr><tr><td><strong>Service</strong></td><td>${escapeHtml(service)}</td></tr><tr><td><strong>Enquiry Details</strong></td><td>${textToHtml(message)}</td></tr></table></div>`,
    });

    await mailTransport().sendMail({
      from: `"Visualytes" <${mailRecipient()}>`,
      to: address,
      subject: "We've received your enquiry — Visualytes",
      html: `<div style="font-family:Arial,sans-serif"><h2>Thanks for reaching out, ${escapeHtml(name)}!</h2><p>We've received your enquiry about <strong>${escapeHtml(service)}</strong> and a member of our team will be in touch shortly.</p><p><strong>Your message:</strong><br />${textToHtml(message)}</p><p>Best regards,<br />Visualytes Team</p></div>`,
    });

    return NextResponse.json({ success: true, message: "Enquiry sent successfully." });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    console.error("Enquiry submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to send your enquiry right now." }, { status: 500 });
  }
}
