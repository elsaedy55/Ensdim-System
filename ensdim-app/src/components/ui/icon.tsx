"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string; className?: string }>;

type IconProps = {
  as?: IconComp;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

const sizeMap: Record<string, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
};

const Icon = ({ as: Comp, size = "md", className, ...props }: IconProps) => {
  if (!Comp) return null;
  const s = typeof size === "number" ? size : sizeMap[String(size)] ?? 16;
  return <Comp size={s} className={cn("inline-block", className)} {...props} />;
};

export default Icon;
