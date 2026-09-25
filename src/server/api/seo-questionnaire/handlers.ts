import { NextResponse } from "next/server";

import { Prisma } from "@/src/generated/prisma-admin";
import { getCurrentSession } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { clientEmail, teamEmail } from "@/src/lib/seo-questionnaire/email";
import { buildReport } from "@/src/lib/seo-questionnaire/report";
import { FORM_KEY, coerceValues, validateAll } from "@/src/lib/seo-questionnaire/schema";
import { getQuestionnaireConfig } from "@/src/lib/seo-questionnaire/server";
import { applicationUrl, mailRecipient, mailTransport } from "@/src/lib/server/services";

/**
 * POST /api/seo-questionnaire   body: { values: { [fieldKey]: answer } }
 * Signed-in clients submit the questionnaire the admin has configured.
 *  1. re-validate everything on the server against the CURRENT definition (never trust the browser),
 *  2. store a report snapshot (passwords are NOT stored - they only travel by e-mail),
 *  3. e-mail the Visualytes team the full report and the client a copy with passwords hidden.
 */
export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Your session has expired. Please sign in again." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { values?: unknown } | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const { config } = await getQuestionnaireConfig();
  const validation = validateAll(config, coerceValues(config, body.values));
  if (!validation.ok) {
    const first = Object.values(validation.errors)[0] ?? "Please check the highlighted fields.";
    return NextResponse.json({ success: false, message: first, step: validation.step, errors: validation.errors }, { status: 400 });
  }
  const values = validation.values;

  const { nameKey, emailKey, businessKey, teamEmail: teamAddress } = config.settings;
  const client = {
    name: String(values[nameKey] ?? "").trim() || session.name,
    email: String(values[emailKey] ?? "").trim() || session.email,
    business: businessKey ? String(values[businessKey] ?? "").trim() : "",
  };

  const storedReport = buildReport(config, values, { hideSecrets: true });

  try {
    const submission = await prisma.formSubmission.create({
      data: {
        formKey: FORM_KEY,
        name: client.name,
        email: client.email,
        // A snapshot of the labelled answers, so the response (and its PDF) stays readable even if the form is edited later.
        data: { version: 2, business: client.business, report: storedReport } as unknown as Prisma.InputJsonValue,
        userId: session.id,
      },
    });

    const reference = `SEO-${String(submission.id).padStart(5, "0")}`;
    const submittedAt = submission.createdAt;
    const siteUrl = process.env.NEXT_PUBLIC_URL ? applicationUrl() : "https://www.visualytes.com";

    const team = teamEmail({ sections: buildReport(config, values, { hideSecrets: false }), client, reference, submittedAt, siteUrl, portalUser: session.email });
    const clientCopy = clientEmail({ sections: storedReport, client, reference, submittedAt, siteUrl });
    const transport = mailTransport();
    const from = `"Visualytes" <${mailRecipient()}>`;
    const teamTo = teamAddress ? [mailRecipient(), teamAddress] : mailRecipient();

    const [teamResult, clientResult] = await Promise.allSettled([
      transport.sendMail({ from, to: teamTo, replyTo: client.email, subject: team.subject, html: team.html, text: team.text }),
      transport.sendMail({ from, to: client.email, replyTo: mailRecipient(), subject: clientCopy.subject, html: clientCopy.html, text: clientCopy.text }),
    ]);

    if (teamResult.status === "rejected") {
      // The team must always be told; let the client retry rather than silently losing the lead.
      console.error("SEO questionnaire: team e-mail failed", teamResult.reason);
      return NextResponse.json(
        { success: false, message: "We saved your answers but could not notify our team. Please press Submit again." },
        { status: 502 },
      );
    }
    if (clientResult.status === "rejected") console.error("SEO questionnaire: client e-mail failed", clientResult.reason);

    return NextResponse.json({
      success: true,
      reference,
      email: client.email,
      clientEmailSent: clientResult.status === "fulfilled",
    });
  } catch (error) {
    console.error("SEO questionnaire submission failed", error);
    return NextResponse.json({ success: false, message: "Unable to submit the questionnaire right now. Please try again." }, { status: 500 });
  }
}
