import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Folder, Flag, MessageSquare, FileText, Receipt,
  Bell, Search, Users, CheckSquare, UserPlus, Package
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = "md",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        size === "sm" && "py-8 px-4",
        size === "md" && "py-16 px-6",
        size === "lg" && "py-24 px-6",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-[var(--bg-muted)] mb-4",
          size === "sm" && "h-10 w-10",
          size === "md" && "h-14 w-14",
          size === "lg" && "h-16 w-16",
        )}
      >
        <Icon
          className={cn(
            "text-[var(--text-muted)]",
            size === "sm" && "h-5 w-5",
            size === "md" && "h-7 w-7",
            size === "lg" && "h-8 w-8",
          )}
        />
      </div>
      <h3
        className={cn(
          "font-semibold text-[var(--text-primary)]",
          size === "sm" ? "text-sm" : "text-base"
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "mt-1.5 text-[var(--text-muted)] max-w-xs",
            size === "sm" ? "text-xs" : "text-sm"
          )}
        >
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-5 flex items-center gap-3">
          {action && (
            <Button size="md" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" size="md" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€ Pre-built variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type EmptyStatePreset = Pick<EmptyStateProps, "action" | "secondaryAction" | "className" | "size">;

export const NoProjects = (props: EmptyStatePreset) => (
  <EmptyState
    icon={Folder}
    title="لا توجد مشاريع حتى الآن"
    description="Your projects will appear here once the team adds them."
    {...props}
  />
);

export const NoMilestones = (props: EmptyStatePreset) => (
  <EmptyState
    icon={Flag}
    title="No milestones defined"
    description="The project team will add milestones as work begins."
    {...props}
  />
);

export const NoRevisions = (props: EmptyStatePreset & { onNew?: () => void }) => (
  <EmptyState
    icon={MessageSquare}
    title="No requests submitted"
    description="Submit a revision request when you'd like the team to make changes."
    action={props.onNew ? { label: "New Request", onClick: props.onNew } : undefined}
    {...props}
  />
);

export const NoFiles = (props: EmptyStatePreset) => (
  <EmptyState
    icon={FileText}
    title="No files yet"
    description="Your project deliverables will appear here once the team uploads them."
    {...props}
  />
);

export const NoInvoices = (props: EmptyStatePreset) => (
  <EmptyState
    icon={Receipt}
    title="No invoices yet"
    description="Invoices for your project will appear here."
    {...props}
  />
);

export const NoNotifications = (props: EmptyStatePreset) => (
  <EmptyState
    icon={Bell}
    title="You're all caught up"
    description="No new notifications."
    {...props}
  />
);

export const NoSearchResults = (props: EmptyStatePreset & { onClear?: () => void }) => (
  <EmptyState
    icon={Search}
    title="No results found"
    description="Try a different search term or clear your filters."
    action={props.onClear ? { label: "Clear filters", onClick: props.onClear } : undefined}
    {...props}
  />
);

export const NoClients = (props: EmptyStatePreset & { onAdd?: () => void }) => (
  <EmptyState
    icon={Users}
    title="No clients added"
    description="Add your first client to start creating projects."
    action={props.onAdd ? { label: "Add Client", onClick: props.onAdd } : undefined}
    {...props}
  />
);

export const NoTasks = (props: EmptyStatePreset & { onNew?: () => void }) => (
  <EmptyState
    icon={CheckSquare}
    title="No tasks created"
    description="Create tasks to organize your team's work."
    action={props.onNew ? { label: "Create Task", onClick: props.onNew } : undefined}
    {...props}
  />
);

export const NoTeamMembers = (props: EmptyStatePreset & { onInvite?: () => void }) => (
  <EmptyState
    icon={UserPlus}
    title="No team members"
    description="Invite your team to start collaborating."
    action={props.onInvite ? { label: "Invite Member", onClick: props.onInvite } : undefined}
    {...props}
  />
);
