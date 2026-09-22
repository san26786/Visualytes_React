import type {
  AdminBlogList,
  AdminBlogPost,
  BlogMeta,
  BlogPostInput,
  MediaItem,
} from "@/src/lib/blog/types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string>
  ) {
    super(message);
  }
}

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  const isForm = init?.body instanceof FormData;
  const res = await fetch(url, {
    ...init,
    headers: isForm ? init?.headers : { "Content-Type": "application/json", ...init?.headers },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(data?.message ?? data?.error ?? "Something went wrong.", res.status, data?.errors);
  }
  return data as T;
}

const json = (body: unknown) => JSON.stringify(body);

export type ListParams = {
  search?: string;
  category?: string;
  status?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
};

export const blogApi = {
  list(params: ListParams) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") query.set(key, String(value));
    }
    return call<AdminBlogList>(`/api/admin/blogs?${query}`);
  },
  get: (id: string) => call<{ post: AdminBlogPost }>(`/api/admin/blogs/${id}`).then((r) => r.post),
  create: (input: Partial<BlogPostInput>) =>
    call<{ post: AdminBlogPost }>("/api/admin/blogs", { method: "POST", body: json(input) }).then((r) => r.post),
  update: (id: string, input: Partial<BlogPostInput>) =>
    call<{ post: AdminBlogPost }>(`/api/admin/blogs/${id}`, { method: "PATCH", body: json(input) }).then((r) => r.post),
  remove: (id: string) => call<{ success: true }>(`/api/admin/blogs/${id}`, { method: "DELETE" }),
  duplicate: (id: string) =>
    call<{ post: AdminBlogPost }>(`/api/admin/blogs/${id}/duplicate`, { method: "POST" }).then((r) => r.post),
  meta: () => call<BlogMeta>("/api/admin/blog-meta"),
  createCategory: (name: string) =>
    call<{ category: { id: string; name: string; slug: string } }>("/api/admin/categories", {
      method: "POST",
      body: json({ name }),
    }).then((r) => r.category),

  createAuthor: (name: string) =>
    call<{ author: { id: string; name: string } }>("/api/admin/authors", { method: "POST", body: json({ name }) }).then(
      (r) => r.author
    ),
  removeAuthor: (id: string) => call<{ success: true }>(`/api/admin/authors/${id}`, { method: "DELETE" }),

  upload(file: File) {
    const form = new FormData();
    form.append("file", file);
    return call<{ media: MediaItem }>("/api/admin/upload-blog", { method: "POST", body: form }).then((r) => r.media);
  },
  listMedia: (page: number, search = "") =>
    call<{ items: MediaItem[]; total: number; page: number; totalPages: number }>(
      `/api/admin/media?${new URLSearchParams({ page: String(page), ...(search ? { search } : {}) })}`
    ),
  removeMedia: (id: string) => call<{ success: true }>(`/api/admin/media/${id}`, { method: "DELETE" }),
};
