import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] focus-visible:ring-[var(--accent)] shadow-[var(--shadow-xs)]",
        secondary:
          "bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] active:bg-[var(--bg-active)] border border-[var(--border)] focus-visible:ring-[var(--border-strong)]",
        destructive:
          "bg-[var(--danger-subtle)] text-[var(--danger)] border border-[var(--danger-muted)] hover:bg-[var(--danger-muted)] focus-visible:ring-[var(--danger)]",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] focus-visible:ring-[var(--border-strong)]",
        link:
          "text-[var(--accent)] underline-offset-4 hover:underline focus-visible:ring-[var(--accent)] p-0 h-auto",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-muted)] focus-visible:ring-[var(--border-strong)]",
      },
      size: {
        sm:   "h-8  px-3  text-xs  rounded-md",
        md:   "h-9  px-4  text-sm  rounded-md",
        lg:   "h-10 px-5  text-sm  rounded-md",
        xl:   "h-11 px-6  text-base rounded-lg",
        icon: "h-9  w-9   rounded-md",
        "icon-sm": "h-8 w-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        {...props}
      >
        {asChild ? children : (
          <>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (leftIcon ?? null)}
            {children}
            {!loading && rightIcon}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
