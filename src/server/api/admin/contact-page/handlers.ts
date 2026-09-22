import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const SLUG = "contact-us";

const DEFAULT_CONTENT = {
  hero: {
    titleNormal: "Let's",
    titleHighlight: "Talk",
    subtitle:
      "We're always happy to hear from you — whether it's a new project, a quick question, or just a hello.",
  },
  contactInfo: {
    call: {
      title: "Call Us",
      enquiryLabel: "Enquiry:",
      enquiryValue: "023 8097 0305",
      supportLabel: "Support:",
      supportValue: "023 8097 0305",
    },
    write: {
      title: "Write Us",
      emails: ["hello@visualytes.com", "support@visualytes.com"],
    },
    visit: {
      title: "Visit Us",
      addresses: [
        "Cumberland House, Southampton, SO15 2BG",
        "12 Shirley Road, Southampton, SO15 3EU",
      ],
    },
  },
  liveSupport: {
    badge: "REAL-TIME ASSISTANCE",
    titleNormal: "Live",
    titleHighlight: "Support",
    description:
      "Do you need any urgent help from us regarding any of our services? Our dedicated support team is available for you.",
    callLabel: "Call Us Now:",
    callNumber: "023 8097 0305",
    whatsappButtonText: "START WHATSAPP CHAT NOW!",
    whatsappNote:
      "Requires WhatsApp Desktop to chat from a computer, or WhatsApp mobile app on your phone.",
    image: "",
    availabilityLabel: "AVAILABLE",
    availabilityValue: "24/7",
    responseTimeLabel: "RESPONSE TIME",
    responseTimeValue: "< 2 min",
  },
  contactForm: {
    badge: "WE READ EVERY MESSAGE",
    titleNormal: "Send Your",
    titleHighlight: "Message",
    submitButtonText: "Send Message",
    clearButtonText: "Clear",
  },
  officeMap: {
    badge: "VISIT OUR TEAM",
    title: "Our UK Office Locations",
    embedUrl: "",
  },
  offices: {
    badge: "GLOBAL PRESENCE",
    title: "Offices Across Continents",
    groups: [
      {
        title: "Delivery Centers",
        locations: [
          "Southampton, United Kingdom",
          "London, United Kingdom",
          "Mumbai, India",
          "Ahmedabad, India",
          "Kolkata, India",
          "Noida, India",
        ],
      },
      {
        title: "Sales Offices",
        locations: [
          "London, United Kingdom",
          "Mumbai, India",
          "Texas, USA",
          "Sydney, Australia",
          "United Arab Emirates",
          "Douglas, Isle of Man",
        ],
      },
      {
        title: "Corporate Offices",
        locations: [
          "London, United Kingdom",
          "Basingstoke, United Kingdom",
          "Mumbai, India",
        ],
      },
    ],
  },
};

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

// PATCH — update (upsert so it never 404s even if row was deleted)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      hero,
      contactInfo,
      liveSupport,
      contactForm,
      officeMap,
      offices,
      isPublished,
    } = body;

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

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Update failed." },
      { status: 500 }
    );
  }
}