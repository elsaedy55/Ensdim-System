import { AlertTriangle } from "lucide-react";

interface QueryErrorStateProps {
  title: string;
  error: unknown;
}

// Surfaces a failed query instead of silently falling through to the
// page's "empty" state — a query that errors and one that legitimately
// returns zero rows look identical to `data ?? []` otherwise.
export function QueryErrorState({ title, error }: QueryErrorStateProps) {
  return (
    <div className="surface flex items-start gap-3 p-5 border border-red-200 bg-red-50 rounded-xl">
      <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-red-700">{title}</p>
        <p className="text-xs text-red-500 mt-1">
          {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    </div>
  );
}
