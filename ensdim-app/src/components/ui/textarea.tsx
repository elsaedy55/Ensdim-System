import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border bg-[var(--bg-surface)] px-3 py-2",
        "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
        "border-[var(--border)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-0 focus:border-[var(--accent)]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--bg-muted)]",
        "resize-y transition-colors duration-150",
        error && "border-[var(--danger)] focus:ring-[var(--danger)]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
