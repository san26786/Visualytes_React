import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { FORM_KEY } from "@/src/lib/seo-questionnaire/config";
import { buildQuestionnairePdf } from "@/src/lib/seo-questionnaire/pdf";
import { storedReport } from "@/src/lib/seo-questionnaire/report";
import { prisma } from "@/src/lib/prisma";

/** GET /api/admin/seo-questionnaire/submissions/:id/pdf - downloads the response as a PDF report. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid response." }, { status: 400 });

  const row = await prisma.formSubmission.findFirst({ where: { id, formKey: FORM_KEY } });
  if (!row) return NextResponse.json({ message: "Response not found." }, { status: 404 });

  const { report, business } = storedReport(row.data);
  const reference = `SEO-${String(row.id).padStart(5, "0")}`;
  const bytes = await buildQuestionnairePdf({
    reference,
    submittedAt: row.createdAt,
    clientName: row.name ?? "",
    clientEmail: row.email ?? "",
    business,
    sections: report,
    note: "Passwords supplied by the client are not stored on the website - they were sent to the team by email only.",
  });

  const slug = (business || row.name || "client").toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "client";
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${reference}-${slug}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
