import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  success?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export function FormField({
  label,
  required,
  optional,
  error,
  success,
  hint,
  children,
  className,
  htmlFor,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required} optional={optional}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-(--danger)">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
      {success && !error && (
        <p className="flex items-center gap-1.5 text-xs text-(--success)">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          {success}
        </p>
      )}
      {hint && !error && !success && (
        <p className="text-xs text-(--text-muted)">{hint}</p>
      )}
    </div>
  );
}

interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="pb-1">
          {title && <h3 className="text-sm font-semibold text-(--text-primary)">{title}</h3>}
          {description && <p className="text-sm text-(--text-muted) mt-0.5">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
