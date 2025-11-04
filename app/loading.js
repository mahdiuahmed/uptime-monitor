import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-1 items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" />
        <p>Loading</p>
      </div>
    </div>
  );
}
