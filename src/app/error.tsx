"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4 max-w-md text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Đã có lỗi xảy ra!
        </h2>
        <p className="text-muted-foreground">
          Rất tiếc, đã xảy ra lỗi khi tải trang này.
        </p>
        <Button onClick={reset}>Thử lại</Button>
      </div>
    </div>
  );
}
