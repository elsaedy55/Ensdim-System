"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/common/Header/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SearchInput } from "@/components/ui/search-input";
import { StatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/ui/status-badge";
import { KanbanBoard, KANBAN_COLUMNS } from "@/components/admin/KanbanBoard";
import { TaskDetailDrawer } from "@/components/admin/TaskDetailDrawer";
import { CreateTaskModal } from "@/components/admin/CreateTaskModal";
import { formatDate } from "@/lib/utils";
import { Plus, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTasks } from "@/hooks/useTasks";
import type { TaskWithRelations, TaskStatus } from "@/lib/services/tasks.service";

type ViewMode = "board" | "list";

export default function AdminTasksPage() {
  const t = useTranslations("admin.tasks");
  const { data: tasks, isLoading } = useTasks();

  const [view,         setView]         = React.useState<ViewMode>("board");
  const [mobileCol,    setMobileCol]    = React.useState<TaskStatus>("todo");
  const [selectedTask, setSelectedTask] = React.useState<TaskWithRelations | null>(null);
  const [createOpen,   setCreateOpen]   = React.useState(false);
  const [defaultStatus, setDefaultStatus] = React.useState<TaskStatus>("todo");
  const [search,       setSearch]       = React.useState("");

  const allTasks = tasks ?? [];
  const filtered = search
    ? allTasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    : allTasks;

  const handleAddTask = (status: TaskStatus) => {
    setDefaultStatus(status);
    setCreateOpen(true);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={t("page.title")}
        subtitle={t("page.subtitle")}
        actions={
          <Button onClick={() => { setDefaultStatus("todo"); setCreateOpen(true); }}>
            <Plus className="h-4 w-4" /> New Task
          </Button>
        }
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search tasks..."
          className="max-w-xs"
        />

        {/* View toggle */}
        <div className="flex items-center rounded-xl border border-(--border) p-0.5 bg-(--bg-muted)/50">
          {(["board", "list"] as ViewMode[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                view === v
                  ? "bg-(--bg-surface) text-(--text-primary) shadow-[var(--shadow-xs)]"
                  : "text-(--text-muted) hover:text-(--text-primary)",
              )}
            >
              {v === "board" ? <LayoutGrid className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}
              {v === "board" ? "Board" : "List"}
            </button>
          ))}
        </div>
      </div>

      {/* Board View — desktop: all columns, mobile: single column with tab switcher */}
      {view === "board" && (
        <>
          {/* Mobile: column switcher tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 md:hidden">
            {KANBAN_COLUMNS.map((col) => {
              const count = filtered.filter((t) => t.status === col.id).length;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setMobileCol(col.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    mobileCol === col.id
                      ? "border-(--accent) bg-(--accent-subtle) text-(--accent)"
                      : "border-(--border) text-(--text-muted) hover:text-(--text-primary)",
                  )}
                >
                  {col.id.replace("_", " ")}
                  {count > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-(--accent) text-[9px] font-bold text-white px-1">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop: full board */}
          <div className="hidden md:block">
            <KanbanBoard
              tasks={filtered}
              onOpenTask={setSelectedTask}
              onAddTask={handleAddTask}
              isLoading={isLoading}
            />
          </div>

          {/* Mobile: single column */}
          <div className="md:hidden space-y-2">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-(--bg-muted) rounded-xl animate-pulse" />
              ))
            ) : (
              filtered
                .filter((t) => t.status === mobileCol)
                .map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setSelectedTask(task)}
                    className="w-full surface p-4 text-start space-y-2 hover:shadow-(--shadow-sm) transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-(--text-primary) line-clamp-2">{task.title}</p>
                      <StatusBadge status={task.status} showDot={false} size="sm" />
                    </div>
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={task.priority} />
                      {task.assignee && (
                        <span className="text-xs text-(--text-muted)">{task.assignee.name}</span>
                      )}
                    </div>
                  </button>
                ))
            )}
            {!isLoading && filtered.filter((t) => t.status === mobileCol).length === 0 && (
              <div className="py-10 text-center text-sm text-(--text-muted)">No tasks in this column.</div>
            )}
          </div>
        </>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="surface overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border) bg-(--bg-muted)/50">
                {["Title", "Type", "Status", "Priority", "Assignee", "Due Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wider text-(--text-muted)">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border)">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-(--bg-muted) rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-sm text-(--text-muted)">
                    {t("emptyState.title")}
                  </td>
                </tr>
              ) : (
                filtered.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-(--bg-muted) transition-colors cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    <td className="px-4 py-3 font-medium text-(--text-primary) max-w-xs truncate">{task.title}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-(--text-muted) capitalize">{task.type}</span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={task.status} /></td>
                    <td className="px-4 py-3"><PriorityBadge priority={task.priority} /></td>
                    <td className="px-4 py-3 text-xs text-(--text-secondary)">
                      {task.assignee?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-(--text-muted)">
                      {task.due_date ? formatDate(task.due_date, { month: "short", day: "numeric" }) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawers/Modals */}
      <TaskDetailDrawer task={selectedTask} onClose={() => setSelectedTask(null)} />
      <CreateTaskModal open={createOpen} onClose={() => setCreateOpen(false)} defaultStatus={defaultStatus} />
    </div>
  );
}
