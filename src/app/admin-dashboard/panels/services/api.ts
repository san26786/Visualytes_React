import { upload } from "@vercel/blob/client";

export async function call<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: init?.body instanceof FormData ? init.headers : { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => null)) as { message?: string } | null;
  if (!response.ok) throw new Error(payload?.message || "Request failed. Please try again.");
  return payload as T;
}

let driverPromise: Promise<"local" | "blob"> | null = null;

/** "local" = post to our route (writes public/uploads); "blob" = go straight to Vercel Blob. */
function uploadDriver() {
  driverPromise ??= call<{ driver: "local" | "blob" }>("/api/admin/upload-service")
    .then((result) => result.driver)
    .catch(() => {
      driverPromise = null;
      return "local" as const;
    });
  return driverPromise;
}

/** Uploads a service image/video and resolves with its public URL. */
export async function uploadServiceFile(file: File): Promise<string> {
  if ((await uploadDriver()) === "blob") {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
    const blob = await upload(`uploads/services/${safeName}`, file, {
      access: "public",
      handleUploadUrl: "/api/admin/upload-service/client",
    });
    return blob.url;
  }

  const form = new FormData();
  form.append("file", file);
  const result = await call<{ url: string }>("/api/admin/upload-service", { method: "POST", body: form });
  return result.url;
}
