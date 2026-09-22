import { NextResponse } from "next/server";

import { CONTACT_FORM_KEY } from "@/src/lib/forms/defaults";
import { customFields, displayValue, getForm, validateSubmission } from "@/src/lib/forms/server";
import { escapeHtml, textToHtml, ValidationError } from "@/src/lib/server/forms";
import { mailRecipient, mailTransport, verifyCaptcha } from "@/src/lib/server/services";
import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new ValidationError("Invalid request body.");

    const payload = body as Record<string, unknown>;
    const form = await getForm(CONTACT_FORM_KEY);
    if (!form || !form.isActive) {
      return NextResponse.json({ success: false, message: "This form is currently unavailable." }, { status: 403 });
    }

    const values = validateSubmission(form.fields, payload);
    const contactName = displayValue(values.name);
    const address = displayValue(values.email);
    const contactPhone = displayValue(values.phone);
    const contactTopic = displayValue(values.topic);
    const contactMessage = displayValue(values.message);

    await verifyCaptcha(payload.captchaToken);
    await prisma.formSubmission.create({ data: { formKey: CONTACT_FORM_KEY, name: contactName || null, email: address, data: values } });

    const extraRows = customFields(CONTACT_FORM_KEY, form.fields)
      .map((field) => `<tr><td><strong>${escapeHtml(field.label)}</strong></td><td>${textToHtml(displayValue(values[field.name]))}</td></tr>`)
      .join("");

    await mailTransport().sendMail({
      from: `"Visualyte Contact Form" <${mailRecipient()}>`,
      to: mailRecipient(),
      replyTo: address,
      subject: `New Contact Form — ${contactTopic || "General Enquiry"}`,
      html: `<div style="font-family:Arial,sans-serif"><h2>New Contact Form Submission</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td><strong>Name</strong></td><td>${escapeHtml(contactName)}</td></tr><tr><td><strong>Email</strong></td><td>${escapeHtml(address)}</td></tr><tr><td><strong>Phone</strong></td><td>${escapeHtml(contactPhone)}</td></tr><tr><td><strong>Topic</strong></td><td>${escapeHtml(contactTopic)}</td></tr><tr><td><strong>Message</strong></td><td>${textToHtml(contactMessage)}</td></tr>${extraRows}</table></div>`,
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
