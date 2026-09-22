"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { Panel } from "../components/UI/Panel";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { Table } from "../components/UI/Table";
import { User } from "../types/dashboard";
import {
  UserPlus,
  UserCheck,
  Search,
  Pencil,
  Trash2,
  Users as UsersIcon,
  Shield,
  Mail,
  Lock,
  User as UserIcon,
} from "lucide-react";

export interface UsersPanelProps {
  users: User[];
  form: { name: string; email: string; password?: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; password: string }>
  >;
  editing: User | null;
  setEditing: (user: User | null) => void;
  save: (e: FormEvent) => void;
  remove: (id: number) => void;
  blankUser: { name: string; email: string; password: string };
}

export function UsersPanel({
  users,
  form,
  setForm,
  editing,
  setEditing,
  save,
  remove,
  blankUser,
}: UsersPanelProps) {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  return (
    <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
      {/* User Form Card */}
      <Panel
        title={editing ? "Edit User Account" : "Create New User"}
        description={
          editing
            ? "Update administrator credentials and details"
            : "Add a new administrator to the dashboard"
        }
        icon={
          editing ? (
            <UserCheck size={18} className="text-cyan-600" />
          ) : (
            <UserPlus size={18} className="text-indigo-600" />
          )
        }
      >
        <form onSubmit={save} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Sarah Connor"
            icon={<UserIcon size={16} />}
            value={form.name}
            required
            onChangeValue={(val) =>
              setForm((prev) => ({ ...prev, name: val }))
            }
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="admin@visualytes.com"
            icon={<Mail size={16} />}
            value={form.email}
            required
            onChangeValue={(val) =>
              setForm((prev) => ({ ...prev, email: val }))
            }
          />

          <Input
            label={editing ? "New Password" : "Password"}
            hint={editing ? "Leave blank to keep unchanged" : undefined}
            type="password"
            placeholder={editing ? "•••••••• (optional)" : "••••••••"}
            icon={<Lock size={16} />}
            value={form.password ?? ""}
            required={!editing}
            onChangeValue={(val) =>
              setForm((prev) => ({ ...prev, password: val }))
            }
          />

          <div className="flex items-center gap-2.5 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              {editing ? "Update User" : "Create User"}
            </Button>
            {editing && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditing(null);
                  setForm(blankUser);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Panel>

      {/* Users Table Card */}
      <Panel
        title="Admin User Accounts"
        description="List of administrators with dashboard access privileges"
        icon={<UsersIcon size={18} className="text-cyan-600" />}
        badge={
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
            {users.length} Total
          </span>
        }
        headerAction={
          <div className="relative w-full sm:w-56">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-xs outline-none focus:border-cyan-500 focus:bg-white transition"
            />
          </div>
        }
      >
        <Table
          headings={["User", "Email", "Role", "Joined Date", "Actions"]}
          empty={filteredUsers.length === 0}
          emptyMessage="No users matching your search."
        >
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className="transition-colors hover:bg-slate-50/80"
            >
              <td className="px-4 py-3.5 first:pl-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 text-xs font-bold text-cyan-800 border border-cyan-500/20">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 leading-tight">
                      {user.name}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5 text-xs text-slate-600 font-mono">
                {user.email}
              </td>
              <td className="px-4 py-3.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
                  <Shield size={11} className="text-cyan-600" />
                  Admin
                </span>
              </td>
              <td className="px-4 py-3.5 text-xs text-slate-400">
                {new Date(user.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-3.5 last:pr-5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(user);
                      setForm({
                        name: user.name,
                        email: user.email,
                        password: "",
                      });
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 transition cursor-pointer"
                    title="Edit user"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(user.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                    title="Delete user"
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