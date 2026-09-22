"use client";

import React, { FormEvent } from "react";
import { Panel } from "../components/UI/Panel";
import { Input, Textarea } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { ContactPageContent } from "../types/dashboard";
import {
  PhoneCall,
  Mail,
  MapPin,
  Headphones,
  Send,
  Map,
  Globe,
  Save,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface Props {
  content: ContactPageContent | null;
  setContent: (c: ContactPageContent) => void;
  save: (e: FormEvent) => void;
  saving: boolean;
  isDirty: boolean;
}

export function ContactPagePanel({
  content,
  setContent,
  save,
  saving,
  isDirty,
}: Props) {
  if (!content) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <p className="text-sm font-medium text-slate-400">Loading contact page content...</p>
      </div>
    );
  }

  const patch = <K extends keyof ContactPageContent>(
    section: K,
    value: ContactPageContent[K]
  ) => setContent({ ...content, [section]: value });

  return (
    <form onSubmit={save} className="space-y-8 pb-16">
      {/* Hero Section */}
      <Panel
        title="Contact Page Hero Header"
        description="Main headline and introductory description on the contact page"
        icon={<Sparkles size={18} className="text-cyan-600" />}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Hero Title (Regular Text)"
            value={content.hero.titleNormal}
            onChangeValue={(v) =>
              patch("hero", { ...content.hero, titleNormal: v })
            }
          />
          <Input
            label="Hero Title (Accent / Highlight Text)"
            value={content.hero.titleHighlight}
            onChangeValue={(v) =>
              patch("hero", { ...content.hero, titleHighlight: v })
            }
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Hero Subtitle Description"
              rows={2}
              value={content.hero.subtitle}
              onChange={(e) =>
                patch("hero", { ...content.hero, subtitle: e.target.value })
              }
            />
          </div>
        </div>
      </Panel>

      {/* Contact Info Cards */}
      <Panel
        title="Direct Contact Cards"
        description="Phone numbers, email addresses, and primary office locations"
        icon={<PhoneCall size={18} className="text-indigo-600" />}
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Call Us */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <PhoneCall size={16} className="text-cyan-600" />
              <span>Call Us</span>
            </div>
            <Input
              label="Enquiry Label"
              value={content.contactInfo.call.enquiryLabel}
              onChangeValue={(v) =>
                patch("contactInfo", {
                  ...content.contactInfo,
                  call: { ...content.contactInfo.call, enquiryLabel: v },
                })
              }
            />
            <Input
              label="Enquiry Phone"
              value={content.contactInfo.call.enquiryValue}
              onChangeValue={(v) =>
                patch("contactInfo", {
                  ...content.contactInfo,
                  call: { ...content.contactInfo.call, enquiryValue: v },
                })
              }
            />
            <Input
              label="Support Label"
              value={content.contactInfo.call.supportLabel}
              onChangeValue={(v) =>
                patch("contactInfo", {
                  ...content.contactInfo,
                  call: { ...content.contactInfo.call, supportLabel: v },
                })
              }
            />
            <Input
              label="Support Phone"
              value={content.contactInfo.call.supportValue}
              onChangeValue={(v) =>
                patch("contactInfo", {
                  ...content.contactInfo,
                  call: { ...content.contactInfo.call, supportValue: v },
                })
              }
            />
          </div>

          {/* Write Us */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Mail size={16} className="text-indigo-600" />
              <span>Write Us</span>
            </div>
            <Textarea
              label="Contact Email Addresses"
              hint="One email per line"
              rows={8}
              value={content.contactInfo.write.emails.join("\n")}
              onChange={(e) =>
                patch("contactInfo", {
                  ...content.contactInfo,
                  write: {
                    ...content.contactInfo.write,
                    emails: e.target.value.split("\n").filter(Boolean),
                  },
                })
              }
            />
          </div>

          {/* Visit Us */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <MapPin size={16} className="text-emerald-600" />
              <span>Visit Us</span>
            </div>
            <Textarea
              label="Office Addresses"
              hint="One address per line"
              rows={8}
              value={content.contactInfo.visit.addresses.join("\n")}
              onChange={(e) =>
                patch("contactInfo", {
                  ...content.contactInfo,
                  visit: {
                    ...content.contactInfo.visit,
                    addresses: e.target.value.split("\n").filter(Boolean),
                  },
                })
              }
            />
          </div>
        </div>
      </Panel>

      {/* Live Support Card */}
      <Panel
        title="Live Support & WhatsApp Helpdesk"
        description="Real-time support widget and response time indicators"
        icon={<Headphones size={18} className="text-cyan-600" />}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Badge Tag"
            value={content.liveSupport.badge}
            onChangeValue={(v) =>
              patch("liveSupport", { ...content.liveSupport, badge: v })
            }
          />
          <Input
            label="Direct Phone Hotline"
            value={content.liveSupport.callNumber}
            onChangeValue={(v) =>
              patch("liveSupport", { ...content.liveSupport, callNumber: v })
            }
          />
          <Input
            label="WhatsApp Button Text"
            value={content.liveSupport.whatsappButtonText}
            onChangeValue={(v) =>
              patch("liveSupport", {
                ...content.liveSupport,
                whatsappButtonText: v,
              })
            }
          />
          <Input
            label="Average Response Time"
            value={content.liveSupport.responseTimeValue}
            onChangeValue={(v) =>
              patch("liveSupport", {
                ...content.liveSupport,
                responseTimeValue: v,
              })
            }
          />
          <Input
            label="Availability Indicator"
            value={content.liveSupport.availabilityValue}
            onChangeValue={(v) =>
              patch("liveSupport", {
                ...content.liveSupport,
                availabilityValue: v,
              })
            }
          />
          <Input
            label="Agent Avatar Image URL"
            value={content.liveSupport.image}
            onChangeValue={(v) =>
              patch("liveSupport", { ...content.liveSupport, image: v })
            }
          />
          <div className="sm:col-span-2 lg:col-span-3">
            <Textarea
              label="Support Section Description"
              rows={2}
              value={content.liveSupport.description}
              onChange={(e) =>
                patch("liveSupport", {
                  ...content.liveSupport,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
      </Panel>

      {/* Form Section Labels & Google Map */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Contact Form Section"
          description="Badge tag and submit button copy"
          icon={<Send size={18} className="text-indigo-600" />}
        >
          <div className="space-y-4">
            <Input
              label="Form Section Badge"
              value={content.contactForm.badge}
              onChangeValue={(v) =>
                patch("contactForm", { ...content.contactForm, badge: v })
              }
            />
            <Input
              label="Submit Button Label"
              value={content.contactForm.submitButtonText}
              onChangeValue={(v) =>
                patch("contactForm", {
                  ...content.contactForm,
                  submitButtonText: v,
                })
              }
            />
          </div>
        </Panel>

        <Panel
          title="Google Map Embed"
          description="Interactive map frame displayed on the contact page"
          icon={<Map size={18} className="text-emerald-600" />}
        >
          <div className="space-y-4">
            <Input
              label="Map Section Title"
              value={content.officeMap.title}
              onChangeValue={(v) =>
                patch("officeMap", { ...content.officeMap, title: v })
              }
            />
            <Input
              label="Google Maps Embed URL"
              value={content.officeMap.embedUrl}
              onChangeValue={(v) =>
                patch("officeMap", { ...content.officeMap, embedUrl: v })
              }
            />
          </div>
        </Panel>
      </div>

      {/* Continents Office Locations */}
      <Panel
        title="Global Office Hubs"
        description="Regional branches organized by continental groups"
        icon={<Globe size={18} className="text-cyan-600" />}
      >
        <div className="space-y-4">
          <Input
            label="Section Header Title"
            value={content.offices.title}
            onChangeValue={(v) =>
              patch("offices", { ...content.offices, title: v })
            }
          />

          <div className="grid gap-6 sm:grid-cols-3 pt-2">
            {content.offices.groups.map((group, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 space-y-3"
              >
                <Input
                  label="Region Group Title"
                  value={group.title}
                  onChangeValue={(v) => {
                    const groups = [...content.offices.groups];
                    groups[i] = { ...group, title: v };
                    patch("offices", { ...content.offices, groups });
                  }}
                />
                <Textarea
                  label="Locations in this Region"
                  hint="One per line"
                  rows={5}
                  value={group.locations.join("\n")}
                  onChange={(e) => {
                    const groups = [...content.offices.groups];
                    groups[i] = {
                      ...group,
                      locations: e.target.value.split("\n").filter(Boolean),
                    };
                    patch("offices", { ...content.offices, groups });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Floating Save Action Bar */}
      <div className="sticky bottom-6 z-20 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/95 px-6 py-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600">
          {isDirty ? (
            <span className="flex items-center gap-2 text-amber-600 font-semibold">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved modifications pending
            </span>
          ) : (
            <span className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 size={16} />
              All contact settings up to date
            </span>
          )}
        </div>
        <Button
          type="submit"
          isLoading={saving}
          disabled={saving || !isDirty}
          variant="primary"
          icon={<Save size={16} />}
        >
          {saving ? "Saving Changes..." : "Save Contact Page"}
        </Button>
      </div>
    </form>
  );
}