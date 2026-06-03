import { cn, formatDate } from "@/lib/utils";
import { CalendarDays, AlertTriangle, Clock } from "lucide-react";

interface DueDateLabelProps {
  date: string;
  className?: string;
  showIcon?: boolean;
}

function getStatus(date: string): "overdue" | "warning" | "normal" {
  const due = new Date(date);
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays <= 3) return "warning";
  return "normal";
}

export function DueDateLabel({ date, className, showIcon = true }: DueDateLabelProps) {
  const status = getStatus(date);

  const styles = {
    overdue: "text-[var(--danger)]",
    warning: "text-[var(--warning-foreground)]",
    normal:  "text-[var(--text-muted)]",
  }[status];

  const Icon = status === "overdue" ? AlertTriangle : status === "warning" ? Clock : CalendarDays;

  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium", styles, className)}>
      {showIcon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      {formatDate(date, { month: "short", day: "numeric" })}
      {status === "overdue" && <span className="font-semibold">(Overdue)</span>}
    </span>
  );
}
