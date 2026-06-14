"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/Header/header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUploadModal } from "@/components/common/modals/FileUploadModal";
import { ConfirmDeleteDialog } from "@/components/common/modals/ConfirmDeleteDialog";
import { ROUTES } from "@/constants/routes";
import { formatDate, formatCurrency, cn } from "@/lib/utils";
import {
  ChevronLeft, Plus, Pencil, Trash2, Check, X,
  Flag, Upload, CheckCircle2, AlertTriangle, Clock,
  FileText, MessageSquare, DollarSign, Users, Activity,
  Settings, Send, CreditCard, KeyRound, Download,
} from "lucide-react";
import {
  useAdminProjects, useAdminUpdateProject, useAdminDeleteProject,
  useAdminCreateMilestone, useAdminUpdateMilestone, useAdminDeleteMilestone, useAdminSetMilestoneStatus,
  useAdminProjectMembers, useAdminTeam, useAdminAddProjectMember, useAdminRemoveProjectMember,
  useAdminProjectInvoices, useAdminCreateInvoice, useAdminSendInvoice, useAdminMarkInvoicePaid,
} from "@/hooks/useAdmin";
import { useMilestones } from "@/hooks/useMilestones";
import { useFiles, useUploadFile, useCreateCredential, useDeleteFile } from "@/hooks/useFiles";
import { getSignedDownloadUrl } from "@/lib/services/files.service";
import { useUploadQueue } from "@/hooks/useUploadQueue";
import { enqueueUploads } from "@/lib/upload/manager";
import { useRevisions, useUpdateRevisionStatus } from "@/hooks/useRevisions";
import type { MilestoneRow, InvoiceRow } from "@/lib/supabase/types";

// ─── Milestone status icon ────────────────────────────────────────

const MILESTONE_ICON: Record<string, React.ReactNode> = {
  pending:     <Clock className="h-4 w-4 text-(--text-muted)" />,
  in_progress: <div className="h-4 w-4 rounded-full border-2 border-(--accent) border-t-transparent animate-spin" />,
  review:      <AlertTriangle className="h-4 w-4 text-(--warning)" />,
  approved:    <CheckCircle2 className="h-4 w-4 text-(--success)" />,
  completed:   <CheckCircle2 className="h-4 w-4 text-(--success)" />,
  delayed:     <AlertTriangle className="h-4 w-4 text-(--danger)" />,
};

// ─── Milestones Tab ───────────────────────────────────────────────

function MilestonesTab({ projectId }: { projectId: string }) {
  const t = useTranslations("admin.milestones");
  const { data: milestones, isLoading } = useMilestones(projectId);
  const createMilestone  = useAdminCreateMilestone();
  const updateMilestone  = useAdminUpdateMilestone();
  const deleteMilestone  = useAdminDeleteMilestone();
  const setStatus        = useAdminSetMilestoneStatus();
  const uploadFile       = useUploadFile();

  const [adding, setAdding]      = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [deleteId, setDeleteId]   = React.useState<string | null>(null);
  const [uploadMilestoneId, setUploadMilestoneId] = React.useState<string | null>(null);

  const [newForm, setNewForm] = React.useState({ name: "", description: "", due_date: "", start_date: "" });
  const [editForm, setEditForm] = React.useState<Partial<MilestoneRow>>({});

  const handleAdd = () => {
    if (!newForm.name || !newForm.due_date) { toast.error("Name and due date are required"); return; }
    createMilestone.mutate(
      { project_id: projectId, name: newForm.name, description: newForm.description, due_date: newForm.due_date, start_date: newForm.start_date || undefined },
      {
        onSuccess: () => { toast.success(t("saved")); setAdding(false); setNewForm({ name: "", description: "", due_date: "", start_date: "" }); },
        onError:   (e) => toast.error(e.message),
      }
    );
  };

  const handleEdit = (m: MilestoneRow) => {
    setEditingId(m.id);
    setEditForm({ name: m.name, description: m.description ?? "", due_date: m.due_date });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    updateMilestone.mutate(
      { id: editingId, updates: editForm },
      {
        onSuccess: () => { toast.success(t("saved")); setEditingId(null); },
        onError:   (e) => toast.error(e.message),
      }
    );
  };

  const handleMarkReady = (id: string) => {
    setStatus.mutate(
      { id, status: "review" },
      {
        onSuccess: () => toast.success(t("markedReady")),
        onError:   (e) => toast.error(e.message),
      }
    );
  };

  const handleStatusChange = (id: string, status: string) => {
    setStatus.mutate({ id, status }, {
      onSuccess: () => toast.success("Status updated"),
      onError:   (e) => toast.error(e.message),
    });
  };

  const handleUpload = async (file: File) => {
    if (!uploadMilestoneId) return;
    await uploadFile.mutateAsync({ projectId, milestoneId: uploadMilestoneId, file, category: "general" });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> {t("addMilestone")}
        </Button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="surface p-5 space-y-4 border-(--accent-muted)">
          <p className="text-sm font-semibold text-(--text-primary)">{t("addMilestone")}</p>
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t("fields.name")} required htmlFor="m-name">
              <Input id="m-name" placeholder={t("fields.namePlaceholder")} value={newForm.name} onChange={(e) => setNewForm((p) => ({ ...p, name: e.target.value }))} />
            </FormField>
            <FormField label={t("fields.dueDate")} required htmlFor="m-due">
              <DatePicker value={newForm.due_date} onChange={(d) => setNewForm((p) => ({ ...p, due_date: d ?? "" }))} placeholder="Pick due date" />
            </FormField>
          </div>
          <FormField label={t("fields.description")} htmlFor="m-desc">
            <Textarea id="m-desc" rows={2} value={newForm.description} onChange={(e) => setNewForm((p) => ({ ...p, description: e.target.value }))} />
          </FormField>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setAdding(false)}><X className="h-4 w-4" /></Button>
            <Button size="sm" onClick={handleAdd} loading={createMilestone.isPending}><Check className="h-4 w-4" /> Add</Button>
          </div>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-(--bg-muted) rounded-xl animate-pulse" />)}</div>
      ) : (milestones ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-12 text-center">
          <Flag className="h-8 w-8 text-(--text-muted) mb-2" />
          <p className="text-sm text-(--text-muted)">No milestones yet. Add the first one above.</p>
        </div>
      ) : (
        (milestones ?? []).map((m) => (
          <div key={m.id} className={cn("surface p-4 space-y-3", m.status === "review" && "border-(--warning-muted)")}>
            {editingId === m.id ? (
              /* Edit mode */
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input value={editForm.name ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))} />
                  <DatePicker value={editForm.due_date ?? ""} onChange={(d) => setEditForm((p) => ({ ...p, due_date: d ?? "" }))} placeholder="Due date" />
                </div>
                <Textarea rows={2} value={editForm.description ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} />
                <div className="flex gap-2 justify-end">
                  <Button variant="secondary" size="sm" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                  <Button size="sm" onClick={handleSaveEdit} loading={updateMilestone.isPending}><Check className="h-4 w-4" /> Save</Button>
                </div>
              </div>
            ) : (
              /* View mode */
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {MILESTONE_ICON[m.status]}
                    <div>
                      <p className="text-sm font-semibold text-(--text-primary)">{m.name}</p>
                      <p className="text-xs text-(--text-muted)">Due: {formatDate(m.due_date, { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Select value={m.status} onValueChange={(v) => handleStatusChange(m.id, v)}>
                      <SelectTrigger className="h-7 text-xs w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["pending","in_progress","review","approved","completed","delayed"].map((s) => (
                          <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {m.progress > 0 && <Progress value={m.progress} size="xs" colorByValue />}
                <div className="flex items-center gap-2 flex-wrap">
                  {m.status !== "review" && m.status !== "approved" && m.status !== "completed" && (
                    <Button size="sm" variant="secondary" onClick={() => handleMarkReady(m.id)}>
                      <AlertTriangle className="h-3.5 w-3.5" /> {t("markAsReady")}
                    </Button>
                  )}
                  <Button size="sm" variant="secondary" onClick={() => setUploadMilestoneId(m.id)}>
                    <Upload className="h-3.5 w-3.5" /> {t("uploadFiles")}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(m)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteId(m.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-(--danger)" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))
      )}

      <FileUploadModal
        open={!!uploadMilestoneId}
        onOpenChange={(open) => !open && setUploadMilestoneId(null)}
        onUpload={handleUpload}
        maxSize={200 * 1024 * 1024}
        maxFiles={10}
      />

      <ConfirmDeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        itemName={(milestones ?? []).find((m) => m.id === deleteId)?.name}
        onConfirm={() => {
          if (!deleteId) return;
          deleteMilestone.mutate(
            { id: deleteId, projectId },
            { onSuccess: () => { toast.success("Milestone deleted"); setDeleteId(null); }, onError: (e) => toast.error(e.message) }
          );
        }}
        loading={deleteMilestone.isPending}
      />
    </div>
  );
}

// ─── Team Tab ─────────────────────────────────────────────────────

function TeamTab({ projectId }: { projectId: string }) {
  const { data: members, isLoading } = useAdminProjectMembers(projectId);
  const { data: team }               = useAdminTeam();
  const addMember    = useAdminAddProjectMember();
  const removeMember = useAdminRemoveProjectMember();
  const [adding, setAdding] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("");

  const unassigned = (team ?? []).filter((m) => !(members ?? []).some((pm) => pm.id === m.id));

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Member
        </Button>
      </div>

      {adding && (
        <div className="surface p-4 space-y-3 border-(--accent-muted)">
          <Select onValueChange={setSelectedId} value={selectedId}>
            <SelectTrigger><SelectValue placeholder="Select team member" /></SelectTrigger>
            <SelectContent>
              {unassigned.map((m) => (
                <SelectItem key={m.id} value={m.id}>{m.name} — {m.role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
            <Button size="sm" loading={addMember.isPending} onClick={() => {
              if (!selectedId) return;
              addMember.mutate({ projectId, profileId: selectedId }, {
                onSuccess: () => { toast.success("Member added"); setAdding(false); setSelectedId(""); },
                onError:   (e) => toast.error(e.message),
              });
            }}>Add</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-12 bg-(--bg-muted) rounded-xl animate-pulse" />)}</div>
      ) : (members ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-8 w-8 text-(--text-muted) mb-2" />
          <p className="text-sm text-(--text-muted)">No team members assigned yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {(members ?? []).map((m) => (
            <div key={m.id} className="surface flex items-center gap-3 p-3">
              <div className="h-8 w-8 rounded-full bg-(--accent-subtle) flex items-center justify-center text-xs font-semibold text-(--accent)">
                {m.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-(--text-primary)">{m.name}</p>
                <p className="text-xs text-(--text-muted) capitalize">{m.role?.replace("_", " ")}</p>
              </div>
              <Button size="icon-sm" variant="ghost" onClick={() =>
                removeMember.mutate({ projectId, profileId: m.id }, {
                  onSuccess: () => toast.success("Member removed"),
                  onError:   (e) => toast.error(e.message),
                })
              }>
                <X className="h-4 w-4 text-(--danger)" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Files Tab ────────────────────────────────────────────────────

function FilesTab({ projectId }: { projectId: string }) {
  const tFiles = useTranslations("files");
  const { data: files, isLoading } = useFiles(projectId);
  const createCredential = useCreateCredential();
  const deleteFile = useDeleteFile();
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: string; name: string; storagePath: string | null } | null>(null);
  // Subscribed only to trigger a refetch of the file list once an upload for
  // this project finishes (see useUploadQueue) — the visible progress is
  // shown by the global UploadStatusWidget.
  useUploadQueue(projectId);

  const categories = [
    { value: "general",       label: tFiles("tabs.general") },
    { value: "design",        label: tFiles("tabs.design") },
    { value: "development",   label: tFiles("tabs.development") },
    { value: "documentation", label: tFiles("tabs.documentation") },
    { value: "credentials",   label: tFiles("tabs.credentials") },
    { value: "final_delivery", label: tFiles("tabs.final") },
  ];

  const handleCreateCredential = async (data: { name: string; url?: string; email?: string; username?: string; password?: string; notes?: string }) => {
    await createCredential.mutateAsync({
      projectId,
      name: data.name,
      credentialData: { url: data.url, email: data.email, username: data.username, password: data.password, notes: data.notes },
    });
    toast.success("Credential saved");
    setUploadOpen(false);
  };

  const handleDownload = async (f: { id: string; storage_path: string | null }) => {
    if (!f.storage_path) return;
    setDownloadingId(f.id);
    try {
      const url = await getSignedDownloadUrl(f.storage_path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      toast.error(tFiles("downloadError"));
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setUploadOpen(true)}>
          <Upload className="h-4 w-4" /> Upload Files
        </Button>
      </div>

      {isLoading ? (
        <div className="h-20 bg-(--bg-muted) rounded-xl animate-pulse" />
      ) : (files ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-8 w-8 text-(--text-muted) mb-2" />
          <p className="text-sm text-(--text-muted)">No files yet. Upload files to share with the client.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {(files ?? []).map((f) => (
            <div key={f.id} className="surface flex items-center gap-3 p-3">
              {f.credential_data ? (
                <KeyRound className="h-5 w-5 text-(--accent) shrink-0" />
              ) : (
                <FileText className="h-5 w-5 text-(--accent) shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-(--text-primary) truncate">{f.name}</p>
                <p className="text-xs text-(--text-muted)">
                  {f.credential_data ? tFiles("tabs.credentials") : `${((f.size ?? 0) / 1024).toFixed(1)} KB`} · {formatDate(f.created_at, { month: "short", day: "numeric" })}
                </p>
              </div>
              {f.storage_path && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDownload(f)}
                  loading={downloadingId === f.id}
                  title={tFiles("download")}
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setDeleteTarget({ id: f.id, name: f.name, storagePath: f.storage_path })}
                title={tFiles("delete")}
              >
                <Trash2 className="h-4 w-4 text-(--danger)" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <FileUploadModal
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onEnqueue={(files, category) => enqueueUploads(projectId, category, files)}
        onCreateCredential={handleCreateCredential}
        categories={categories}
        maxSize={200 * 1024 * 1024}
        maxFiles={10}
      />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        itemName={deleteTarget?.name}
        loading={deleteFile.isPending}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteFile.mutate(
            { fileId: deleteTarget.id, storagePath: deleteTarget.storagePath, projectId },
            {
              onSuccess: () => { toast.success(tFiles("deleted")); setDeleteTarget(null); },
              onError:   (e) => toast.error(e.message),
            }
          );
        }}
      />
    </div>
  );
}

// ─── Revisions Tab ────────────────────────────────────────────────

function RevisionsTab({ projectId }: { projectId: string }) {
  const { data: revisions, isLoading } = useRevisions(projectId);
  const updateStatus = useUpdateRevisionStatus();
  const [respondingId, setRespondingId] = React.useState<string | null>(null);
  const [response, setResponse] = React.useState("");

  const handleRespond = (revisionId: string) => {
    updateStatus.mutate(
      { id: revisionId, status: "in_progress", teamResponse: response },
      {
        onSuccess: () => { toast.success("Response sent"); setRespondingId(null); setResponse(""); },
        onError:   (e) => toast.error(e.message),
      }
    );
  };

  if (isLoading) return <div className="h-20 bg-(--bg-muted) rounded-xl animate-pulse" />;

  return (
    <div className="space-y-3">
      {(revisions ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-12 text-center">
          <MessageSquare className="h-8 w-8 text-(--text-muted) mb-2" />
          <p className="text-sm text-(--text-muted)">No revision requests yet.</p>
        </div>
      ) : (
        (revisions ?? []).map((r) => (
          <div key={r.id} className="surface p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-(--text-primary)">{r.title}</p>
                <p className="text-xs text-(--text-muted) mt-0.5">{r.category} · {r.priority} priority</p>
                <p className="text-sm text-(--text-secondary) mt-2 line-clamp-2">{r.description}</p>
              </div>
              <div className="shrink-0">
                <Select value={r.status} onValueChange={(v) =>
                  updateStatus.mutate({ id: r.id, status: v as any }, {
                    onSuccess: () => toast.success("Status updated"),
                    onError:   (e) => toast.error(e.message),
                  })
                }>
                  <SelectTrigger className="h-7 text-xs w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["open","in_review","in_progress","done","rejected"].map((s) => (
                      <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {r.team_response && (
              <div className="rounded-lg bg-(--accent-subtle) px-3 py-2 text-sm text-(--text-secondary)">
                <span className="font-medium text-(--text-primary)">Team response: </span>
                {r.team_response}
              </div>
            )}
            {respondingId === r.id ? (
              <div className="space-y-2">
                <Textarea rows={2} value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Write your response..." />
                <div className="flex gap-2 justify-end">
                  <Button variant="secondary" size="sm" onClick={() => setRespondingId(null)}>Cancel</Button>
                  <Button size="sm" loading={updateStatus.isPending} onClick={() => handleRespond(r.id)}>
                    <Send className="h-3.5 w-3.5" /> Send
                  </Button>
                </div>
              </div>
            ) : (
              <Button size="sm" variant="secondary" onClick={() => { setRespondingId(r.id); setResponse(r.team_response ?? ""); }}>
                <MessageSquare className="h-3.5 w-3.5" /> {r.team_response ? "Edit Response" : "Respond"}
              </Button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ─── Invoices Tab ─────────────────────────────────────────────────

function InvoicesTab({ projectId, clientId }: { projectId: string; clientId: string }) {
  const t = useTranslations("admin.invoices");
  const { data: invoices, isLoading } = useAdminProjectInvoices(projectId);
  const createInvoice = useAdminCreateInvoice();
  const sendInvoice   = useAdminSendInvoice();
  const markPaid      = useAdminMarkInvoicePaid();

  const [creating, setCreating] = React.useState(false);
  const [lineItems, setLineItems] = React.useState([{ description: "", quantity: 1, unit_price: 0 }]);
  const [invForm, setInvForm]     = React.useState({ issue_date: "", due_date: "", notes: "" });

  const subtotal = lineItems.reduce((s, i) => s + i.quantity * i.unit_price, 0);

  const handleCreate = () => {
    if (!invForm.issue_date || !invForm.due_date) { toast.error("Issue and due dates are required"); return; }
    const nextNum = `INV-${String((invoices ?? []).length + 1).padStart(3, "0")}`;
    createInvoice.mutate(
      {
        project_id: projectId,
        client_id:  clientId,
        invoice_number: nextNum,
        issue_date: invForm.issue_date,
        due_date:   invForm.due_date,
        notes:      invForm.notes,
        line_items: lineItems.filter((i) => i.description && i.unit_price > 0),
      },
      {
        onSuccess: () => { toast.success(t("create.success")); setCreating(false); },
        onError:   (e) => toast.error(e.message),
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" /> {t("create.title")}
        </Button>
      </div>

      {creating && (
        <div className="surface p-5 space-y-4 border-(--accent-muted)">
          <p className="text-sm font-semibold text-(--text-primary)">{t("create.title")}</p>
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t("create.fields.issueDate")} required htmlFor="issue">
              <DatePicker value={invForm.issue_date} onChange={(d) => setInvForm((p) => ({ ...p, issue_date: d ?? "" }))} placeholder="Issue date" />
            </FormField>
            <FormField label={t("create.fields.dueDate")} required htmlFor="due">
              <DatePicker value={invForm.due_date} onChange={(d) => setInvForm((p) => ({ ...p, due_date: d ?? "" }))} placeholder="Due date" />
            </FormField>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{t("create.lineItems.title")}</p>
          {lineItems.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-6">
                <Input placeholder={t("create.lineItems.description")} value={item.description} onChange={(e) => {
                  const next = [...lineItems]; next[i] = { ...next[i], description: e.target.value }; setLineItems(next);
                }} />
              </div>
              <div className="col-span-2">
                <Input type="number" min="1" placeholder="Qty" value={item.quantity} onChange={(e) => {
                  const next = [...lineItems]; next[i] = { ...next[i], quantity: Number(e.target.value) }; setLineItems(next);
                }} />
              </div>
              <div className="col-span-3">
                <Input type="number" min="0" placeholder="Price" value={item.unit_price} onChange={(e) => {
                  const next = [...lineItems]; next[i] = { ...next[i], unit_price: Number(e.target.value) }; setLineItems(next);
                }} />
              </div>
              <div className="col-span-1 flex justify-center">
                <Button size="icon-sm" variant="ghost" onClick={() => setLineItems(lineItems.filter((_, j) => j !== i))}>
                  <X className="h-3.5 w-3.5 text-(--danger)" />
                </Button>
              </div>
            </div>
          ))}
          <Button size="sm" variant="secondary" onClick={() => setLineItems([...lineItems, { description: "", quantity: 1, unit_price: 0 }])}>
            <Plus className="h-4 w-4" /> {t("create.lineItems.addLine")}
          </Button>

          <div className="border-t border-(--border) pt-3 text-sm text-end">
            <p className="text-(--text-secondary)">{t("create.totals.subtotal")}: <span className="font-semibold text-(--text-primary)">{formatCurrency(subtotal)}</span></p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setCreating(false)}>Cancel</Button>
            <Button size="sm" loading={createInvoice.isPending} onClick={handleCreate}>
              <Check className="h-4 w-4" /> {t("create.actions.saveDraft")}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="h-20 bg-(--bg-muted) rounded-xl animate-pulse" />
      ) : (invoices ?? []).length === 0 ? (
        <div className="surface flex flex-col items-center justify-center py-12 text-center">
          <DollarSign className="h-8 w-8 text-(--text-muted) mb-2" />
          <p className="text-sm text-(--text-muted)">No invoices yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {(invoices ?? []).map((inv) => (
            <div key={inv.id} className="surface p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-sm font-semibold text-(--text-primary)">{inv.invoice_number}</p>
                  <StatusBadge status={inv.status} />
                </div>
                <p className="text-xs text-(--text-muted)">
                  Due: {formatDate(inv.due_date, { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <p className="text-lg font-bold text-(--text-primary) shrink-0">{formatCurrency(inv.total, inv.currency)}</p>
              <div className="flex items-center gap-2 shrink-0">
                {inv.status === "draft" && (
                  <Button size="sm" loading={sendInvoice.isPending} onClick={() =>
                    sendInvoice.mutate({ id: inv.id, projectId }, {
                      onSuccess: () => toast.success(t("create.sentSuccess")),
                      onError:   (e) => toast.error(e.message),
                    })
                  }>
                    <Send className="h-3.5 w-3.5" /> {t("actions.send")}
                  </Button>
                )}
                {(inv.status === "sent" || inv.status === "viewed") && (
                  <Button size="sm" variant="secondary" loading={markPaid.isPending} onClick={() =>
                    markPaid.mutate({ id: inv.id, projectId }, {
                      onSuccess: () => toast.success(t("paidSuccess")),
                      onError:   (e) => toast.error(e.message),
                    })
                  }>
                    <CreditCard className="h-3.5 w-3.5" /> {t("actions.markPaid")}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations("admin.projects.detail");
  const ta = useTranslations("admin.projects");
  const router = useRouter();

  const { data: projects, isLoading } = useAdminProjects();
  const updateProject = useAdminUpdateProject();
  const deleteProject = useAdminDeleteProject();
  const { data: milestones } = useMilestones(id);

  const project = (projects ?? []).find((p) => p.id === id);
  const sortedMilestones = [...(milestones ?? [])].sort((a, b) => a.order - b.order);

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleDelete = () => {
    deleteProject.mutate(id, {
      onSuccess: () => { toast.success("Project deleted"); router.push(ROUTES.ADMIN.PROJECTS); },
      onError:   (e) => toast.error(e.message),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-(--bg-muted) rounded w-40 animate-pulse" />
        <div className="h-40 bg-(--bg-muted) rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-sm text-(--text-muted)">Project not found.</p>
        <Link href={ROUTES.ADMIN.PROJECTS} className="mt-4 text-sm text-(--accent) hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link href={ROUTES.ADMIN.PROJECTS} className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors">
        <ChevronLeft className="h-4 w-4 rtl:scale-x-[-1]" /> Back to Projects
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-2xl font-bold text-(--text-primary) tracking-tight">{project.name}</h1>
            <StatusBadge status={project.status} size="md" />
          </div>
          {(project as any).client && (
            <p className="text-sm text-(--text-muted)">{(project as any).client.name}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="h-4 w-4" /> {t("actions.delete")}
          </Button>
        </div>
      </div>

      {/* Progress + Health */}
      <div className="surface p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-(--text-primary)">Overall Progress</span>
          <span className="text-lg font-bold text-(--text-primary)">{project.progress}%</span>
        </div>
        <Progress value={project.progress} size="md" colorByValue />
        <div className="mt-3 flex items-center gap-4 text-xs text-(--text-muted) flex-wrap">
          {project.start_date && <span>Started: {formatDate(project.start_date, { month: "short", day: "numeric", year: "numeric" })}</span>}
          {project.target_delivery && <span>Due: {formatDate(project.target_delivery, { month: "short", day: "numeric", year: "numeric" })}</span>}
        </div>
      </div>

      {/* 7 Tabs */}
      <Tabs defaultValue="milestones">
        <TabsList variant="underline" className="w-full overflow-x-auto">
          <TabsTrigger value="overview"   variant="underline"><Activity className="h-3.5 w-3.5 me-1" />{t("tabs.overview")}</TabsTrigger>
          <TabsTrigger value="milestones" variant="underline"><Flag className="h-3.5 w-3.5 me-1" />{t("tabs.milestones")}</TabsTrigger>
          <TabsTrigger value="team"       variant="underline"><Users className="h-3.5 w-3.5 me-1" />{t("tabs.team")}</TabsTrigger>
          <TabsTrigger value="files"      variant="underline"><FileText className="h-3.5 w-3.5 me-1" />{t("tabs.files")}</TabsTrigger>
          <TabsTrigger value="revisions"  variant="underline"><MessageSquare className="h-3.5 w-3.5 me-1" />{t("tabs.revisions")}</TabsTrigger>
          <TabsTrigger value="invoices"   variant="underline"><DollarSign className="h-3.5 w-3.5 me-1" />{t("tabs.invoices")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="surface p-5 space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-(--text-muted) mb-1">Status</p><StatusBadge status={project.status} /></div>
              <div><p className="text-(--text-muted) mb-1">Health</p>
                <span className={cn("font-medium", project.health === "on_track" ? "text-(--success)" : project.health === "at_risk" ? "text-(--warning)" : "text-(--danger)")}>
                  {project.health?.replace("_", " ")}
                </span>
              </div>
            </div>
            {project.description && (
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Description</p>
                <p className="text-sm text-(--text-secondary)">{project.description}</p>
              </div>
            )}
            {/* Quick stage update — driven by this project's milestones */}
            <div>
              <p className="text-xs text-(--text-muted) mb-2">{t("currentStage")}</p>
              {sortedMilestones.length === 0 ? (
                <p className="text-sm text-(--text-muted)">{t("noStagesYet")}</p>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  {sortedMilestones.map((m) => (
                    <Button
                      key={m.id}
                      size="sm"
                      variant={project.current_milestone_id === m.id ? "primary" : "secondary"}
                      onClick={() => updateProject.mutate({ id, updates: { current_milestone_id: m.id } }, {
                        onSuccess: () => toast.success(t("stageUpdated")),
                        onError:   (e) => toast.error(e.message),
                      })}
                    >
                      {m.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="milestones">
          <div className="mt-4"><MilestonesTab projectId={id} /></div>
        </TabsContent>

        <TabsContent value="team">
          <div className="mt-4"><TeamTab projectId={id} /></div>
        </TabsContent>

        <TabsContent value="files">
          <div className="mt-4"><FilesTab projectId={id} /></div>
        </TabsContent>

        <TabsContent value="revisions">
          <div className="mt-4"><RevisionsTab projectId={id} /></div>
        </TabsContent>

        <TabsContent value="invoices">
          <div className="mt-4"><InvoicesTab projectId={id} clientId={project.client_id} /></div>
        </TabsContent>
      </Tabs>

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={project.name}
        onConfirm={handleDelete}
        loading={deleteProject.isPending}
      />
    </div>
  );
}
