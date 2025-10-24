// tests/delete-checks.test.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/delete-check/route";
import { NextRequest } from "next/server";

// Mock Supabase
const mockSelect = vi.fn();

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: mockSelect,
    })),
  },
}));

import { supabase } from "@/lib/supabase";

describe("GET /api/delete-checks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty array if no userId is provided", async () => {
    const req = new NextRequest("http://localhost/api/delete-checks"); // no userId param

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual([]);
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it("returns empty array if supabase returns error", async () => {
    const req = new NextRequest(
      "http://localhost/api/delete-checks?userId=user_123"
    );

    mockSelect.mockReturnValueOnce({
      eq: vi.fn().mockResolvedValueOnce({
        data: null,
        error: { message: "DB error" },
      }),
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual([]);
    expect(supabase.from).toHaveBeenCalledWith("checks");
  });

  it("returns data if supabase query succeeds", async () => {
    const req = new NextRequest(
      "http://localhost/api/delete-checks?userId=user_123"
    );

    const fakeData = [{ id: 1, user_id: "user_123", name: "Check 1" }];
    mockSelect.mockReturnValueOnce({
      eq: vi.fn().mockResolvedValueOnce({
        data: fakeData,
        error: null,
      }),
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual(fakeData);
    expect(supabase.from).toHaveBeenCalledWith("checks");
  });
});
