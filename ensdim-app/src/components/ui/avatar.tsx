"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn, getInitials } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
  }
>(({ className, size = "md", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      {
        "h-6 w-6 text-xs":   size === "xs",
        "h-8 w-8 text-xs":   size === "sm",
        "h-9 w-9 text-sm":   size === "md",
        "h-10 w-10 text-sm": size === "lg",
        "h-14 w-14 text-base": size === "xl",
      },
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-(--accent-subtle) text-(--accent) font-medium",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Compound Avatar with auto-fallback
interface UserAvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const UserAvatar = ({ src, name, size = "md", className }: UserAvatarProps) => (
  <Avatar size={size} className={className}>
    <AvatarImage src={src} alt={name} />
    <AvatarFallback>{getInitials(name)}</AvatarFallback>
  </Avatar>
);

// Avatar Group â€” shows first N avatars with overflow count
interface AvatarGroupProps {
  users: Array<{ id: string; name: string; avatar?: string }>;
  max?: number;
  size?: "xs" | "sm" | "md";
  className?: string;
}

const AvatarGroup = ({ users, max = 4, size = "sm", className }: AvatarGroupProps) => {
  const visible = users.slice(0, max);
  const overflow = users.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visible.map((user) => (
        <UserAvatar
          key={user.id}
          src={user.avatar}
          name={user.name}
          size={size}
          className="ring-2 ring-(--bg-surface)"
        />
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full ring-2 ring-(--bg-surface)",
            "bg-(--bg-muted) text-(--text-secondary) font-medium",
            {
              "h-6 w-6 text-xs": size === "xs",
              "h-8 w-8 text-xs": size === "sm",
              "h-9 w-9 text-xs": size === "md",
            }
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback, UserAvatar, AvatarGroup };
