import { NextResponse } from "next/server";

import { ESTIMATE_FORM_KEY } from "@/src/lib/forms/defaults";
import { customFields, displayValue, getForm, validateSubmission } from "@/src/lib/forms/server";
import { escapeHtml, textToHtml, ValidationError } from "@/src/lib/server/forms";
import { mailRecipient, mailTransport } from "@/src/lib/server/services";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new ValidationError("Invalid request body.");

    const form = await getForm(ESTIMATE_FORM_KEY);
    if (!form || !form.isActive) {
      return NextResponse.json({ success: false, message: "This form is currently unavailable." }, { status: 403 });
    }

    const values = validateSubmission(form.fields, body as Record<string, unknown>);
    const firstName = displayValue(values.firstName);
    const lastName = displayValue(values.lastName);
    const companyName = displayValue(values.companyName);
    const companyPersonnel = displayValue(values.companyPersonnel);
    const senderEmail = displayValue(values.email);
    const phone = displayValue(values.phone);
    const mobileType = displayValue(values.mobileType);
    const budget = displayValue(values.budget);
    const projectDetails = displayValue(values.projectDetails);
    const timeline = displayValue(values.timeline);
    const marketing = values.marketing === true;

    await prisma.formSubmission.create({ data: { formKey: ESTIMATE_FORM_KEY, name: `${firstName} ${lastName}`.trim() || null, email: senderEmail, data: values } });

    const extraRows = customFields(ESTIMATE_FORM_KEY, form.fields)
      .map((field) => `<p><b>${escapeHtml(field.label)}:</b> ${textToHtml(displayValue(values[field.name]))}</p>`)
      .join("");

    await mailTransport().sendMail({
      from: `"Visualyte Project Estimate" <${mailRecipient()}>`,
      to: mailRecipient(),
      replyTo: senderEmail,
      subject: "New Project Estimate Request",
      html: `<div style="font-family:Arial,sans-serif"><h2>New Estimate Project Request</h2><p><b>First Name:</b> ${escapeHtml(firstName)}</p><p><b>Last Name:</b> ${escapeHtml(lastName)}</p><p><b>Company Name:</b> ${escapeHtml(companyName)}</p><p><b>Company Personnel:</b> ${escapeHtml(companyPersonnel)}</p><p><b>Email:</b> ${escapeHtml(senderEmail)}</p><p><b>Phone:</b> ${escapeHtml(phone)}</p><p><b>Application Type:</b> ${escapeHtml(mobileType)}</p><p><b>Budget:</b> ${escapeHtml(budget)}</p><p><b>Project Details:</b><br />${textToHtml(projectDetails)}</p><p><b>Timeline:</b> ${escapeHtml(timeline)}</p><p><b>Marketing Communication:</b> ${marketing ? "Accepted" : "Not accepted"}</p>${extraRows}</div>`,
    });

    return NextResponse.json({ success: true, message: "Estimate request sent successfully." });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
    console.error("Estimate request failed", error);
    return NextResponse.json({ success: false, message: "Unable to send your estimate request right now." }, { status: 500 });
  }
}
