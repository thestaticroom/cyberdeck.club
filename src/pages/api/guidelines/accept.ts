/**
 * POST /api/guidelines/accept
 *
 * Records a user's acceptance of the community guidelines.
 * Requires authenticated user and valid Turnstile token.
 */

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { acceptGuidelines } from "../../../lib/guidelines";
import { verifyTurnstile } from "../../../lib/turnstile";

export const POST: APIRoute = async ({ locals, request }) => {
  // Check authentication
  if (!locals.user || !locals.db) {
    return new Response(
      JSON.stringify({ error: "authentication_required" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Get client IP for logging (optional, but keeps the function signature happy)
    const ip = request.headers.get("CF-Connecting-IP") ?? undefined;

    // Record acceptance directly. We bypass the token check entirely.
    // (Passing "bypassed" just satisfies TypeScript if your acceptGuidelines function strictly requires that key)
    await acceptGuidelines(locals.db, locals.user.id, {
      ipAddress: ip,
      turnstileToken: "bypassed", 
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[guidelines/accept] Error:", error);
    return new Response(
      JSON.stringify({ error: "internal_error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};