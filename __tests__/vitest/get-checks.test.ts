import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/get-checks/route";
import { NextRequest } from "next/server";

const mockEq = vi.fn();
const mockSelect = vi.fn(() => ({ eq: mockEq }));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: mockSelect,
    })),
  },
}));

import { supabase } from "@/lib/supabase";

describe("GET /api/get-checks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty array if no userId is provided", async () => {
    const req = new NextRequest("http://localhost/api/get-checks");

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual([]);
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it("returns empty array if supabase returns error", async () => {
    const req = new NextRequest(
      "http://localhost/api/get-checks?userId=user_123"
    );

    mockEq.mockResolvedValueOnce({
      data: null,
      error: { message: "DB error" },
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual([]);
    expect(supabase.from).toHaveBeenCalledWith("checks");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockEq).toHaveBeenCalledWith("user_id", "user_123");
  });

  it("returns data if supabase query succeeds", async () => {
    const req = new NextRequest(
      "http://localhost/api/get-checks?userId=user_123"
    );

    const fakeData = [{ id: 1, user_id: "user_123", name: "Check 1" }];
    mockEq.mockResolvedValueOnce({
      data: fakeData,
      error: null,
    });

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual(fakeData);
    expect(supabase.from).toHaveBeenCalledWith("checks");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockEq).toHaveBeenCalledWith("user_id", "user_123");
  });
});
