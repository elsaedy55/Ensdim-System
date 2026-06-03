"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  type DragStartEvent, type DragEndEvent, type DragOverEvent,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn, formatDate } from "@/lib/utils";
import { Plus, GripVertical, Calendar, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useUpdateTaskStatus } from "@/hooks/useTasks";
import type { TaskWithRelations, TaskStatus } from "@/lib/services/tasks.service";

// ─── Constants ────────────────────────────────────────────────────

export const KANBAN_COLUMNS: { id: TaskStatus; labelKey: string; color: string }[] = [
  { id: "todo",        labelKey: "todo",        color: "text-(--text-muted)" },
  { id: "in_progress", labelKey: "in_progress", color: "text-(--accent)" },
  { id: "review",      labelKey: "review",      color: "text-(--warning-foreground)" },
  { id: "done",        labelKey: "done",        color: "text-(--success-foreground)" },
  { id: "blocked",     labelKey: "blocked",     color: "text-(--danger-foreground)" },
];

const PRIORITY_BORDER: Record<string, string> = {
  high:   "border-s-[3px] border-s-(--danger)",
  medium: "border-s-[3px] border-s-(--warning)",
  low:    "border-s-[3px] border-s-(--border)",
};

const TYPE_COLORS: Record<string, string> = {
  bug:     "bg-(--danger-subtle) text-(--danger-foreground) border-(--danger-muted)",
  feature: "bg-(--accent-subtle) text-(--accent) border-(--accent-muted)",
  design:  "bg-(--warning-subtle) text-(--warning-foreground) border-(--warning-muted)",
  review:  "bg-(--bg-muted) text-(--text-secondary) border-(--border)",
  other:   "bg-(--bg-muted) text-(--text-secondary) border-(--border)",
};

// ─── TaskCard ─────────────────────────────────────────────────────

function TaskCard({
  task,
  isDragging = false,
  onOpen,
}: {
  task: TaskWithRelations;
  isDragging?: boolean;
  onOpen?: (task: TaskWithRelations) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group rounded-xl border bg-(--bg-surface) p-3.5 space-y-2.5 cursor-pointer",
        "transition-all duration-150 select-none",
        PRIORITY_BORDER[task.priority],
        isDragging
          ? "shadow-lg rotate-1 scale-[1.02]"
          : "hover:shadow-(--shadow-md) hover:-translate-y-px",
      )}
      onClick={() => onOpen?.(task)}
    >
      {/* Drag handle + type */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
            TYPE_COLORS[task.type],
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {task.type}
        </span>
        <button
          type="button"
          className="opacity-0 group-hover:opacity-60 hover:opacity-100 cursor-grab active:cursor-grabbing p-0.5 rounded"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-3.5 w-3.5 text-(--text-muted)" />
        </button>
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-(--text-primary) leading-snug line-clamp-2">
        {task.title}
      </p>

      {/* Project link */}
      {task.project && (
        <p className="text-[10px] text-(--text-muted) truncate">
          📂 {task.project.name}{task.milestone ? ` › ${task.milestone.name}` : ""}
        </p>
      )}

      {/* Footer: priority + due + assignee */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {task.due_date && (
            <span className="inline-flex items-center gap-1 text-[10px] text-(--text-muted)">
              <Calendar className="h-3 w-3" />
              {formatDate(task.due_date, { month: "short", day: "numeric" })}
            </span>
          )}
        </div>
        {task.assignee && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--accent-subtle) text-(--accent) text-[10px] font-bold">
            {task.assignee.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── KanbanColumn ─────────────────────────────────────────────────

function KanbanColumn({
  column,
  tasks,
  onOpenTask,
  onAddTask,
}: {
  column: typeof KANBAN_COLUMNS[0];
  tasks: TaskWithRelations[];
  onOpenTask: (t: TaskWithRelations) => void;
  onAddTask: (status: TaskStatus) => void;
}) {
  const t   = useTranslations("admin.tasks.columns");
  const ids = tasks.map((t) => t.id);

  const colBg: Record<TaskStatus, string> = {
    todo:        "border-(--border) bg-(--bg-muted)/30",
    in_progress: "border-(--accent-muted) bg-(--accent-subtle)/10",
    review:      "border-(--warning-muted) bg-(--warning-subtle)/10",
    done:        "border-(--success-muted) bg-(--success-subtle)/10",
    blocked:     "border-(--danger-muted) bg-(--danger-subtle)/10",
  };

  return (
    <div className="flex w-72 shrink-0 flex-col gap-2">
      {/* Header */}
      <div className={cn("flex items-center justify-between rounded-xl border px-3 py-2", colBg[column.id])}>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-semibold", column.color)}>
            {t(column.labelKey as Parameters<typeof t>[0])}
          </span>
          {tasks.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-(--bg-surface) border border-(--border) text-[10px] font-bold text-(--text-muted) px-1">
              {tasks.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onAddTask(column.id)}
          className="flex h-6 w-6 items-center justify-center rounded-md text-(--text-muted) hover:bg-(--bg-surface) hover:text-(--text-primary) transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Cards */}
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 min-h-24">
          {tasks.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-(--border) py-6 text-center">
              <p className="text-xs text-(--text-muted)">No tasks</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onOpen={onOpenTask} />
            ))
          )}
        </div>
      </SortableContext>

      {/* Add task footer */}
      <button
        type="button"
        onClick={() => onAddTask(column.id)}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs text-(--text-muted) hover:bg-(--bg-muted) hover:text-(--text-primary) transition-colors w-full"
      >
        <Plus className="h-3.5 w-3.5" /> Add task
      </button>
    </div>
  );
}

// ─── KanbanBoard ──────────────────────────────────────────────────

interface KanbanBoardProps {
  tasks: TaskWithRelations[];
  onOpenTask: (task: TaskWithRelations) => void;
  onAddTask:  (status: TaskStatus) => void;
  isLoading?: boolean;
}

export function KanbanBoard({ tasks, onOpenTask, onAddTask, isLoading }: KanbanBoardProps) {
  const updateStatus  = useUpdateTaskStatus();
  const [localTasks, setLocalTasks] = React.useState(tasks);
  const [activeTask,  setActiveTask]  = React.useState<TaskWithRelations | null>(null);

  React.useEffect(() => { setLocalTasks(tasks); }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const tasksByColumn = (status: TaskStatus) =>
    localTasks.filter((t) => t.status === status)
      .sort((a, b) => a.order - b.order);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(localTasks.find((t) => t.id === active.id) ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over || active.id === over.id) return;

    // Check if dropped on a column or a card
    const targetCol = KANBAN_COLUMNS.find((c) => c.id === over.id);
    const targetCard = localTasks.find((t) => t.id === over.id);

    const newStatus: TaskStatus =
      targetCol?.id ?? targetCard?.status ?? "todo";

    const sourceTask = localTasks.find((t) => t.id === active.id);
    if (!sourceTask) return;

    if (sourceTask.status !== newStatus) {
      setLocalTasks((prev) =>
        prev.map((t) => t.id === active.id ? { ...t, status: newStatus } : t)
      );
      updateStatus.mutate(
        { id: String(active.id), status: newStatus },
        { onError: () => { setLocalTasks(tasks); toast.error("Failed to update status"); } }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((col) => (
          <div key={col.id} className="w-72 shrink-0 space-y-2">
            <div className="h-10 bg-(--bg-muted) rounded-xl animate-pulse" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-24 bg-(--bg-muted) rounded-xl animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-3 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            tasks={tasksByColumn(col.id)}
            onOpenTask={onOpenTask}
            onAddTask={onAddTask}
          />
        ))}
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} isDragging />}
      </DragOverlay>
    </DndContext>
  );
}
