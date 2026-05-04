import { describe, expect, it } from "vitest";
import { parseFormBody } from "./parse-form-body";

describe("parseFormBody", () => {
  it("returns 413 when body exceeds limit despite lying content-length", async () => {
    const oversizedValue = "x".repeat(200 * 1024);
    const bodyText = JSON.stringify({ message: oversizedValue });
    const request = {
      headers: new Headers({ "content-length": "100" }),
      body: new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(bodyText));
          controller.close();
        },
      }),
    };

    const result = await parseFormBody(request as Parameters<typeof parseFormBody>[0]);
    expect(result).toBeInstanceOf(Response);
    expect((result as Response).status).toBe(413);
  });
});
