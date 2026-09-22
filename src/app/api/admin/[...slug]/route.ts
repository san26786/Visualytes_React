import { createDispatcher, type RouteEntry } from "@/src/server/dispatch";

import { DELETE as authorsIdDELETE } from "@/src/server/api/admin/authors/[id]/handlers";
import { POST as authorsPOST } from "@/src/server/api/admin/authors/handlers";
import { GET as blogMetaGET } from "@/src/server/api/admin/blog-meta/handlers";
import { POST as blogsIdDuplicatePOST } from "@/src/server/api/admin/blogs/[id]/duplicate/handlers";
import { DELETE as blogsIdDELETE, GET as blogsIdGET, PATCH as blogsIdPATCH } from "@/src/server/api/admin/blogs/[id]/handlers";
import { GET as blogsGET, POST as blogsPOST } from "@/src/server/api/admin/blogs/handlers";
import { DELETE as caseStudiesIdDELETE, GET as caseStudiesIdGET, PUT as caseStudiesIdPUT } from "@/src/server/api/admin/case-studies/[id]/handlers";
import { GET as caseStudiesGET, POST as caseStudiesPOST } from "@/src/server/api/admin/case-studies/handlers";
import { GET as categoriesGET, POST as categoriesPOST } from "@/src/server/api/admin/categories/handlers";
import { DELETE as clientsIdDELETE, PUT as clientsIdPUT } from "@/src/server/api/admin/clients/[id]/handlers";
import { GET as clientsGET, POST as clientsPOST } from "@/src/server/api/admin/clients/handlers";
import { POST as clientsImportPOST } from "@/src/server/api/admin/clients/import/handlers";
import { GET as contactPageGET, PATCH as contactPagePATCH } from "@/src/server/api/admin/contact-page/handlers";
import { DELETE as faqsIdDELETE, PUT as faqsIdPUT } from "@/src/server/api/admin/faqs/[id]/handlers";
import { GET as faqsGET, POST as faqsPOST } from "@/src/server/api/admin/faqs/handlers";
import { DELETE as formsSubmissionsIdDELETE } from "@/src/server/api/admin/forms/submissions/[id]/handlers";
import { GET as formsGET, PATCH as formsPATCH } from "@/src/server/api/admin/forms/handlers";
import { DELETE as mediaIdDELETE, PATCH as mediaIdPATCH } from "@/src/server/api/admin/media/[id]/handlers";
import { GET as mediaGET } from "@/src/server/api/admin/media/handlers";
import { DELETE as packagesIdDELETE, PATCH as packagesIdPATCH } from "@/src/server/api/admin/packages/[id]/handlers";
import { GET as packagesGET, POST as packagesPOST } from "@/src/server/api/admin/packages/handlers";
import { DELETE as portfolioIdDELETE, GET as portfolioIdGET, PATCH as portfolioIdPATCH } from "@/src/server/api/admin/portfolio/[id]/handlers";
import { GET as portfolioGET, POST as portfolioPOST } from "@/src/server/api/admin/portfolio/handlers";
import { POST as portfolioSeedPOST } from "@/src/server/api/admin/portfolio/seed/handlers";
import { GET as processGET, PATCH as processPATCH } from "@/src/server/api/admin/process/handlers";
import { DELETE as processStepsIdDELETE, PUT as processStepsIdPUT } from "@/src/server/api/admin/process/steps/[id]/handlers";
import { POST as processStepsPOST } from "@/src/server/api/admin/process/steps/handlers";
import { DELETE as servicesSlugDELETE, GET as servicesSlugGET, PATCH as servicesSlugPATCH } from "@/src/server/api/admin/services/[slug]/handlers";
import { GET as servicesGET, POST as servicesPOST } from "@/src/server/api/admin/services/handlers";
import { PUT as servicesReorderPUT } from "@/src/server/api/admin/services/reorder/handlers";
import { GET as socialLinksGET, POST as socialLinksPOST } from "@/src/server/api/admin/social-links/handlers";
import { DELETE as testimonialsIdDELETE, PUT as testimonialsIdPUT } from "@/src/server/api/admin/testimonials/[id]/handlers";
import { GET as testimonialsGET, POST as testimonialsPOST } from "@/src/server/api/admin/testimonials/handlers";
import { POST as uploadPOST } from "@/src/server/api/admin/upload/handlers";
import { POST as uploadBlogPOST } from "@/src/server/api/admin/upload-blog/handlers";
import { POST as uploadCaseStudyPOST } from "@/src/server/api/admin/upload-case-study/handlers";
import { POST as uploadClientPOST } from "@/src/server/api/admin/upload-client/handlers";
import { POST as uploadProcessPOST } from "@/src/server/api/admin/upload-process/handlers";
import { GET as uploadServiceGET, POST as uploadServicePOST } from "@/src/server/api/admin/upload-service/handlers";
import { POST as uploadServiceClientPOST } from "@/src/server/api/admin/upload-service/client/handlers";
import { POST as uploadTestimonialPOST } from "@/src/server/api/admin/upload-testimonial/handlers";
import { DELETE as usersIdDELETE, PATCH as usersIdPATCH } from "@/src/server/api/admin/users/[id]/handlers";
import { GET as usersGET, POST as usersPOST } from "@/src/server/api/admin/users/handlers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const routes: RouteEntry[] = [
  { method: "POST", segments: ["authors"], handler: authorsPOST },
  { method: "DELETE", segments: ["authors", ":id"], handler: authorsIdDELETE },
  { method: "GET", segments: ["blog-meta"], handler: blogMetaGET },
  { method: "GET", segments: ["blogs"], handler: blogsGET },
  { method: "POST", segments: ["blogs"], handler: blogsPOST },
  { method: "GET", segments: ["blogs", ":id"], handler: blogsIdGET },
  { method: "PATCH", segments: ["blogs", ":id"], handler: blogsIdPATCH },
  { method: "DELETE", segments: ["blogs", ":id"], handler: blogsIdDELETE },
  { method: "POST", segments: ["blogs", ":id", "duplicate"], handler: blogsIdDuplicatePOST },
  { method: "GET", segments: ["case-studies"], handler: caseStudiesGET },
  { method: "POST", segments: ["case-studies"], handler: caseStudiesPOST },
  { method: "GET", segments: ["case-studies", ":id"], handler: caseStudiesIdGET },
  { method: "PUT", segments: ["case-studies", ":id"], handler: caseStudiesIdPUT },
  { method: "DELETE", segments: ["case-studies", ":id"], handler: caseStudiesIdDELETE },
  { method: "GET", segments: ["categories"], handler: categoriesGET },
  { method: "POST", segments: ["categories"], handler: categoriesPOST },
  { method: "GET", segments: ["clients"], handler: clientsGET },
  { method: "POST", segments: ["clients"], handler: clientsPOST },
  { method: "PUT", segments: ["clients", ":id"], handler: clientsIdPUT },
  { method: "DELETE", segments: ["clients", ":id"], handler: clientsIdDELETE },
  { method: "POST", segments: ["clients", "import"], handler: clientsImportPOST },
  { method: "GET", segments: ["contact-page"], handler: contactPageGET },
  { method: "PATCH", segments: ["contact-page"], handler: contactPagePATCH },
  { method: "GET", segments: ["faqs"], handler: faqsGET },
  { method: "POST", segments: ["faqs"], handler: faqsPOST },
  { method: "PUT", segments: ["faqs", ":id"], handler: faqsIdPUT },
  { method: "DELETE", segments: ["faqs", ":id"], handler: faqsIdDELETE },
  { method: "GET", segments: ["forms"], handler: formsGET },
  { method: "PATCH", segments: ["forms"], handler: formsPATCH },
  { method: "DELETE", segments: ["forms", "submissions", ":id"], handler: formsSubmissionsIdDELETE },
  { method: "GET", segments: ["media"], handler: mediaGET },
  { method: "PATCH", segments: ["media", ":id"], handler: mediaIdPATCH },
  { method: "DELETE", segments: ["media", ":id"], handler: mediaIdDELETE },
  { method: "GET", segments: ["packages"], handler: packagesGET },
  { method: "POST", segments: ["packages"], handler: packagesPOST },
  { method: "PATCH", segments: ["packages", ":id"], handler: packagesIdPATCH },
  { method: "DELETE", segments: ["packages", ":id"], handler: packagesIdDELETE },
  { method: "GET", segments: ["portfolio"], handler: portfolioGET },
  { method: "POST", segments: ["portfolio"], handler: portfolioPOST },
  { method: "GET", segments: ["portfolio", ":id"], handler: portfolioIdGET },
  { method: "PATCH", segments: ["portfolio", ":id"], handler: portfolioIdPATCH },
  { method: "DELETE", segments: ["portfolio", ":id"], handler: portfolioIdDELETE },
  { method: "POST", segments: ["portfolio", "seed"], handler: portfolioSeedPOST },
  { method: "GET", segments: ["process"], handler: processGET },
  { method: "PATCH", segments: ["process"], handler: processPATCH },
  { method: "POST", segments: ["process", "steps"], handler: processStepsPOST },
  { method: "PUT", segments: ["process", "steps", ":id"], handler: processStepsIdPUT },
  { method: "DELETE", segments: ["process", "steps", ":id"], handler: processStepsIdDELETE },
  { method: "GET", segments: ["services"], handler: servicesGET },
  { method: "POST", segments: ["services"], handler: servicesPOST },
  { method: "GET", segments: ["services", ":slug"], handler: servicesSlugGET },
  { method: "PATCH", segments: ["services", ":slug"], handler: servicesSlugPATCH },
  { method: "DELETE", segments: ["services", ":slug"], handler: servicesSlugDELETE },
  { method: "PUT", segments: ["services", "reorder"], handler: servicesReorderPUT },
  { method: "GET", segments: ["social-links"], handler: socialLinksGET },
  { method: "POST", segments: ["social-links"], handler: socialLinksPOST },
  { method: "GET", segments: ["testimonials"], handler: testimonialsGET },
  { method: "POST", segments: ["testimonials"], handler: testimonialsPOST },
  { method: "PUT", segments: ["testimonials", ":id"], handler: testimonialsIdPUT },
  { method: "DELETE", segments: ["testimonials", ":id"], handler: testimonialsIdDELETE },
  { method: "POST", segments: ["upload"], handler: uploadPOST },
  { method: "POST", segments: ["upload-blog"], handler: uploadBlogPOST },
  { method: "POST", segments: ["upload-case-study"], handler: uploadCaseStudyPOST },
  { method: "POST", segments: ["upload-client"], handler: uploadClientPOST },
  { method: "POST", segments: ["upload-process"], handler: uploadProcessPOST },
  { method: "GET", segments: ["upload-service"], handler: uploadServiceGET },
  { method: "POST", segments: ["upload-service"], handler: uploadServicePOST },
  { method: "POST", segments: ["upload-service", "client"], handler: uploadServiceClientPOST },
  { method: "POST", segments: ["upload-testimonial"], handler: uploadTestimonialPOST },
  { method: "GET", segments: ["users"], handler: usersGET },
  { method: "POST", segments: ["users"], handler: usersPOST },
  { method: "PATCH", segments: ["users", ":id"], handler: usersIdPATCH },
  { method: "DELETE", segments: ["users", ":id"], handler: usersIdDELETE },
];

const dispatch = createDispatcher(routes);

export const GET = dispatch;
export const POST = dispatch;
export const PATCH = dispatch;
export const PUT = dispatch;
export const DELETE = dispatch;
