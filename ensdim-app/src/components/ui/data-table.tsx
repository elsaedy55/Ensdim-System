"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { EmptyState } from "./empty-state";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc" | null;

export interface SortingState {
  id: string;
  direction: SortDirection;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyState?: EmptyStateProps;
  pagination?: PaginationState;
  onPaginationChange?: (state: PaginationState) => void;
  sorting?: SortingState;
  onSortingChange?: (state: SortingState) => void;
  rowSelection?: boolean;
  selectedRows?: string[];
  onRowSelectionChange?: (ids: string[]) => void;
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
  className?: string;
  stickyHeader?: boolean;
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc")  return <ChevronUp className="h-3.5 w-3.5 text-(--accent)" />;
  if (direction === "desc") return <ChevronDown className="h-3.5 w-3.5 text-(--accent)" />;
  return <ChevronsUpDown className="h-3.5 w-3.5 text-(--text-muted) opacity-0 group-hover:opacity-100 transition-opacity" />;
}

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<T extends object>({
  data,
  columns,
  isLoading,
  emptyState,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  rowSelection,
  selectedRows = [],
  onRowSelectionChange,
  getRowId,
  onRowClick,
  className,
  stickyHeader,
}: DataTableProps<T>) {
  const t = useTranslations("tables");

  const handleSort = (colId: string) => {
    if (!onSortingChange) return;
    if (sorting?.id === colId) {
      if (sorting.direction === "asc")  return onSortingChange({ id: colId, direction: "desc" });
      if (sorting.direction === "desc") return onSortingChange({ id: colId, direction: null });
    }
    onSortingChange({ id: colId, direction: "asc" });
  };

  const toggleAll = () => {
    if (!onRowSelectionChange || !getRowId) return;
    const allIds = data.map((r) => getRowId(r));
    if (selectedRows.length === allIds.length) {
      onRowSelectionChange([]);
    } else {
      onRowSelectionChange(allIds);
    }
  };

  const toggleRow = (id: string) => {
    if (!onRowSelectionChange) return;
    if (selectedRows.includes(id)) {
      onRowSelectionChange(selectedRows.filter((r) => r !== id));
    } else {
      onRowSelectionChange([...selectedRows, id]);
    }
  };

  const alignClass = { left: "text-start", center: "text-center", right: "text-end" };

  return (
    <div className={cn("surface overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          {/* Header */}
          <thead className={cn("border-b border-(--border) bg-(--bg-muted)/50", stickyHeader && "sticky top-0 z-10")}>
            <tr>
              {rowSelection && getRowId && (
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onCheckedChange={toggleAll}
                    aria-label={t("aria.selectAll")}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-(--text-muted)",
                    col.width,
                    alignClass[col.align ?? "left"],
                    col.sortable && "group cursor-pointer hover:text-(--text-primary) select-none",
                    col.className
                  )}
                  onClick={() => col.sortable && handleSort(col.id)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && <SortIcon direction={sorting?.id === col.id ? sorting.direction : null} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-(--border)">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {rowSelection && <td className="px-4 py-3"><Skeleton className="h-4 w-4" /></td>}
                  {columns.map((col) => (
                    <td key={col.id} className="px-4 py-3">
                      <Skeleton className={cn("h-4", col.id === columns[0]?.id ? "w-36" : "w-24")} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (rowSelection ? 1 : 0)}>
                  <EmptyState
                    title={emptyState?.title ?? t("emptyState.title")}
                    description={emptyState?.description}
                    icon={emptyState?.icon}
                    action={emptyState?.action}
                    size="sm"
                  />
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => {
                const rowId = getRowId ? getRowId(row) : String(rowIdx);
                const isSelected = selectedRows.includes(rowId);

                return (
                  <tr
                    key={rowId}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "transition-colors",
                      onRowClick && "cursor-pointer hover:bg-(--bg-muted)",
                      isSelected && "bg-(--accent-subtle)"
                    )}
                  >
                    {rowSelection && getRowId && (
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(rowId)}
                          aria-label={t("aria.selectRow")}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          "px-4 py-3 text-sm text-(--text-secondary)",
                          alignClass[col.align ?? "left"],
                          col.className
                        )}
                      >
                        {col.cell
                          ? col.cell(row)
                          : col.accessor
                            ? typeof col.accessor === "function"
                              ? col.accessor(row)
                              : String(row[col.accessor] ?? "—")
                            : "—"}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && onPaginationChange && !isLoading && data.length > 0 && (
        <TablePagination pagination={pagination} onChange={onPaginationChange} />
      )}
    </div>
  );
}

// ─── TableRowActions ──────────────────────────────────────────────────────────

export interface RowAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: "default" | "danger";
  hidden?: (row: T) => boolean;
}

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "./dropdown-menu";

interface TableRowActionsProps<T> {
  row: T;
  actions: RowAction<T>[];
}

export function TableRowActions<T>({ row, actions }: TableRowActionsProps<T>) {
  const t = useTranslations("tables");
  const visible = actions.filter((a) => !a.hidden?.(row));
  if (!visible.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-7 w-7 text-(--text-muted)"
          aria-label={t("aria.rowActions")}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {visible.map((action, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && action.variant === "danger" && visible[idx - 1]?.variant !== "danger" && (
              <DropdownMenuSeparator />
            )}
            <DropdownMenuItem
              destructive={action.variant === "danger"}
              onClick={(e) => { e.stopPropagation(); action.onClick(row); }}
              className="flex items-center gap-2"
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface TablePaginationProps {
  pagination: PaginationState;
  onChange: (state: PaginationState) => void;
  pageSizeOptions?: number[];
}

export function TablePagination({ pagination, onChange, pageSizeOptions = [10, 20, 50] }: TablePaginationProps) {
  const t = useTranslations("tables");
  const { page, pageSize, total } = pagination;
  const totalPages = Math.ceil(total / pageSize);
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-(--border) text-sm">
      <p className="text-(--text-muted) text-xs">
        {t("pagination.showing", { from, to, total })}
      </p>

      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={(e) => onChange({ ...pagination, pageSize: Number(e.target.value), page: 1 })}
          className="rounded border border-(--border) bg-(--bg-surface) px-2 py-1 text-xs text-(--text-primary) focus:outline-none focus:border-(--accent)"
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>{t("pagination.perPage", { size: s })}</option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onChange({ ...pagination, page: page - 1 })}
            disabled={page <= 1}
            className="h-7 w-7"
          >
            <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" />
          </Button>
          <span className="text-xs text-(--text-muted) min-w-[4rem] text-center">
            {page} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onChange({ ...pagination, page: page + 1 })}
            disabled={page >= totalPages}
            className="h-7 w-7"
          >
            <ChevronRight className="h-4 w-4 rtl:scale-x-[-1]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── FilterBar + FilterChip ───────────────────────────────────────────────────

import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  onRemove: () => void;
  className?: string;
}

export function FilterChip({ label, onRemove, className }: FilterChipProps) {
  const t = useTranslations("tables");
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full border border-(--accent-muted) bg-(--accent-subtle) px-2.5 py-0.5 text-xs font-medium text-(--accent)",
      className
    )}>
      {label}
      <button type="button" onClick={onRemove} className="hover:text-(--accent-hover) ms-0.5" aria-label={t("aria.removeFilter")}>
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

interface FilterBarProps {
  filters: Array<{ id: string; label: string }>;
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function FilterBar({ filters, onRemove, onClearAll, className }: FilterBarProps) {
  const t = useTranslations("tables");
  if (!filters.length) return null;

  return (
    <div className={cn("flex items-center flex-wrap gap-2", className)}>
      <span className="text-xs text-(--text-muted) shrink-0">{t("filters.label")}</span>
      {filters.map((f) => (
        <FilterChip key={f.id} label={f.label} onRemove={() => onRemove(f.id)} />
      ))}
      {onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-(--text-muted) hover:text-(--danger) transition-colors"
        >
          {t("filters.clearAll")}
        </button>
      )}
    </div>
  );
}

// ─── BulkActionsBar ───────────────────────────────────────────────────────────

interface BulkAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

interface BulkActionsBarProps {
  selectedCount: number;
  actions: BulkAction[];
  onClearSelection: () => void;
}

export function BulkActionsBar({ selectedCount, actions, onClearSelection }: BulkActionsBarProps) {
  const t = useTranslations("tables");
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-(--accent-muted) bg-(--accent-subtle) px-4 py-2.5">
      <span className="text-sm font-medium text-(--accent)">
        {t("bulk.selected", { count: selectedCount })}
      </span>
      <div className="h-4 w-px bg-(--accent-muted)" />
      <div className="flex items-center gap-2 flex-1">
        {actions.map((action, idx) => (
          <Button
            key={idx}
            variant={action.variant === "danger" ? "destructive" : "ghost"}
            size="sm"
            onClick={action.onClick}
            className={cn("gap-1.5", action.variant !== "danger" && "text-(--accent) hover:text-(--accent-hover)")}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearSelection}
        className="text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors"
      >
        {t("bulk.clear")}
      </button>
    </div>
  );
}
