import "server-only";

import { NextResponse, type NextRequest } from "next/server";

/**
 * Consolidates many API route handlers behind a single Next.js catch-all `route.ts`, so Vercel
 * bundles them into one Function instead of one-per-file. (Vercel's Hobby plan caps a deployment
 * at 12 Functions; this project has 50+ API routes, so each one being its own file/Function was
 * failing the build.)
 *
 * Every handler keeps its original signature and body untouched (moved, not rewritten) - this
 * file only reconstructs the `{ params }` shape each handler already expects, from the actual
 * URL segments, and picks the most specific match when two patterns could both fit (e.g.
 * "services/reorder" must win over "services/:slug" for the path /services/reorder).
 */

// A few of the original handlers have a code path that falls through without an explicit
// return (TypeScript infers `undefined` there); that was already latent in their unmodified
// code, so the dispatcher tolerates it below instead of rewriting business logic to silence it.
type AnyHandler = (request: NextRequest, context: any) => Promise<Response | undefined> | Response | undefined;

export type RouteEntry = {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  /** Segments after the dispatcher's own prefix. A leading ":" marks a dynamic capture, e.g. ["blogs", ":id"]. */
  segments: string[];
  handler: AnyHandler;
};

function specificity(entry: RouteEntry): number {
  return entry.segments.filter((segment) => !segment.startsWith(":")).length;
}

function patternMatches(entry: RouteEntry, segments: string[]): boolean {
  return entry.segments.length === segments.length && entry.segments.every((segment, i) => segment.startsWith(":") || segment === segments[i]);
}

export function createDispatcher(routes: RouteEntry[]) {
  return async function dispatch(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }): Promise<Response> {
    const { slug } = await context.params;
    const segments = slug ?? [];
    const method = request.method as RouteEntry["method"];

    const candidates = routes.filter((entry) => entry.method === method && patternMatches(entry, segments));

    if (candidates.length === 0) {
      const pathExists = routes.some((entry) => patternMatches(entry, segments));
      return NextResponse.json({ message: pathExists ? "Method not allowed." : "Not found." }, { status: pathExists ? 405 : 404 });
    }

    // Most specific (fewest dynamic segments) wins, e.g. a literal beats a ":id" at the same position.
    candidates.sort((a, b) => specificity(b) - specificity(a));
    const entry = candidates[0];

    const params: Record<string, string> = {};
    entry.segments.forEach((segment, i) => {
      if (segment.startsWith(":")) params[segment.slice(1)] = segments[i];
    });

    const result = await entry.handler(request, { params: Promise.resolve(params) });
    return result ?? NextResponse.json({ message: "No response was returned." }, { status: 500 });
  };
}
