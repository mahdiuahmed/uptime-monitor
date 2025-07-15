"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function CreateCheckForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/create-check", {
      method: "POST",
      body: JSON.stringify({ name, url }),
      headers: { "Content-Type": "application/json" },
    });

    setIsLoading(false);

    if (res.ok) {
      toast.success("✅ Check created");
      setName("");
      setUrl("");
      router.refresh();
    } else {
      toast.error("❌ Failed to create check");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4">+ New Check</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Website name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
