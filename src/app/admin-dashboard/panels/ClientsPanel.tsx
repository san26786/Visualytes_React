"use client";

import React, { ChangeEvent, FormEvent, useState, useMemo } from "react";
import Image from "next/image";
import {
  Pencil,
  Trash2,
  Save,
  Upload,
  Handshake,
  Search,
  Loader2,
  ImageIcon,
} from "lucide-react";
import type { Client, ClientForm } from "../types/dashboard";
import { Panel } from "../components/UI/Panel";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { Table } from "../components/UI/Table";

interface ClientsPanelProps {
  clients: Client[];
  loading: boolean;
  createClient: (data: ClientForm) => Promise<unknown>;
  updateClient: (id: string, data: ClientForm) => Promise<unknown>;
  deleteClient: (id: string) => Promise<unknown>;
  uploadClientImage: (file: File) => Promise<string>;
}

const EMPTY_FORM: ClientForm = {
  name: "",
  image: "",
};

export default function ClientsPanel({
  clients,
  loading,
  createClient,
  updateClient,
  deleteClient,
  uploadClientImage,
}: ClientsPanelProps) {
  const [form, setForm] = useState<ClientForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const image = await uploadClientImage(file);
      setForm((prev) => ({
        ...prev,
        image,
      }));
    } finally {
      setUploading(false);
    }
    e.target.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim()) return;

    try {
      setSaving(true);
      if (editingId) {
        await updateClient(editingId, form);
      } else {
        await createClient(form);
      }
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingId(client.id);
    setForm({
      name: client.name,
      image: client.image,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client logo?"
    );
    if (!confirmed) return;

    await deleteClient(id);
    if (editingId === id) {
      resetForm();
    }
  };

  const filteredClients = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return clients;
    return clients.filter((c) => c.name.toLowerCase().includes(q));
  }, [clients, search]);

  return (
    <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
      {/* Form Card */}
      <Panel
        title={editingId ? "Edit Client Brand" : "Add Client Logo"}
        description={
          editingId
            ? "Update company name or brand logo asset"
            : "Upload client and partner logos for the trust carousel"
        }
        icon={<Handshake size={18} className="text-cyan-600" />}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Client / Company Name"
            placeholder="e.g. Acme Global Logistics"
            value={form.name}
            required
            onChangeValue={(val) =>
              setForm((prev) => ({ ...prev, name: val }))
            }
          />

          {/* Logo Upload Dropzone */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Client Logo Image (Transparent PNG / SVG recommended)
            </label>

            <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-center transition hover:border-cyan-400 hover:bg-cyan-50/20">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.svg"
                onChange={handleImageUpload}
                disabled={uploading}
                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                {uploading ? (
                  <Loader2 className="animate-spin text-cyan-600" size={24} />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-xs">
                    <Upload size={18} />
                  </div>
                )}
                <p className="text-xs font-semibold text-slate-700">
                  {uploading ? "Uploading logo..." : "Upload Client Logo"}
                </p>
                <p className="text-[11px] text-slate-400">
                  PNG, SVG, WebP up to 5MB
                </p>
              </div>
            </div>

            {form.image && (
              <div className="relative mt-2 flex h-24 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 p-3 shadow-xs">
                <Image
                  src={form.image}
                  alt={form.name || "Client logo"}
                  fill
                  className="object-contain p-2"
                />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                  className="absolute right-2 top-2 rounded-lg bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-xs hover:bg-slate-900"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={saving}
              className="flex-1"
              icon={<Save size={16} />}
            >
              {editingId ? "Update Client" : "Create Client"}
            </Button>
            {editingId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Panel>

      {/* Clients Table Card */}
      <Panel
        title="Client & Partner Brands"
        description="Companies showcased on the homepage trust marquee"
        icon={<Handshake size={18} className="text-indigo-600" />}
        badge={
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
            {clients.length} Clients
          </span>
        }
        headerAction={
          <div className="relative w-full sm:w-52">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none focus:border-cyan-500 focus:bg-white transition"
            />
          </div>
        }
      >
        <Table
          headings={["Logo Asset", "Company Name", "Status", "Actions"]}
          empty={loading ? true : filteredClients.length === 0}
          emptyMessage={loading ? "Loading clients..." : "No clients added yet."}
        >
          {filteredClients.map((client) => (
            <tr
              key={client.id}
              className="transition-colors hover:bg-slate-50/80"
            >
              <td className="px-4 py-3 first:pl-5">
                <div className="relative h-12 w-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 shadow-xs">
                  {client.image ? (
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <ImageIcon size={16} />
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 font-semibold text-slate-900">
                {client.name}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    client.isActive
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      client.isActive ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                  />
                  {client.isActive ? "Active" : "Hidden"}
                </span>
              </td>
              <td className="px-4 py-3 last:pr-5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleEdit(client)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
                    title="Edit client"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(client.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                    title="Delete client"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}