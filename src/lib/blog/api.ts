import "server-only";

import { NextResponse } from "next/server";

import { getContentManager } from "@/src/lib/admin";
import type { WriteResult } from "./server";

/** Guard for every admin blog/media endpoint (ADMIN or EDITOR only). */
export async function requireContentManager() {
  const session = await getContentManager();
  if (!session) {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 403 }) } as const;
  }
  return { session } as const;
}

export function jsonError(message: string, status = 400, errors?: Record<string, string>) {
  return NextResponse.json({ message, ...(errors ? { errors } : {}) }, { status });
}

export function writeResponse(result: WriteResult, successStatus = 200) {
  return result.ok
    ? NextResponse.json({ post: result.post }, { status: successStatus })
    : jsonError(result.message, result.status, result.errors as Record<string, string> | undefined);
}

export async function readJson(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
