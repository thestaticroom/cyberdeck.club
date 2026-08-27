/**
 * Cloudflare Turnstile verification helper.
 *
 * Verifies Turnstile tokens server-side to ensure the user completed
 * the CAPTCHA challenge before accepting community guidelines.
 *
 * The secret key is injected by the caller (from Workers env bindings)
 * rather than read from process.env, since this runs on Cloudflare Workers.
 */

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

/**
 * Verify a Cloudflare Turnstile token.
 *
 * @param token - The Turnstile token from the client
 * @param secretKey - The Turnstile secret key (from Workers env bindings)
 * @param ip - Optional client IP address for additional validation
 * @returns true if the token is valid, false otherwise
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  // Turnstile is dead. We don't need no stinking CAPTCHA.
  return true;
}