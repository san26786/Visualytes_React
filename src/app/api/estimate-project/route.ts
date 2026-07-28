import { NextResponse } from "next/server";

import { email, escapeHtml, optionalText, requiredText, textToHtml, ValidationError } from "@/src/lib/server/forms";
import { mailRecipient, mailTransport } from "@/src/lib/server/services";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new ValidationError("Invalid request body.");
    const data = body as Record<string, unknown>;

    const firstName = requiredText(data.firstName, "First name", { max: 120 });
    const lastName = requiredText(data.lastName, "Last name", { max: 120 });
    const companyName = requiredText(data.companyName, "Company name", { max: 200 });
    const companyPersonnel = optionalText(data.companyPersonnel, "Company personnel", 160);
    const senderEmail = email(data.email);
    const phone = requiredText(data.phone, "Phone number", { max: 40 });
    const mobileType = requiredText(data.mobileType, "Application type", { max: 120 });
    const budget = requiredText(data.budget, "Budget", { max: 120 });
    const projectDetails = requiredText(data.projectDetails, "Project details", { min: 10, max: 5_000 });
    const timeline = requiredText(data.timeline, "Timeline", { max: 120 });
    const marketing = data.marketing === true;

    await mailTransport().sendMail({
      from: `"Visualyte Project Estimate" <${mailRecipient()}>`,
      to: mailRecipient(),
      replyTo: senderEmail,
      subject: "New Project Estimate Request",
      html: `<div style="font-family:Arial,sans-serif"><h2>New Estimate Project Request</h2><p><b>First Name:</b> ${escapeHtml(firstName)}</p><p><b>Last Name:</b> ${escapeHtml(lastName)}</p><p><b>Company Name:</b> ${escapeHtml(companyName)}</p><p><b>Company Personnel:</b> ${escapeHtml(companyPersonnel)}</p><p><b>Email:</b> ${escapeHtml(senderEmail)}</p><p><b>Phone:</b> ${escapeHtml(phone)}</p><p><b>Application Type:</b> ${escapeHtml(mobileType)}</p><p><b>Budget:</b> ${escapeHtml(budget)}</p><p><b>Project Details:</b><br />${textToHtml(projectDetails)}</p><p><b>Timeline:</b> ${escapeHtml(timeline)}</p><p><b>Marketing Communication:</b> ${marketing ? "Accepted" : "Not accepted"}</p></div>`,
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
