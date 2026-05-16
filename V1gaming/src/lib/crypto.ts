/**
 * AES-256-GCM Encryption Utility — V1 Gaming
 *
 * Server-side  → Node crypto (API route)
 * Client-side  → Browser SubtleCrypto (Reservation component)
 *
 * Both use the SAME key derivation: SHA-256 of the shared secret.
 * Secret is stored in:
 *   Server  → ENCRYPTION_SECRET              (.env.local, never sent to browser)
 *   Client  → NEXT_PUBLIC_ENCRYPTION_SECRET  (.env.local, exposed at build time)
 * Both variables must have the SAME value.
 *
 * Wire format (base64 encoded):
 *   [0..11]  → IV  (12 bytes, random)
 *   [12..27] → GCM Auth Tag (16 bytes)
 *   [28..]   → Ciphertext
 */

// ─── SERVER-SIDE (Node.js) ───────────────────────────────────────────────────

function getServerKey(): Buffer {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createHash } = require("crypto") as typeof import("crypto");
  const secret = process.env.ENCRYPTION_SECRET ?? "v1gaming-fallback-secret-32bytes!";
  return createHash("sha256").update(secret).digest();
}

/** Encrypt any JSON-serialisable value on the SERVER. */
export function encrypt(data: unknown): string {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { randomBytes, createCipheriv } = require("crypto") as typeof import("crypto");
  const iv     = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getServerKey(), iv);
  const ct     = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);
  const tag    = cipher.getAuthTag(); // 16 bytes
  return Buffer.concat([iv, tag, ct]).toString("base64");
}

/** Decrypt a payload produced by `encrypt()` on the SERVER. */
export function decrypt<T = unknown>(payload: string): T {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createDecipheriv } = require("crypto") as typeof import("crypto");
  const buf = Buffer.from(payload, "base64");
  const iv  = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const ct  = buf.subarray(28);
  const dec = createDecipheriv("aes-256-gcm", getServerKey(), iv);
  dec.setAuthTag(tag);
  return JSON.parse(Buffer.concat([dec.update(ct), dec.final()]).toString("utf8")) as T;
}

// ─── CLIENT-SIDE (Browser SubtleCrypto) ──────────────────────────────────────

async function getClientKey(usage: KeyUsage[]): Promise<CryptoKey> {
  const secret = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET ?? "v1gaming-fallback-secret-32bytes!";
  const raw    = new TextEncoder().encode(secret);
  // SHA-256 hash → 32-byte AES key (mirrors Node's createHash("sha256").digest())
  const hashBuf = await crypto.subtle.digest("SHA-256", raw);
  return crypto.subtle.importKey("raw", hashBuf, { name: "AES-GCM" }, false, usage);
}

/**
 * Encrypt any JSON-serialisable value in the BROWSER.
 * Used to encrypt the POST request body before sending to the API.
 */
export async function encryptClient(data: unknown): Promise<string> {
  const key = await getClientKey(["encrypt"]);
  const iv  = crypto.getRandomValues(new Uint8Array(12));
  const plain = new TextEncoder().encode(JSON.stringify(data));

  // SubtleCrypto returns ciphertext + 16-byte tag concatenated
  const combined = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain));

  const ct  = combined.slice(0, combined.length - 16);
  const tag = combined.slice(combined.length - 16);

  // Pack: iv(12) | tag(16) | ciphertext
  const out = new Uint8Array(12 + 16 + ct.length);
  out.set(iv,  0);
  out.set(tag, 12);
  out.set(ct,  28);

  return btoa(String.fromCharCode(...out));
}

/**
 * Decrypt a payload produced by `encrypt()` (server) or `encryptClient()` (browser).
 * Used to decrypt the API response in the BROWSER.
 */
export async function decryptClient<T = unknown>(payload: string): Promise<T> {
  const key = await getClientKey(["decrypt"]);
  const buf = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
  const iv  = buf.slice(0, 12);
  const tag = buf.slice(12, 28);
  const ct  = buf.slice(28);

  // SubtleCrypto expects ciphertext + tag concatenated
  const combined = new Uint8Array(ct.length + tag.length);
  combined.set(ct);
  combined.set(tag, ct.length);

  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, combined);
  return JSON.parse(new TextDecoder().decode(plain)) as T;
}
