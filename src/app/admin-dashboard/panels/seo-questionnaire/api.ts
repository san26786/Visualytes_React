/** Small JSON fetch helper for the SEO questionnaire admin panel (throws with the server's message). */
export async function api<T = unknown>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }
  if (!response.ok) {
    throw new Error((data as { message?: string } | null)?.message || `Request failed with status ${response.status}.`);
  }
  return data as T;
}
