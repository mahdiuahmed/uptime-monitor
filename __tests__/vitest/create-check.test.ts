/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "../../app/api/create-check/route";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn(),
  },
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

describe("POST API handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 if user is not authenticated", async () => {
    (auth as any).mockResolvedValue({ userId: null });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "Test", url: "https://example.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);

    const data = await res.json();
    expect(data.error).toBe("Unauthorized");
  });

  it("inserts check and returns success", async () => {
    (auth as any).mockResolvedValue({ userId: "user_123" });
    (supabase.from("checks").insert as any).mockResolvedValue({ error: null });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "Check 1", url: "https://example.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith("checks");
  });

  it("returns 500 if supabase insert fails", async () => {
    (auth as any).mockResolvedValue({ userId: "user_123" });
    (supabase.from("checks").insert as any).mockResolvedValue({
      error: { message: "DB error" },
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "Check 2", url: "https://fail.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const data = await res.json();
    expect(data.error).toBe("DB error");
  });
});
