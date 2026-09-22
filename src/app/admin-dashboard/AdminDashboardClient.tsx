"use client";

import React, { useState } from "react";
import { Tab } from "./types/dashboard";
import { Header } from "../admin/components/Header";
import { Sidebar } from "../admin/components/Sidebar";
import { OverviewPanel } from "../admin/components/OverviewPanel";
import BlogPanel from "./panels/BlogPanel";
import MediaLibraryPanel from "./panels/MediaLibraryPanel";
import { PlaceholderPanel } from "./panels/PlaceholderPanel";
import { PortfolioPanel } from "./panels/PortfolioPanel";
import { UsersPanel } from "./panels/UsersPanel";
import { FormsPanel } from "./panels/FormsPanel";
import { PackagesPanel } from "./panels/PackagesPanel";
import { SocialPanel } from "./panels/SocialPanel";
import { ContactPagePanel } from "./panels/ContactPagePanel";
import CaseStudiesPanel from "./panels/CaseStudiesPanel";
import TestimonialPanel from "./panels/TestimonialPanel";
import FAQPanel from "./panels/FAQPanel";
import ClientsPanel from "./panels/ClientsPanel";
import ProcessPanel from "./panels/ProcessPanel";
import ServicesPanel from "./panels/ServicesPanel";
import { useAdminData } from "../admin/hooks/useAdminData";
import { ToastProvider } from "./components/UI/Toast";
import { X, CheckCircle2 } from "lucide-react";

function AdminDashboardContent({ adminName, initialTab }: { adminName: string; initialTab: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [open, setOpen] = useState(false);

  const data = useAdminData();

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased selection:bg-cyan-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        tab={tab}
        setTab={setTab}
        open={open}
        setOpen={setOpen}
        adminName={adminName}
      
      />

      {/* Main Workspace */}
      <div className="flex min-h-screen flex-col lg:pl-72 transition-all duration-300">
        <Header tab={tab} setOpen={setOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Notification Alert Banner */}
          {data.message && (
            <div className="flex items-center justify-between rounded-2xl border border-cyan-200/80 bg-gradient-to-r from-cyan-50/90 via-sky-50/80 to-white px-4 py-3 text-xs font-medium text-cyan-900 shadow-xs backdrop-blur-xs animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-cyan-600 shrink-0" />
                <span>{data.message}</span>
              </div>
              <button
                onClick={() => data.setMessage("")}
                className="rounded-lg p-1 text-cyan-700 hover:bg-cyan-100/60 hover:text-cyan-950 transition"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Dynamic Tab Panels */}
          <div className="transition-all duration-200">
            {tab === "overview" && (
              <OverviewPanel
                metrics={data.metrics}
                submissions={data.submissions}
                purchases={data.purchases}
              />
            )}

            {tab === "users" && (
              <UsersPanel
                users={data.users}
                form={data.userForm}
                setForm={data.setUserForm}
                editing={data.editingUser}
                setEditing={data.setEditingUser}
                save={data.saveUser}
                remove={async (id) => {
                  if (confirm("Delete this user?")) {
                    await data.request(`/api/admin/users/${id}`, { method: "DELETE" });
                    data.loadUsers();
                  }
                }}
                blankUser={data.BLANK_USER}
              />
            )}

            {tab === "forms" && (
              <FormsPanel
                forms={data.forms}
                submissions={data.submissions}
                request={data.request}
                reload={data.loadForms}
                notify={data.setMessage}
              />
            )}

            {tab === "packages" && <PackagesPanel />}

            {tab === "social" && (
              <SocialPanel
                links={data.socialLinks}
                form={data.socialForm}
                setForm={data.setSocialForm}
                save={async (e) => {
                  e.preventDefault();
                  await data.request("/api/admin/social-links", {
                    method: "POST",
                    body: JSON.stringify(data.socialForm),
                  });
                  data.setSocialForm({
                    platform: "",
                    url: "",
                    isActive: true,
                    sortOrder: 0,
                  });
                  data.setMessage("Social link saved.");
                  data.loadSocial();
                }}
                select={(link) => data.setSocialForm(link)}
              />
            )}

            {tab === "portfolio" && (
              <PortfolioPanel
                portfolio={data.portfolio}
                form={data.portfolioForm}
                setForm={data.setPortfolioForm}
                editing={data.editingPortfolio}
                setEditing={data.setEditingPortfolio}
                save={async (e) => {
                  e.preventDefault();
                  const endpoint = data.editingPortfolio
                    ? `/api/admin/portfolio/${data.editingPortfolio.id}`
                    : "/api/admin/portfolio";
                  const method = data.editingPortfolio ? "PATCH" : "POST";
                  await data.request(endpoint, {
                    method,
                    body: JSON.stringify(data.portfolioForm),
                  });
                  data.setPortfolioForm({
                    title: "",
                    category: "WEB DESIGN",
                    image: "",
                  });
                  data.setEditingPortfolio(null);
                  data.loadPortfolio();
                  data.setMessage("Portfolio item saved.");
                }}
                select={(item) => {
                  data.setEditingPortfolio(item);
                  data.setPortfolioForm({
                    title: item.title,
                    category: item.category,
                    image: item.image,
                  });
                }}
                remove={async (id) => {
                  if (confirm("Delete this portfolio item?")) {
                    await data.request(`/api/admin/portfolio/${id}`, {
                      method: "DELETE",
                    });
                    data.loadPortfolio();
                  }
                }}
              />
            )}

            {tab === "blogs" && <BlogPanel />}

            {tab === "media" && <MediaLibraryPanel />}

            {tab === "pages" && (
              <PlaceholderPanel title="Pages" description="Manage static site pages such as About, Team and Careers." />
            )}

            {tab === "seo" && (
              <PlaceholderPanel title="SEO Settings" description="Site-wide metadata, sitemap and social sharing defaults." />
            )}

            {tab === "settings" && (
              <PlaceholderPanel title="Settings" description="General site configuration." />
            )}

            {tab === "services" && <ServicesPanel />}

            {tab === "contact-page" && (
              <ContactPagePanel
                content={data.contactPage}
                setContent={data.setContactPage}
                save={data.saveContactPage}
                saving={data.savingContact}
                isDirty={data.isContactPageDirty}
              />
            )}

            {tab === "faqs" && (
              <FAQPanel
                faqs={data.faqs}
                form={data.faqForm}
                setForm={data.setFaqForm}
                editing={data.editingFAQ}
                setEditing={data.setEditingFAQ}
                save={data.saveFAQ}
                select={(faq) => {
                  data.setEditingFAQ(faq);
                  data.setFaqForm({
                    question: faq.question,
                    answer: faq.answer,
                    sortOrder: faq.sortOrder,
                    isActive: faq.isActive,
                  });
                }}
                remove={async (id) => {
                  if (confirm("Delete this FAQ?")) {
                    await data.request(`/api/admin/faqs/${id}`, {
                      method: "DELETE",
                    });
                    await data.loadFAQs();
                  }
                }}
                toggleActive={async (faq) => {
                  await data.request(`/api/admin/faqs/${faq.id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                      question: faq.question,
                      answer: faq.answer,
                      sortOrder: faq.sortOrder,
                      isActive: !faq.isActive,
                    }),
                  });
                  await data.loadFAQs();
                }}
              />
            )}

            {tab === "clients" && (
              <ClientsPanel
                clients={data.clients}
                loading={data.clientsLoading}
                createClient={data.createClient}
                updateClient={data.updateClient}
                deleteClient={data.deleteClient}
                uploadClientImage={data.uploadClientImage}
              />
            )}

            {tab === "process" && (
              <ProcessPanel
                process={data.process}
                loading={data.processLoading}
                saveSection={data.saveProcessSection}
                createStep={data.createProcessStep}
                updateStep={data.updateProcessStep}
                deleteStep={data.deleteProcessStep}
                toggleStep={data.toggleProcessStep}
                moveStep={data.moveProcessStep}
                reload={data.loadProcess}
              />
            )}

            {tab === "case-studies" && (
              <CaseStudiesPanel
                caseStudies={data.caseStudies}
                loading={data.caseStudiesLoading}
                createCaseStudy={data.createCaseStudy}
                updateCaseStudy={data.updateCaseStudy}
                deleteCaseStudy={data.deleteCaseStudy}
                toggleCaseStudy={data.toggleCaseStudy}
                uploadCaseStudyImage={data.uploadCaseStudyImage}
                moveCaseStudy={data.moveCaseStudy}
                reload={data.loadCaseStudies}
              />
            )}

            {tab === "testimonials" && (
              <TestimonialPanel
                testimonials={data.testimonials}
                loading={data.testimonialsLoading}
                createTestimonial={data.createTestimonial}
                updateTestimonial={data.updateTestimonial}
                deleteTestimonial={data.deleteTestimonial}
                toggleTestimonial={data.toggleTestimonial}
                reload={data.loadTestimonials}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardClient({ adminName, initialTab = "overview" }: { adminName: string; initialTab?: Tab }) {
  return (
    <ToastProvider>
      <AdminDashboardContent adminName={adminName} initialTab={initialTab} />
    </ToastProvider>
  );
}
