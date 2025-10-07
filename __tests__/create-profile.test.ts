/* eslint-disable @typescript-eslint/no-explicit-any */
// tests/create-profile.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/create-profile/route";

// Mock Clerk auth
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

// Mock Supabase
const mockUpsert = vi.fn();

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      upsert: mockUpsert,
    })),
  },
}));

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

describe("POST /api/create-profile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 if user is not authenticated", async () => {
    (auth as any).mockResolvedValueOnce({ userId: null });

    const res = await POST();
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json).toEqual({ error: "User not authenticated" });
  });

  it("returns 400 if supabase upsert fails", async () => {
    (auth as any).mockResolvedValueOnce({ userId: "user_123" });
    mockUpsert.mockResolvedValueOnce({
      error: { message: "DB upsert failed" },
    });

    const res = await POST();
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "DB upsert failed" });
    expect(supabase.from).toHaveBeenCalledWith("user_profiles");
    expect(mockUpsert).toHaveBeenCalledWith(
      { id: "user_123", role: "user" },
      { onConflict: "id" }
    );
  });

  it("returns success message if supabase upsert succeeds", async () => {
    (auth as any).mockResolvedValueOnce({ userId: "user_123" });
    mockUpsert.mockResolvedValueOnce({ error: null });

    const res = await POST();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ message: "User profile synced" });
    expect(supabase.from).toHaveBeenCalledWith("user_profiles");
    expect(mockUpsert).toHaveBeenCalledWith(
      { id: "user_123", role: "user" },
      { onConflict: "id" }
    );
  });
});
