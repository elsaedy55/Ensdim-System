"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

const Command = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) => (
  <CommandPrimitive className={cn("relative w-full bg-[var(--bg-surface)] rounded-md border border-[var(--border)]", className)} {...props} />
);

const CommandInput = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center px-3 py-2 border-b border-(--border) bg-(--bg-surface)">
      <CommandPrimitive.Input ref={ref} className={cn("flex-1 outline-none bg-transparent text-[var(--text-primary)]", className)} {...props} />
    </div>
  )
);
CommandInput.displayName = "CommandInput";

const CommandList = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List className={cn("max-h-60 overflow-auto p-1", className)} {...props} />
);

const CommandEmpty = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty className={cn("p-3 text-sm text-[var(--text-muted)]", className)} {...props} />
);

const CommandGroup = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group className={cn("p-1", className)} {...props} />
);

const CommandItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "cursor-default select-none rounded-sm px-2 py-1 text-sm",
        "text-[var(--text-primary)] hover:bg-[var(--bg-muted)]",
        className
      )}
      {...props}
    />
  )
);
CommandItem.displayName = "CommandItem";

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem };
