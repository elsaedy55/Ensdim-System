import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftElement, rightElement, ...props }, ref) => {
    if (leftElement || rightElement) {
      return (
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute inset-s-3 flex items-center pointer-events-none text-(--text-muted)">
              {leftElement}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border bg-(--bg-surface) px-3 py-2 text-sm text-(--text-primary)",
              "placeholder:text-(--text-muted)",
              "border-(--border)",
              "focus:outline-none focus:ring-2 focus:ring-(--accent) focus:ring-offset-0 focus:border-(--accent)",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--bg-muted)",
              "transition-colors duration-150",
              error && "border-(--danger) focus:ring-(--danger)",
              leftElement && "ps-9",
              rightElement && "pe-9",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-e-3 flex items-center text-(--text-muted)">
              {rightElement}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border bg-(--bg-surface) px-3 py-2 text-sm text-(--text-primary)",
          "placeholder:text-(--text-muted)",
          "border-(--border)",
          "focus:outline-none focus:ring-2 focus:ring-(--accent) focus:ring-offset-0 focus:border-(--accent)",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--bg-muted)",
          "transition-colors duration-150",
          error && "border-(--danger) focus:ring-(--danger)",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
