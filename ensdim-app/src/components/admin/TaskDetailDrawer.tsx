"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { StatusBadge } from "@/components/ui/status-badge";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import { formatRelativeTime } from "@/lib/utils";
import { X, Trash2 } from "lucide-react";
import { useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { useAdminTeam } from "@/hooks/useAdmin";
import type { TaskWithRelations, TaskStatus, TaskPriority } from "@/lib/services/tasks.service";

interface TaskDetailDrawerProps {
  task: TaskWithRelations | null;
  onClose: () => void;
}

export function TaskDetailDrawer({ task, onClose }: TaskDetailDrawerProps) {
  const t = useTranslations("admin.tasks.detail");
  const { data: team } = useAdminTeam();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [title,       setTitle]       = React.useState(task?.title ?? "");
  const [description, setDescription] = React.useState(task?.description ?? "");
  const [deleteOpen,  setDeleteOpen]  = React.useState(false);

  React.useEffect(() => {
    if (task) { setTitle(task.title); setDescription(task.description ?? ""); }
  }, [task?.id]);

  const save = (updates: Partial<typeof task>) => {
    if (!task) return;
    updateTask.mutate(
      { id: task.id, updates: updates as any },
      { onSuccess: () => toast.success("Saved"), onError: (e) => toast.error(e.message) }
    );
  };

  const handleDelete = () => {
    if (!task) return;
    deleteTask.mutate(task.id, {
      onSuccess: () => { toast.success("Task deleted"); setDeleteOpen(false); onClose(); },
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <>
      <Sheet open={!!task} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="right" className="w-full sm:w-[480px] p-0 flex flex-col">
          <SheetTitle className="sr-only">Task Detail</SheetTitle>

          {task && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
                <Select
                  value={task.status}
                  onValueChange={(v) => save({ status: v as TaskStatus })}
                >
                  <SelectTrigger className="h-7 w-32 text-xs border-0 bg-transparent p-0 focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["todo","in_progress","review","done","blocked"].map((s) => (
                      <SelectItem key={s} value={s} className="text-xs">{s.replace("_"," ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button type="button" onClick={onClose} className="text-(--text-muted) hover:text-(--text-primary) transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                {/* Title (inline edit) */}
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => title !== task.title && save({ title })}
                  className="w-full text-lg font-bold text-(--text-primary) bg-transparent border-0 outline-none focus:ring-0 p-0 leading-snug"
                  placeholder="Task title..."
                />

                {/* Details grid */}
                <div className="space-y-3 text-sm">
                  {task.project && (
                    <div className="flex items-center justify-between">
                      <span className="text-(--text-muted) text-xs">{t("linkedProject")}</span>
                      <span className="font-medium text-(--text-primary)">{task.project.name}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-(--text-muted) text-xs">{t("assignee")}</span>
                    <Select
                      value={task.assignee_id ?? "none"}
                      onValueChange={(v) => save({ assignee_id: v === "none" ? null : v })}
                    >
                      <SelectTrigger className="h-7 w-36 text-xs">
                        <SelectValue placeholder="Unassigned" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Unassigned</SelectItem>
                        {(team ?? []).map((m) => (
                          <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-(--text-muted) text-xs">{t("priority")}</span>
                    <Select
                      value={task.priority}
                      onValueChange={(v) => save({ priority: v as TaskPriority })}
                    >
                      <SelectTrigger className="h-7 w-28 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-(--text-muted) text-xs">{t("dueDate")}</span>
                    <DatePicker
                      value={task.due_date ?? ""}
                      onChange={(d) => save({ due_date: d ?? null })}
                      placeholder="No due date"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted) mb-2">{t("description")}</p>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => description !== (task.description ?? "") && save({ description })}
                    rows={4}
                    placeholder="Add a description..."
                    className="resize-none"
                  />
                </div>

                {/* Timestamps */}
                <p className="text-[10px] text-(--text-muted)">
                  Updated {formatRelativeTime(task.updated_at)}
                </p>
              </div>

              {/* Footer */}
              <div className="border-t border-(--border) px-5 py-3 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-(--danger) hover:text-(--danger) hover:bg-(--danger-subtle)"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 className="h-4 w-4 me-1.5" /> {t("archive")}
                </Button>
                <Button size="sm" variant="secondary" onClick={onClose}>Close</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={task?.title}
        onConfirm={handleDelete}
        loading={deleteTask.isPending}
      />
    </>
  );
}
