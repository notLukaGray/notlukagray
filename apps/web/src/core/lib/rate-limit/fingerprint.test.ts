import { afterEach, describe, expect, it, vi } from "vitest";
import { buildFingerprint } from "./fingerprint";

const originalNodeEnv = process.env.NODE_ENV;
const originalRateLimitSecret = process.env.RATE_LIMIT_SECRET;

afterEach(() => {
  Object.defineProperty(process.env, "NODE_ENV", { value: originalNodeEnv, configurable: true });
  if (originalRateLimitSecret === undefined) {
    delete process.env.RATE_LIMIT_SECRET;
  } else {
    process.env.RATE_LIMIT_SECRET = originalRateLimitSecret;
  }
  vi.restoreAllMocks();
});

describe("buildFingerprint", () => {
  it("throws in production when RATE_LIMIT_SECRET is unset", () => {
    Object.defineProperty(process.env, "NODE_ENV", { value: "production", configurable: true });
    delete process.env.RATE_LIMIT_SECRET;

    expect(() => buildFingerprint({ headers: new Headers() }, "unlock")).toThrow(
      "RATE_LIMIT_SECRET must be set in production"
    );
  });
});
