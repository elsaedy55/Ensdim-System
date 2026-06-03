"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "default" | "pills" | "underline";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center",
      variant === "default" && [
        "h-9 rounded-lg bg-[var(--bg-muted)] p-1 gap-1",
      ],
      variant === "pills" && ["gap-1"],
      variant === "underline" && [
        "border-b border-[var(--border)] gap-1 w-full",
      ],
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "default" | "pills" | "underline";
    count?: number;
  }
>(({ className, variant = "default", count, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      variant === "default" && [
        "rounded-md px-3 py-1.5 text-[var(--text-muted)]",
        "data-[state=active]:bg-[var(--bg-surface)] data-[state=active]:text-[var(--text-primary)]",
        "data-[state=active]:shadow-[var(--shadow-xs)]",
      ],
      variant === "underline" && [
        "px-3 py-2 text-[var(--text-muted)] border-b-2 border-transparent -mb-px rounded-none",
        "data-[state=active]:text-[var(--text-primary)] data-[state=active]:border-[var(--accent)]",
      ],
      className
    )}
    {...props}
  >
    {children}
    {count !== undefined && (
      <span className="ms-1 rounded-full bg-(--bg-muted) px-1.5 py-0.5 text-xs text-(--text-muted) data-[state=active]:bg-(--accent-subtle) data-[state=active]:text-(--accent)">
        {count}
      </span>
    )}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
