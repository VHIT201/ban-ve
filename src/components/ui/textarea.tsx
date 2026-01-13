import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input rounded-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex w-full min-h-16 border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      style={{
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        maxWidth: "100%",
        resize: "none",
        overflow: "hidden",
        boxSizing: "border-box",
        wordBreak: "break-word",
        hyphens: "auto",
      }}
      onInput={(e) => {
        // Tự động điều chỉnh chiều cao
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";

        // Gọi onInput từ props nếu có
        if (props.onInput) {
          (props.onInput as any)(e);
        }
      }}
      {...props}
    />
  );
}

export { Textarea };
