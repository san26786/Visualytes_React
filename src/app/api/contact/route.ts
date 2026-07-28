import { NextResponse } from "next/server";

import { email, escapeHtml, optionalText, requiredText, textToHtml, ValidationError } from "@/src/lib/server/forms";
import { mailRecipient, mailTransport, verifyCaptcha } from "@/src/lib/server/services";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new ValidationError("Invalid request body.");

    const { name, email: senderEmail, phone, topic, message, captchaToken } = body as Record<string, unknown>;
    const contactName = requiredText(name, "Name", { max: 120 });
    const address = email(senderEmail);
    const contactPhone = optionalText(phone, "Phone number", 40);
    const contactTopic = requiredText(topic, "Topic", { max: 160 });
    const contactMessage = requiredText(message, "Message", { max: 5_000 });

    await verifyCaptcha(captchaToken);
    await mailTransport().sendMail({
      from: `"Visualyte Contact Form" <${mailRecipient()}>`,
      to: mailRecipient(),
      replyTo: address,
      subject: `New Contact Form — ${contactTopic}`,
      html: `<div style="font-family:Arial,sans-serif"><h2>New Contact Form Submission</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td><strong>Name</strong></td><td>${escapeHtml(contactName)}</td></tr><tr><td><strong>Email</strong></td><td>${escapeHtml(address)}</td></tr><tr><td><strong>Phone</strong></td><td>${escapeHtml(contactPhone)}</td></tr><tr><td><strong>Topic</strong></td><td>${escapeHtml(contactTopic)}</td></tr><tr><td><strong>Message</strong></td><td>${textToHtml(contactMessage)}</td></tr></table></div>`,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    console.error("Contact form submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to send your message right now." }, { status: 500 });
  }
}
