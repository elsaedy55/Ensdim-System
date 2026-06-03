import { cn } from "@/lib/utils";

interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: "default" | "accent" | "danger" | "warning";
  size?: "sm" | "md";
  className?: string;
}

export function CountBadge({ count, max = 99, variant = "accent", size = "sm", className }: CountBadgeProps) {
  if (count <= 0) return null;

  const label = count > max ? `${max}+` : String(count);

  const variantStyles = {
    default: "bg-[var(--bg-muted)] text-[var(--text-secondary)]",
    accent:  "bg-[var(--accent)] text-white",
    danger:  "bg-[var(--danger)] text-white",
    warning: "bg-[var(--warning)] text-white",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold leading-none",
        size === "sm" ? "min-w-[1rem] h-4 px-1 text-[10px]" : "min-w-[1.25rem] h-5 px-1.5 text-xs",
        variantStyles,
        className
      )}
    >
      {label}
    </span>
  );
}
