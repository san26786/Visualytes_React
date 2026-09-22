"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Circle,
  ExternalLink,
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Send,
  Undo2,
} from "lucide-react";

import { slugify } from "@/src/lib/blog/slug";
import { EMPTY_DOC, type TiptapDoc } from "@/src/lib/blog/tiptap";
import type {
  AdminBlogPost,
  BlogImageRef,
  BlogMeta,
  BlogPostInput,
  BlogStatus,
  FieldErrors,
} from "@/src/lib/blog/types";
import { LIMITS, getPublishBlockers } from "@/src/lib/blog/validation";
import { Button } from "../../components/UI/Button";
import { ConfirmDialog } from "../../components/UI/ConfirmDialog";
import { useToast } from "../../components/UI/Toast";
import { MediaPickerDialog } from "../../components/editor/MediaPickerDialog";
import RichTextEditor from "../../components/editor/RichTextEditor";
import { ApiError, blogApi } from "../_lib/api";
import { StatusBadge, effectiveStatus } from "./StatusBadge";
import { TagInput } from "./TagInput";

type Props = {
  /** null when creating a new post. */
  post: AdminBlogPost | null;
  meta: BlogMeta;
  /** Author pre-selected for a new post (matches the logged-in user's name, if any). */
  defaultAuthorId: string | null;
};

type SaveState = "idle" | "saving" | "saved" | "error";

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string | null;
  tags: string[];
  authorId: string | null;
  featuredImage: BlogImageRef | null;
  featuredImageAlt: string;
  status: BlogStatus;
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  views: number;
  likes: number;
  comments: number;
};

const BACK_HREF = "/admin-dashboard?tab=blogs";

function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function initialState(post: AdminBlogPost | null, defaultAuthorId: string | null): FormState {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    categoryId: post?.category?.id ?? null,
    tags: post?.tags.map((tag) => tag.name) ?? [],
    authorId: post ? (post.author?.id ?? null) : defaultAuthorId,
    featuredImage: post?.featuredImage ?? null,
    featuredImageAlt: post?.featuredImageAlt ?? "",
    status: post?.status ?? "DRAFT",
    publishedAt: post?.publishedAt ?? null,
    seoTitle: post?.seoTitle ?? "",
    seoDescription: post?.seoDescription ?? "",
    seoKeywords: post?.seoKeywords ?? [],
    views: post?.views ?? 0,
    likes: post?.likes ?? 0,
    comments: post?.comments ?? 0,
  };
}

export default function BlogEditorForm({ post, meta, defaultAuthorId }: Props) {
  const { showToast } = useToast();

  const [postId, setPostId] = useState<string | null>(post?.id ?? null);
  const [form, setForm] = useState<FormState>(() => initialState(post, defaultAuthorId));
  const [categories, setCategories] = useState(meta.categories);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedAt, setSavedAt] = useState<Date | null>(post ? new Date(post.updatedAt) : null);
  const [version, setVersion] = useState(0);
  const [savedVersion, setSavedVersion] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirm, setConfirm] = useState<null | "publish" | "unpublish">(null);
  const [newCategory, setNewCategory] = useState<string | null>(null);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [authors, setAuthors] = useState(meta.authors);
  const [newAuthor, setNewAuthor] = useState<string | null>(null);
  const [creatingAuthor, setCreatingAuthor] = useState(false);
  const [removingAuthor, setRemovingAuthor] = useState(false);
  const [confirmRemoveAuthor, setConfirmRemoveAuthor] = useState(false);
  const [contentVersion, setContentVersion] = useState(0);

  const contentRef = useRef<TiptapDoc>(post?.content ?? EMPTY_DOC);
  const versionRef = useRef(0);
  const savingRef = useRef(false);
  const failedVersionRef = useRef(-1);
  const slugTouchedRef = useRef(!!post);
  const formRef = useRef(form);
  const postIdRef = useRef(postId);

  useEffect(() => {
    formRef.current = form;
    postIdRef.current = postId;
  });

  const dirty = version !== savedVersion;
  const isPublished = form.status === "PUBLISHED";

  const touch = useCallback(() => {
    versionRef.current += 1;
    setVersion(versionRef.current);
  }, []);

  const setField = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => (key in prev ? { ...prev, [key]: undefined } : prev));
      touch();
    },
    [touch]
  );

  const onTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugTouchedRef.current ? prev.slug : slugify(title),
    }));
    setErrors((prev) => ({ ...prev, title: undefined, ...(slugTouchedRef.current ? {} : { slug: undefined }) }));
    touch();
  };

  const onContentChange = useCallback(
    (doc: TiptapDoc) => {
      contentRef.current = doc;
      setContentVersion((n) => n + 1);
      setErrors((prev) => (prev.content ? { ...prev, content: undefined } : prev));
      touch();
    },
    [touch]
  );

  const buildPayload = useCallback((status: BlogStatus): Partial<BlogPostInput> => {
    const f = formRef.current;
    return {
      title: f.title.trim(),
      slug: f.slug.trim(),
      excerpt: f.excerpt.trim(),
      content: contentRef.current,
      categoryId: f.categoryId,
      tags: f.tags,
      authorId: f.authorId,
      featuredImageId: f.featuredImage?.id ?? null,
      featuredImageAlt: f.featuredImageAlt.trim(),
      status,
      publishedAt: f.publishedAt,
      seoTitle: f.seoTitle.trim(),
      seoDescription: f.seoDescription.trim(),
      seoKeywords: f.seoKeywords,
      views: f.views,
      likes: f.likes,
      comments: f.comments,
    };
  }, []);

  const blockers = useMemo(
    () =>
      getPublishBlockers({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: contentRef.current,
        categoryId: form.categoryId,
        authorId: form.authorId,
        featuredImageId: form.featuredImage?.id ?? null,
      }),
    // contentVersion re-runs the check when the article body changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.title, form.slug, form.excerpt, form.categoryId, form.authorId, form.featuredImage, contentVersion]
  );
  const blockerEntries = Object.entries(blockers);

  /** Saves the post. Returns the saved post, or null on failure. */
  const save = useCallback(
    async (options: { status?: BlogStatus; silent?: boolean } = {}) => {
      if (savingRef.current) return null;
      const f = formRef.current;
      if (!f.title.trim()) {
        setErrors((prev) => ({ ...prev, title: "Title is required." }));
        if (!options.silent) showToast("Add a title before saving.", "warning");
        return null;
      }

      const status = options.status ?? f.status;
      const startedAt = versionRef.current;
      savingRef.current = true;
      setSaveState("saving");

      try {
        const id = postIdRef.current;
        const saved = id
          ? await blogApi.update(id, buildPayload(status))
          : await blogApi.create(buildPayload(status));

        if (!id) {
          setPostId(saved.id);
          postIdRef.current = saved.id;
          window.history.replaceState(null, "", `/admin-dashboard/blog/${saved.id}`);
        }

        setForm((prev) => ({
          ...prev,
          status: saved.status,
          publishedAt: saved.publishedAt,
          slug: !id || !prev.slug ? saved.slug : prev.slug,
        }));
        setErrors({});
        setSavedVersion(startedAt);
        setSavedAt(new Date(saved.updatedAt));
        setSaveState("saved");
        failedVersionRef.current = -1;

        if (!options.silent) {
          showToast(
            status === "PUBLISHED"
              ? f.status === "PUBLISHED"
                ? "Post updated."
                : "Post published."
              : status === "DRAFT" && f.status === "PUBLISHED"
                ? "Post unpublished and saved as a draft."
                : "Draft saved."
          );
        }
        return saved;
      } catch (err) {
        failedVersionRef.current = versionRef.current;
        setSaveState("error");
        if (err instanceof ApiError) {
          setErrors((prev) => ({ ...prev, ...(err.errors as FieldErrors | undefined) }));
          if (!options.silent || err.status !== 422) showToast(err.message, "error");
        } else if (!options.silent) {
          showToast("Could not reach the server. Check your connection and try again.", "error");
        }
        return null;
      } finally {
        savingRef.current = false;
      }
    },
    [buildPayload, showToast]
  );

  // Autosave drafts (never live posts - those need an explicit "Update").
  useEffect(() => {
    if (!dirty || isPublished || !form.title.trim()) return;
    if (failedVersionRef.current === versionRef.current) return;
    const timer = setTimeout(() => void save({ silent: true }), 2500);
    return () => clearTimeout(timer);
  }, [version, dirty, isPublished, form.title, save]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Ctrl/Cmd+S saves.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [save]);

  const focusFirstError = (fields: FieldErrors) => {
    const order: (keyof FieldErrors)[] = ["title", "slug", "excerpt", "content", "categoryId", "featuredImageId", "authorId"];
    const first = order.find((key) => fields[key]);
    if (first) document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const requestPublish = () => {
    if (blockerEntries.length) {
      setErrors((prev) => ({ ...prev, ...blockers }));
      showToast("Complete the required fields before publishing.", "warning");
      focusFirstError(blockers);
      return;
    }
    setConfirm("publish");
  };

  const runConfirmed = async () => {
    const action = confirm;
    setConfirm(null);
    if (action === "publish") await save({ status: "PUBLISHED" });
    if (action === "unpublish") await save({ status: "DRAFT" });
  };

  const openPreview = async () => {
    if (!form.title.trim()) {
      showToast("Add a title to preview this post.", "warning");
      return;
    }
    const tab = window.open("", "_blank");
    let id = postIdRef.current;
    if (!id || dirty) {
      const saved = await save({ silent: true });
      id = saved?.id ?? null;
    }
    if (!id) {
      tab?.close();
      showToast("Could not save the post for preview.", "error");
      return;
    }
    const url = `/admin-dashboard/blog/${id}/preview`;
    if (tab) tab.location.href = url;
    else window.open(url, "_blank");
  };

  const pickFeatured = (media: { id: string; url: string; width: number | null; height: number | null; alt: string | null }, alt: string) => {
    setForm((prev) => ({
      ...prev,
      featuredImage: { id: media.id, url: media.url, width: media.width, height: media.height },
      featuredImageAlt: alt || prev.featuredImageAlt || media.alt || "",
    }));
    setErrors((prev) => ({ ...prev, featuredImageId: undefined }));
    touch();
    setPickerOpen(false);
  };

  const addCategory = async () => {
    const name = (newCategory ?? "").trim();
    if (name.length < 2) return;
    setCreatingCategory(true);
    try {
      const category = await blogApi.createCategory(name);
      setCategories((prev) =>
        prev.some((c) => c.id === category.id)
          ? prev
          : [...prev, { ...category, postCount: 0 }].sort((a, b) => a.name.localeCompare(b.name))
      );
      setField("categoryId", category.id);
      setNewCategory(null);
      showToast(`Category "${category.name}" ready.`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not create category.", "error");
    } finally {
      setCreatingCategory(false);
    }
  };

  const addAuthor = async () => {
    const name = (newAuthor ?? "").trim();
    if (name.length < 2) return;
    setCreatingAuthor(true);
    try {
      const author = await blogApi.createAuthor(name);
      setAuthors((prev) =>
        prev.some((a) => a.id === author.id)
          ? prev
          : [...prev, { ...author, postCount: 0 }].sort((a, b) => a.name.localeCompare(b.name))
      );
      setField("authorId", author.id);
      setNewAuthor(null);
      showToast(`Author "${author.name}" added.`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not add author.", "error");
    } finally {
      setCreatingAuthor(false);
    }
  };

  const selectedAuthor = authors.find((a) => a.id === form.authorId) ?? null;

  const removeSelectedAuthor = async () => {
    if (!selectedAuthor) return;
    setRemovingAuthor(true);
    try {
      await blogApi.removeAuthor(selectedAuthor.id);
      setAuthors((prev) => prev.filter((a) => a.id !== selectedAuthor.id));
      setField("authorId", null);
      showToast(`Author "${selectedAuthor.name}" removed.`);
      setConfirmRemoveAuthor(false);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not remove author.", "error");
      setConfirmRemoveAuthor(false);
    } finally {
      setRemovingAuthor(false);
    }
  };

  const scheduled = effectiveStatus(form.status, form.publishedAt) === "SCHEDULED";
  const seoTitleShown = form.seoTitle || form.title || "Untitled post";
  const seoDescriptionShown = form.seoDescription || form.excerpt || "Add an excerpt or SEO description to control this snippet.";
  const publicUrl = form.slug ? `/blog/${form.slug}` : null;

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={BACK_HREF}
              onClick={(event) => {
                if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) event.preventDefault();
              }}
              className="flex h-9 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft size={14} /> <span className="hidden sm:inline">Blog Posts</span>
            </Link>
            <div className="hidden min-w-0 sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Content Management · Blog Editor</p>
              <div className="flex items-center gap-2.5">
                <h1 className="truncate text-sm font-bold text-slate-900">{postId ? "Edit blog post" : "New blog post"}</h1>
                <StatusBadge status={form.status} publishedAt={form.publishedAt} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <SaveIndicator state={saveState} dirty={dirty} savedAt={savedAt} isPublished={isPublished} hasId={!!postId} onRetry={() => void save()} />

            <Button variant="outline" size="sm" icon={<ExternalLink size={14} />} onClick={() => void openPreview()}>
              <span className="hidden md:inline">Preview</span>
            </Button>

            {isPublished ? (
              <>
                <Button variant="outline" size="sm" icon={<Undo2 size={14} />} onClick={() => setConfirm("unpublish")} disabled={saveState === "saving"}>
                  <span className="hidden md:inline">Unpublish</span>
                </Button>
                <Button
                  variant="cyan"
                  size="sm"
                  icon={<Save size={14} />}
                  isLoading={saveState === "saving"}
                  disabled={!dirty}
                  onClick={() => void save()}
                >
                  Update
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Save size={14} />}
                  isLoading={saveState === "saving"}
                  onClick={() => void save()}
                >
                  <span className="hidden sm:inline">Save Draft</span>
                </Button>
                <Button variant="cyan" size="sm" icon={<Send size={14} />} disabled={saveState === "saving"} onClick={requestPublish}>
                  Publish
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main column */}
        <main className="min-w-0 space-y-5">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <label htmlFor="field-title" className="sr-only">
              Title
            </label>
            <input
              id="field-title"
              value={form.title}
              onChange={(event) => onTitleChange(event.target.value)}
              maxLength={LIMITS.titleMax}
              placeholder="Article title"
              aria-invalid={!!errors.title}
              className="w-full border-0 bg-transparent p-0 text-2xl font-bold tracking-tight text-slate-900 outline-none placeholder:text-slate-300 sm:text-3xl"
            />
            {errors.title && <p className="mt-1.5 text-xs text-rose-500">{errors.title}</p>}

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-400">Permalink</span>
              <div
                id="field-slug"
                className={`flex min-w-[240px] flex-1 items-center overflow-hidden rounded-lg border bg-slate-50 text-slate-600 transition focus-within:border-cyan-500 focus-within:bg-white ${
                  errors.slug ? "border-rose-300" : "border-slate-200"
                }`}
              >
                <span className="select-none pl-3 text-slate-400">/blog/</span>
                <input
                  value={form.slug}
                  onChange={(event) => {
                    slugTouchedRef.current = true;
                    setField("slug", event.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  onBlur={() => {
                    const clean = slugify(form.slug);
                    if (form.slug && clean !== form.slug) setField("slug", clean);
                  }}
                  placeholder="auto-generated-from-title"
                  aria-label="Slug"
                  className="h-8 flex-1 bg-transparent px-1 text-xs font-medium outline-none"
                />
              </div>
              {slugTouchedRef.current && form.title && (
                <button
                  type="button"
                  onClick={() => {
                    slugTouchedRef.current = false;
                    setField("slug", slugify(form.title));
                  }}
                  className="rounded-lg px-2 py-1 font-semibold text-cyan-700 transition hover:bg-cyan-50"
                >
                  Regenerate
                </button>
              )}
              {publicUrl && isPublished && !scheduled && (
                <a href={publicUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-semibold text-slate-500 transition hover:bg-slate-100">
                  View live <ExternalLink size={11} />
                </a>
              )}
            </div>
            {errors.slug && <p className="mt-1.5 text-xs text-rose-500">{errors.slug}</p>}
          </div>

          <div id="field-excerpt" className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="excerpt">Excerpt</label>
              <Counter value={form.excerpt.length} recommended={200} max={LIMITS.excerptMax} />
            </div>
            <textarea
              id="excerpt"
              rows={3}
              value={form.excerpt}
              maxLength={LIMITS.excerptMax}
              onChange={(event) => setField("excerpt", event.target.value)}
              placeholder="A short summary shown on blog cards, article headers and search results."
              className={`w-full resize-y rounded-xl border bg-white p-3.5 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15 ${
                errors.excerpt ? "border-rose-300" : "border-slate-200"
              }`}
            />
            {errors.excerpt && <p className="mt-1.5 text-xs text-rose-500">{errors.excerpt}</p>}
          </div>

          <div id="field-content">
            <RichTextEditor initialContent={contentRef.current} onChange={onContentChange} error={errors.content} />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
          <Card title="Publish">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <StatusBadge status={form.status} publishedAt={form.publishedAt} />
              </div>

              <Field label="Publish date" hint={scheduled ? "Scheduled" : form.publishedAt ? undefined : "Defaults to now"}>
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    value={toLocalInput(form.publishedAt)}
                    onChange={(event) => setField("publishedAt", event.target.value ? new Date(event.target.value).toISOString() : null)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15"
                  />
                  {form.publishedAt && (
                    <button
                      type="button"
                      onClick={() => setField("publishedAt", null)}
                      className="shrink-0 rounded-xl border border-slate-200 px-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </Field>
              {scheduled && <p className="-mt-2 text-xs text-sky-600">This post goes live automatically on the date above.</p>}

              {!isPublished && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                  <p className="mb-2 text-xs font-semibold text-slate-700">
                    {blockerEntries.length ? `${blockerEntries.length} required item${blockerEntries.length === 1 ? "" : "s"} left to publish` : "Ready to publish"}
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {CHECKLIST.map(({ key, label }) => {
                      const ok = !blockers[key];
                      return (
                        <li key={key} className={`flex items-center gap-2 ${ok ? "text-emerald-700" : "text-slate-500"}`}>
                          {ok ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                          {label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          <Card title="Organisation">
            <div className="space-y-4">
              <Field label="Category" error={errors.categoryId} id="field-categoryId">
                <select
                  value={form.categoryId ?? ""}
                  onChange={(event) => setField("categoryId", event.target.value || null)}
                  className={SELECT_CLASS}
                >
                  <option value="">Select a category…</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {newCategory === null ? (
                  <button type="button" onClick={() => setNewCategory("")} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:underline">
                    <Plus size={12} /> New category
                  </button>
                ) : (
                  <div className="mt-2 flex gap-2">
                    <input
                      autoFocus
                      value={newCategory}
                      maxLength={80}
                      onChange={(event) => setNewCategory(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          void addCategory();
                        }
                        if (event.key === "Escape") setNewCategory(null);
                      }}
                      placeholder="Category name"
                      className="h-9 min-w-0 flex-1 rounded-lg border border-slate-200 px-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
                    />
                    <Button size="sm" variant="cyan" isLoading={creatingCategory} onClick={() => void addCategory()}>
                      Add
                    </Button>
                  </div>
                )}
              </Field>

              <TagInput
                label="Tags"
                values={form.tags}
                onChange={(tags) => setField("tags", tags)}
                suggestions={meta.tags.map((tag) => tag.name)}
                placeholder="Add tags…"
                max={LIMITS.tags}
                maxLength={LIMITS.tagMax}
                error={errors.tags}
              />

              <Field label="Author" error={errors.authorId} id="field-authorId">
                <select
                  value={form.authorId ?? ""}
                  onChange={(event) => setField("authorId", event.target.value || null)}
                  className={SELECT_CLASS}
                >
                  <option value="">Select an author…</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
                {newAuthor === null ? (
                  <div className="mt-2 flex items-center justify-between">
                    <button type="button" onClick={() => setNewAuthor("")} className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:underline">
                      <Plus size={12} /> New author
                    </button>
                    {selectedAuthor && (
                      <button type="button" onClick={() => setConfirmRemoveAuthor(true)} className="text-xs font-semibold text-rose-600 hover:underline">
                        Remove this author
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-2 flex gap-2">
                    <input
                      autoFocus
                      value={newAuthor}
                      maxLength={80}
                      onChange={(event) => setNewAuthor(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          void addAuthor();
                        }
                        if (event.key === "Escape") setNewAuthor(null);
                      }}
                      placeholder="Author name"
                      className="h-9 min-w-0 flex-1 rounded-lg border border-slate-200 px-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15"
                    />
                    <Button size="sm" variant="cyan" isLoading={creatingAuthor} onClick={() => void addAuthor()}>
                      Add
                    </Button>
                  </div>
                )}
              </Field>
            </div>
          </Card>

          <Card title="Featured image">
            <div id="field-featuredImageId" className="space-y-3">
              {form.featuredImage ? (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  { }
                  <img src={form.featuredImage.url} alt={form.featuredImageAlt || "Featured image"} className="aspect-[16/9] w-full object-cover" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className={`flex aspect-[16/9] w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed text-slate-400 transition hover:border-cyan-400 hover:bg-cyan-50/30 hover:text-cyan-700 ${
                    errors.featuredImageId ? "border-rose-300" : "border-slate-200"
                  }`}
                >
                  <ImageIcon size={22} />
                  <span className="text-xs font-semibold">Choose or upload image</span>
                  <span className="text-[11px]">Recommended 1200×630</span>
                </button>
              )}
              {form.featuredImage && (
                <>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setPickerOpen(true)}>
                      Change
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setField("featuredImage", null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                  <Field label="Alt text" hint={`${form.featuredImageAlt.length}/${LIMITS.altMax}`}>
                    <input
                      value={form.featuredImageAlt}
                      maxLength={LIMITS.altMax}
                      onChange={(event) => setField("featuredImageAlt", event.target.value)}
                      placeholder="Describe the image"
                      className={INPUT_CLASS}
                    />
                  </Field>
                </>
              )}
              {errors.featuredImageId && <p className="text-xs text-rose-500">{errors.featuredImageId}</p>}
            </div>
          </Card>

          <Card title="Engagement">
            <div className="grid grid-cols-3 gap-3">
              {(["views", "likes", "comments"] as const).map((key) => (
                <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} error={errors[key]}>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={form[key]}
                    onChange={(event) => setField(key, Math.max(0, Math.floor(Number(event.target.value) || 0)))}
                    className={INPUT_CLASS}
                  />
                </Field>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              Views are counted automatically on the public page. Edit them here to correct or seed a number.
            </p>
          </Card>

          <Card title="SEO">
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[11px] text-slate-400">visualytes.com › blog › {form.slug || "…"}</p>
                <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-[#1a0dab]">{seoTitleShown}</p>
                <p className="mt-0.5 line-clamp-3 text-xs leading-relaxed text-slate-500">{seoDescriptionShown}</p>
              </div>

              <Field label="SEO title" error={errors.seoTitle} hint={<Counter value={form.seoTitle.length} recommended={60} max={LIMITS.seoTitleMax} />}>
                <input
                  value={form.seoTitle}
                  maxLength={LIMITS.seoTitleMax}
                  onChange={(event) => setField("seoTitle", event.target.value)}
                  placeholder={form.title || "Defaults to the post title"}
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="SEO description" error={errors.seoDescription} hint={<Counter value={form.seoDescription.length} recommended={160} max={LIMITS.seoDescriptionMax} />}>
                <textarea
                  rows={3}
                  value={form.seoDescription}
                  maxLength={LIMITS.seoDescriptionMax}
                  onChange={(event) => setField("seoDescription", event.target.value)}
                  placeholder="Defaults to the excerpt"
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15"
                />
              </Field>

              <TagInput
                label="SEO keywords"
                values={form.seoKeywords}
                onChange={(keywords) => setField("seoKeywords", keywords)}
                placeholder="Add keywords…"
                max={LIMITS.keywords}
                maxLength={LIMITS.keywordMax}
                error={errors.seoKeywords}
              />
            </div>
          </Card>
        </aside>
      </div>

      <MediaPickerDialog
        open={pickerOpen}
        askAlt
        title="Featured image"
        confirmLabel="Use as featured image"
        onClose={() => setPickerOpen(false)}
        onPick={pickFeatured}
      />

      <ConfirmDialog
        open={confirmRemoveAuthor}
        title="Remove this author?"
        description={
          <>
            <strong className="text-slate-700">{selectedAuthor?.name}</strong> will be deleted from the author list. This only works if no
            post uses it.
          </>
        }
        confirmLabel="Remove author"
        loading={removingAuthor}
        onConfirm={() => void removeSelectedAuthor()}
        onCancel={() => setConfirmRemoveAuthor(false)}
      />
      <ConfirmDialog
        open={confirm === "publish"}
        tone="primary"
        title={scheduled ? "Schedule this post?" : "Publish this post?"}
        description={
          scheduled ? (
            <>It will go live automatically at the chosen date on <strong className="text-slate-700">/blog/{form.slug}</strong>.</>
          ) : (
            <>It will be visible to everyone at <strong className="text-slate-700">/blog/{form.slug}</strong> straight away.</>
          )
        }
        confirmLabel={scheduled ? "Schedule" : "Publish"}
        onConfirm={() => void runConfirmed()}
        onCancel={() => setConfirm(null)}
      />
      <ConfirmDialog
        open={confirm === "unpublish"}
        tone="primary"
        title="Unpublish this post?"
        description="It will be removed from the public site and saved as a draft. You can publish it again at any time."
        confirmLabel="Unpublish"
        onConfirm={() => void runConfirmed()}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}

const CHECKLIST: { key: keyof FieldErrors; label: string }[] = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "excerpt", label: "Excerpt" },
  { key: "content", label: `Article content (${LIMITS.minWords}+ words)` },
  { key: "categoryId", label: "Category" },
  { key: "featuredImageId", label: "Featured image" },
  { key: "authorId", label: "Author" },
];

const INPUT_CLASS =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15";
const SELECT_CLASS = INPUT_CLASS;

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  id,
  children,
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span>{label}</span>
        {hint && <span className="text-[11px] font-normal text-slate-400">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}

function Counter({ value, recommended, max }: { value: number; recommended: number; max: number }) {
  const tone = value >= max ? "text-rose-500" : value > recommended ? "text-amber-600" : "text-slate-400";
  return (
    <span className={`font-normal ${tone}`}>
      {value}/{recommended} <span className="text-slate-300">(max {max})</span>
    </span>
  );
}

function SaveIndicator({
  state,
  dirty,
  savedAt,
  isPublished,
  hasId,
  onRetry,
}: {
  state: SaveState;
  dirty: boolean;
  savedAt: Date | null;
  isPublished: boolean;
  hasId: boolean;
  onRetry: () => void;
}) {
  const base = "hidden items-center gap-1.5 text-xs font-medium lg:inline-flex";
  if (state === "saving") {
    return (
      <span className={`${base} text-slate-500`}>
        <Loader2 size={13} className="animate-spin" /> Saving…
      </span>
    );
  }
  if (state === "error" && dirty) {
    return (
      <button type="button" onClick={onRetry} className={`${base} text-rose-600 hover:underline`}>
        <AlertCircle size={13} /> Save failed · Retry
      </button>
    );
  }
  if (dirty) {
    return (
      <span className={`${base} text-amber-600`}>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        {isPublished ? "Unsaved changes" : hasId ? "Unsaved · autosaving…" : "Autosaves once titled"}
      </span>
    );
  }
  if (savedAt) {
    return (
      <span className={`${base} text-emerald-600`}>
        <Check size={13} /> Saved {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    );
  }
  return null;
}
