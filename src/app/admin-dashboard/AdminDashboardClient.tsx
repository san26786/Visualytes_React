"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Tab } from "./types/dashboard";
import { Header } from "../admin/components/Header";
import { Sidebar } from "../admin/components/Sidebar";
import { OverviewPanel } from "../admin/components/OverviewPanel";
import BlogPanel from "./panels/BlogPanel";
import MediaLibraryPanel from "./panels/MediaLibraryPanel";
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
import SeoQuestionnairePanel from "./panels/SeoQuestionnairePanel";
import PageContentPanel from "./panels/PageContentPanel";
import { SettingsPanel } from "./panels/SettingsPanel";
import { useAdminData } from "../admin/hooks/useAdminData";
import { ToastProvider } from "./components/UI/Toast";
import { useConfirm } from "./components/UI/Confirm";

// Desktop sidebar size, remembered between visits. Read through useSyncExternalStore so the
// server render (always expanded) and the first client render agree.
const COLLAPSED_KEY = "admin-sidebar-collapsed";
const COLLAPSED_EVENT = "admin-sidebar-collapsed-change";

function readCollapsed() {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeCollapsed(value: boolean) {
  try {
    localStorage.setItem(COLLAPSED_KEY, value ? "1" : "0");
  } catch {}
  window.dispatchEvent(new Event(COLLAPSED_EVENT));
}

function subscribeCollapsed(onChange: () => void) {
  window.addEventListener(COLLAPSED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(COLLAPSED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function AdminDashboardContent({ adminName, initialTab }: { adminName: string; initialTab: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [open, setOpen] = useState(false);
  const collapsed = useSyncExternalStore(subscribeCollapsed, readCollapsed, () => false);

  // Mirror the open tab in the URL so a refresh (or a shared link) reopens the same panel
  // instead of whatever ?tab= the page was first loaded with.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (tab === "overview") url.searchParams.delete("tab");
    else url.searchParams.set("tab", tab);
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
  }, [tab]);

  const data = useAdminData();
  const confirm = useConfirm();

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 antialiased selection:bg-cyan-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        tab={tab}
        setTab={setTab}
        open={open}
        setOpen={setOpen}
        adminName={adminName}
        collapsed={collapsed}
        setCollapsed={writeCollapsed}
      />

      {/* Main Workspace */}
      <div className={`flex min-h-screen min-w-0 flex-col transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        <Header tab={tab} setOpen={setOpen} />

        {/* Grid children default to min-width:auto, so a wide table would stretch its card past the
            screen on phones; min-w-0 keeps every card inside the viewport and lets tables scroll. */}
        <main className="@container flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 [&_.grid>*]:min-w-0">
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
                  if (await confirm({ title: "Delete this user?", description: "They will lose access immediately. This cannot be undone.", confirmLabel: "Delete user" })) data.removeUser(id);
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

            {tab === "seo-questionnaire" && <SeoQuestionnairePanel />}

            {tab === "page-content" && <PageContentPanel />}

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
                  if (await confirm({ title: "Delete this portfolio item?", confirmLabel: "Delete item" })) {
                    await data.request(`/api/admin/portfolio/${id}`, {
                      method: "DELETE",
                    });
                    data.loadPortfolio();
                    data.setMessage("Portfolio item deleted.");
                  }
                }}
              />
            )}

            {tab === "blogs" && <BlogPanel />}

            {tab === "media" && <MediaLibraryPanel />}

            {tab === "settings" && <SettingsPanel onOpenTab={setTab} />}

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
                  if (await confirm({ title: "Delete this FAQ?", confirmLabel: "Delete FAQ" })) {
                    await data.request(`/api/admin/faqs/${id}`, {
                      method: "DELETE",
                    });
                    await data.loadFAQs();
                    data.setMessage("FAQ deleted.");
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
                  data.setMessage(faq.isActive ? "FAQ hidden." : "FAQ is now visible.");
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
