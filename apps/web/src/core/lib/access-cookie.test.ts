import { afterEach, describe, expect, it } from "vitest";
import { createAccessToken } from "./access-cookie";

const originalNodeEnv = process.env.NODE_ENV;
const originalAccessTokenVersion = process.env.ACCESS_TOKEN_VERSION;
const originalSitePassword = process.env.SITE_PASSWORD;

afterEach(() => {
  Object.defineProperty(process.env, "NODE_ENV", { value: originalNodeEnv, configurable: true });
  if (originalAccessTokenVersion === undefined) {
    delete process.env.ACCESS_TOKEN_VERSION;
  } else {
    process.env.ACCESS_TOKEN_VERSION = originalAccessTokenVersion;
  }
  if (originalSitePassword === undefined) {
    delete process.env.SITE_PASSWORD;
  } else {
    process.env.SITE_PASSWORD = originalSitePassword;
  }
});

describe("createAccessToken", () => {
  it("throws in production when ACCESS_TOKEN_VERSION is unset", () => {
    Object.defineProperty(process.env, "NODE_ENV", { value: "production", configurable: true });
    process.env.SITE_PASSWORD = "test-secret";
    delete process.env.ACCESS_TOKEN_VERSION;

    expect(() => createAccessToken()).toThrow("ACCESS_TOKEN_VERSION must be set in production");
  });
});
