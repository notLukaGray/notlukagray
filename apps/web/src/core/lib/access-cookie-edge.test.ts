import { afterEach, describe, expect, it } from "vitest";
import { createAccessTokenEdge } from "./access-cookie-edge";

const originalNodeEnv = process.env.NODE_ENV;
const originalAccessTokenVersion = process.env.ACCESS_TOKEN_VERSION;

afterEach(() => {
  process.env["NODE_ENV"] = originalNodeEnv;
  if (originalAccessTokenVersion === undefined) {
    delete process.env.ACCESS_TOKEN_VERSION;
  } else {
    process.env.ACCESS_TOKEN_VERSION = originalAccessTokenVersion;
  }
});

describe("createAccessTokenEdge", () => {
  it("throws in production when ACCESS_TOKEN_VERSION is unset", async () => {
    process.env["NODE_ENV"] = "production";
    delete process.env.ACCESS_TOKEN_VERSION;

    await expect(createAccessTokenEdge("test-secret")).rejects.toThrow(
      "ACCESS_TOKEN_VERSION must be set in production"
    );
  });
});
