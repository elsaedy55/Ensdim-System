import { cn, getInitials } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/avatar";

interface TeamMemberChipProps {
  name: string;
  role?: string;
  avatar?: string;
  size?: "sm" | "md";
  className?: string;
}

export function TeamMemberChip({ name, role, avatar, size = "sm", className }: TeamMemberChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-(--bg-surface)",
        size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1",
        className
      )}
    >
      <UserAvatar name={name} src={avatar} size="xs" />
      <span className={cn("font-medium text-(--text-primary)", size === "sm" ? "text-xs" : "text-sm")}>
        {name}
      </span>
      {role && (
        <span className={cn("text-(--text-muted)", size === "sm" ? "text-[10px]" : "text-xs")}>
          · {role}
        </span>
      )}
    </div>
  );
}

interface TeamMemberAvatarStackProps {
  members: Array<{ name: string; avatar?: string }>;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function TeamMemberAvatarStack({ members, max = 4, size = "sm", className }: TeamMemberAvatarStackProps) {
  const visible = members.slice(0, max);
  const overflow = members.length - max;

  const avatarSize = size === "sm" ? "sm" : "md";
  const overlapClass = size === "sm" ? "-ms-2 first:ms-0" : "-ms-2.5 first:ms-0";

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((m, i) => (
        <div key={i} className={cn("ring-2 ring-(--bg-surface) rounded-full", overlapClass)}>
          <UserAvatar name={m.name} src={m.avatar} size={avatarSize} />
        </div>
      ))}
      {overflow > 0 && (
        <div className={cn(
          "flex items-center justify-center rounded-full bg-(--bg-muted) ring-2 ring-(--bg-surface)",
          overlapClass,
          size === "sm" ? "h-6 w-6 text-[10px]" : "h-7 w-7 text-xs",
          "font-medium text-(--text-muted)"
        )}>
          +{overflow}
        </div>
      )}
    </div>
  );
}
