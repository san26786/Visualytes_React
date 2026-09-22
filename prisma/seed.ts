import { PrismaClient, Role } from "../src/generated/prisma-admin/index.js";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();


async function main() {

  const [adminPassword, userPassword] = await Promise.all([
    bcrypt.hash("Admin@123", 10),
    bcrypt.hash("User@123", 10),
  ]);

  await prisma.user.upsert({
    where: { email: "admin@visualytes.com" },
    update: { name: "Admin", password: adminPassword, role: Role.ADMIN },
    create: { name: "Admin", email: "admin@visualytes.com", password: adminPassword, role: Role.ADMIN },
  });

  const forms = [
    { key: "contact", title: "Contact Us", fields: ["name", "email", "phone", "topic", "message"] },
    { key: "estimate-project", title: "Estimate Project", fields: ["firstName", "lastName", "companyName", "companyPersonnel", "email", "phone", "mobileType", "budget", "projectDetails", "timeline", "marketing"] },
    { key: "seo-questionnaire", title: "SEO Questionnaire", fields: ["businessName", "contactPerson", "mobileNumber", "businessPhone", "websiteUrl", "businessEmail", "addressLine1", "addressLine2", "city", "state", "postalCode", "country", "businessSector", "description", "businessCategories", "servicesProducts"] },
  ];
  await Promise.all(forms.map((form) => prisma.formDefinition.upsert({
    where: { key: form.key },
    update: { title: form.title, fields: form.fields },
    create: form,
  })));

  const packages = [
    { name: "Landing Pages", category: "Website", price: 499, durationDays: null, features: ["Single Static Page", "Mobile Friendly", "3 months technical support"] },
    { name: "Brochure Website", category: "Website", price: 1499, durationDays: null, features: ["Five static pages", "WordPress", "Mobile Friendly"] },
    { name: "Corporate Website", category: "Website", price: 2499, durationDays: null, features: ["Up to 20 pages", "WordPress or Drupal", "Mobile Friendly"] },
    { name: "Basic SEO", category: "Marketing", price: 350, durationDays: 30, features: ["Keyword research", "On-page SEO", "Monthly reporting"] },
    { name: "Standard SEO", category: "Marketing", price: 700, durationDays: 30, features: ["SEO and content", "Social media support", "Monthly reporting"] },
    { name: "Premium SEO", category: "Marketing", price: 1050, durationDays: 30, features: ["Advanced SEO", "Content marketing", "Social media support"] },
  ];
  await Promise.all(packages.map((item) => prisma.package.upsert({
    where: { name: item.name },
    update: item,
    create: item,
  })));

  const socialLinks = [
    ["Facebook", "https://www.facebook.com/visualyteslimited"],
    ["Twitter", "https://twitter.com/visualytes"],
    ["Google", "https://www.google.com/search?q=Visualytes+Limited"],
    ["YouTube", "https://www.youtube.com/channel/UCVV3R4Ye2162x8BrCuUY40Q"],
    ["LinkedIn", "https://www.linkedin.com/company/visualytes-limited/about/"],
  ];
  await Promise.all(socialLinks.map(([platform, url], sortOrder) => prisma.socialLink.upsert({
    where: { platform },
    update: { url, sortOrder },
    create: { platform, url, sortOrder },
  })));
  await prisma.user.upsert({
    where: { email: "user@visualytes.com" },
    update: { name: "Test User", password: userPassword, role: Role.EDITOR },
    create: { name: "Test User", email: "user@visualytes.com", password: userPassword, role: Role.EDITOR },
  });

  console.log("Admin and test user created");
const services = [
  {
    name: "Corporate Branding",
    title: "Corporate Branding",
    slug: "corporate-branding",
    content: {},
  },
  {
    name: "SEO",
    title: "SEO",
    slug: "seo",
    content: {},
  },
  {
    name: "Web Development",
    title: "Web Development",
    slug: "web-development",
    content: {},
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    content: {},
  },
];

for (const service of services) {
  await prisma.service.upsert({
    where: {
      slug: service.slug,
    },
    update: {
      name: service.name,
      content: service.content,
    },
    create: service,
  });
}

  for (const service of services) {
    await prisma.service.upsert({
      where: {
        slug: service.slug,
      },
      update: {},
      create: service,
    });
  }
}
 



main()
.catch(console.error)
.finally(async()=>{
  await prisma.$disconnect();
});
