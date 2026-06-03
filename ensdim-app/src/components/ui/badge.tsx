import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:    "border-[var(--border)] bg-[var(--bg-muted)] text-[var(--text-secondary)]",
        primary:    "border-[var(--accent-muted)] bg-[var(--accent-subtle)] text-[var(--accent-hover)]",
        secondary:  "border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)]",
        success:    "border-[var(--success-muted)] bg-[var(--success-subtle)] text-[var(--success-foreground)]",
        warning:    "border-[var(--warning-muted)] bg-[var(--warning-subtle)] text-[var(--warning-foreground)]",
        danger:     "border-[var(--danger-muted)] bg-[var(--danger-subtle)] text-[var(--danger-foreground)]",
        outline:    "border-[var(--border-strong)] bg-transparent text-[var(--text-secondary)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, dot, children, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0", {
            "bg-[var(--text-muted)]":           variant === "default" || variant === "secondary",
            "bg-[var(--accent)]":               variant === "primary",
            "bg-[var(--success)]":              variant === "success",
            "bg-[var(--warning)]":              variant === "warning",
            "bg-[var(--danger)]":               variant === "danger",
          })}
        />
      )}
      {children}
    </div>
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
