import { createDispatcher, type RouteEntry } from "@/src/server/dispatch";

import { POST as authLoginPOST } from "@/src/server/api/auth/login/handlers";
import { GET as blogGET } from "@/src/server/api/blog/handlers";
import { GET as blogSlugGET } from "@/src/server/api/blog/[slug]/handlers";
import { POST as blogSlugViewPOST } from "@/src/server/api/blog/[slug]/view/handlers";
import { POST as careersPOST } from "@/src/server/api/careers/handlers";
import { POST as checkoutPOST } from "@/src/server/api/checkout/handlers";
import { POST as checkoutConfirmPOST } from "@/src/server/api/checkout/confirm/handlers";
import { POST as contactPOST } from "@/src/server/api/contact/handlers";
import { POST as enquiryPOST } from "@/src/server/api/enquiry/handlers";
import { POST as estimateProjectPOST } from "@/src/server/api/estimate-project/handlers";
import { GET as faqsGET } from "@/src/server/api/faqs/handlers";
import { POST as importPOST } from "@/src/server/api/import/handlers";
import { GET as servicesGET } from "@/src/server/api/services/handlers";
import { GET as servicesIdGET } from "@/src/server/api/services/[id]/handlers";
import { GET as socialLinksGET } from "@/src/server/api/social-links/handlers";
import { POST as stripeWebhookPOST } from "@/src/server/api/stripe/webhook/handlers";
import { POST as uploadClientPOST } from "@/src/server/api/upload-client/handlers";

// Note: /api/admin/* is handled by the more specific src/app/api/admin/[...slug]/route.ts,
// which Next.js matches first for those paths.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const routes: RouteEntry[] = [
  { method: "POST", segments: ["auth", "login"], handler: authLoginPOST },
  { method: "GET", segments: ["blog"], handler: blogGET },
  { method: "GET", segments: ["blog", ":slug"], handler: blogSlugGET },
  { method: "POST", segments: ["blog", ":slug", "view"], handler: blogSlugViewPOST },
  { method: "POST", segments: ["careers"], handler: careersPOST },
  { method: "POST", segments: ["checkout"], handler: checkoutPOST },
  { method: "POST", segments: ["checkout", "confirm"], handler: checkoutConfirmPOST },
  { method: "POST", segments: ["contact"], handler: contactPOST },
  { method: "POST", segments: ["enquiry"], handler: enquiryPOST },
  { method: "POST", segments: ["estimate-project"], handler: estimateProjectPOST },
  { method: "GET", segments: ["faqs"], handler: faqsGET },
  { method: "POST", segments: ["import"], handler: importPOST },
  { method: "GET", segments: ["services"], handler: servicesGET },
  { method: "GET", segments: ["services", ":id"], handler: servicesIdGET },
  { method: "GET", segments: ["social-links"], handler: socialLinksGET },
  { method: "POST", segments: ["stripe", "webhook"], handler: stripeWebhookPOST },
  { method: "POST", segments: ["upload-client"], handler: uploadClientPOST },
];

const dispatch = createDispatcher(routes);

export const GET = dispatch;
export const POST = dispatch;
export const PATCH = dispatch;
export const PUT = dispatch;
export const DELETE = dispatch;
