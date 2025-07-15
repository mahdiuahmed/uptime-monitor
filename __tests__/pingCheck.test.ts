import { describe, expect, it } from "vitest";

function isUp(status: number) {
  return status >= 200 && status < 400;
}

describe("isUp function", () => {
  it("returns true for 200 OK", () => {
    expect(isUp(200)).toBe(true);
  });

  it("returns false for 500 error", () => {
    expect(isUp(500)).toBe(false);
  });
});
