import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { FORM_KEY } from "@/src/lib/seo-questionnaire/config";
import { storedReport } from "@/src/lib/seo-questionnaire/report";
import { prisma } from "@/src/lib/prisma";

/** GET /api/admin/seo-questionnaire/submissions - every questionnaire response, newest first. */
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const rows = await prisma.formSubmission.findMany({
    where: { formKey: FORM_KEY },
    orderBy: { createdAt: "desc" },
    take: 500,
    select: { id: true, name: true, email: true, data: true, createdAt: true, user: { select: { email: true } } },
  });
  return NextResponse.json({
    submissions: rows.map((row) => {
      const { report, business } = storedReport(row.data);
      return {
        id: row.id,
        reference: `SEO-${String(row.id).padStart(5, "0")}`,
        name: row.name,
        email: row.email,
        business,
        portalUser: row.user?.email ?? null,
        createdAt: row.createdAt,
        report,
      };
    }),
  });
}
