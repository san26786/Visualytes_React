import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { CONTACT_PAGE_SLUG as SLUG, DEFAULT_CONTACT_CONTENT as DEFAULT_CONTENT } from "@/src/lib/contact-page";
import { prisma } from "@/src/lib/prisma";
import { SITE_DATA_TAG } from "@/src/lib/site/types";

// GET — fetch (auto-create with defaults on first load)
export async function GET() {
  let page = await prisma.contactPage.findUnique({ where: { slug: SLUG } });

  if (!page) {
    page = await prisma.contactPage.create({
      data: { slug: SLUG, ...DEFAULT_CONTENT },
    });
  }

  return NextResponse.json(page);
}

// PATCH — update (upsert so it never 404s even if row was deleted). Admin only; the public page reads this row.
export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

  try {
    const body = await req.json();

    const { hero, contactInfo, liveSupport, contactForm, officeMap, offices, isPublished } = body;

    const page = await prisma.contactPage.upsert({
      where: { slug: SLUG },
      update: {
        ...(hero && { hero }),
        ...(contactInfo && { contactInfo }),
        ...(liveSupport && { liveSupport }),
        ...(contactForm && { contactForm }),
        ...(officeMap && { officeMap }),
        ...(offices && { offices }),
        ...(typeof isPublished === "boolean" && { isPublished }),
      },
      create: { slug: SLUG, ...DEFAULT_CONTENT, ...body },
    });

    // The header/footer "Call / Write / Visit" blocks share this content.
    revalidateTag(SITE_DATA_TAG, { expire: 0 });
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Update failed." }, { status: 500 });
  }
}
