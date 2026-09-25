import { NextResponse } from "next/server";

import { ABOUT_FORM_KEY } from "@/src/lib/forms/defaults";
import { customFields, displayValue, getForm, validateSubmission } from "@/src/lib/forms/server";
import { prisma } from "@/src/lib/prisma";
import { escapeHtml, textToHtml, ValidationError } from "@/src/lib/server/forms";
import { mailRecipient, mailTransport, verifyCaptcha } from "@/src/lib/server/services";

export const runtime = "nodejs";

/** POST /api/about-us - the enquiry form at the bottom of the About Us page (fields: Admin > Forms & Responses). */
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new ValidationError("Invalid request body.");

    const payload = body as Record<string, unknown>;
    const form = await getForm(ABOUT_FORM_KEY);
    if (!form || !form.isActive) {
      return NextResponse.json({ success: false, message: "This form is currently unavailable." }, { status: 403 });
    }

    const values = validateSubmission(form.fields, payload);
    const name = displayValue(values.name);
    const address = displayValue(values.email);
    const phone = displayValue(values.phone);
    const message = displayValue(values.message);

    await verifyCaptcha(payload.captchaToken);
    await prisma.formSubmission.create({ data: { formKey: ABOUT_FORM_KEY, name: name || null, email: address, data: values } });

    const extraRows = customFields(ABOUT_FORM_KEY, form.fields)
      .map((field) => `<tr><td><strong>${escapeHtml(field.label)}</strong></td><td>${textToHtml(displayValue(values[field.name]))}</td></tr>`)
      .join("");

    await mailTransport().sendMail({
      from: `"Visualytes About Us Form" <${mailRecipient()}>`,
      to: mailRecipient(),
      replyTo: address,
      subject: `New About Us Enquiry${name ? ` — ${name}` : ""}`,
      html: `<div style="font-family:Arial,sans-serif"><h2>New About Us Enquiry</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse"><tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr><tr><td><strong>Email</strong></td><td>${escapeHtml(address)}</td></tr><tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr><tr><td><strong>Message</strong></td><td>${textToHtml(message)}</td></tr>${extraRows}</table></div>`,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    console.error("About Us form submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to send your message right now." }, { status: 500 });
  }
}
