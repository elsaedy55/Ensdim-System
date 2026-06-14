"use client";

import * as tus from "tus-js-client";
import { createClient } from "@/lib/supabase/client";
import { createFileRecord } from "@/lib/services/files.service";
import { addQueueItem, getQueueItems, removeQueueItem, type QueueItem } from "./queue-db";

export interface UploadItemState {
  id: string;
  projectId: string;
  category: string;
  fileName: string;
  fileSize: number;
  loaded: number;
  status: "queued" | "uploading" | "error";
}

export interface UploadEvent {
  type: "success" | "error";
  fileName: string;
  projectId: string;
  error?: string;
}

type Listener = (items: UploadItemState[]) => void;
type EventListener = (event: UploadEvent) => void;

const listeners = new Set<Listener>();
const eventListeners = new Set<EventListener>();
const state = new Map<string, UploadItemState>();

let processing = false;
let initialized = false;
let currentUpload: tus.Upload | null = null;

function notify() {
  const items = Array.from(state.values());
  listeners.forEach((l) => l(items));
}

function emitEvent(event: UploadEvent) {
  eventListeners.forEach((l) => l(event));
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  listener(Array.from(state.values()));
  if (!initialized) {
    initialized = true;
    void resumePending();
  }
  return () => listeners.delete(listener);
}

export function subscribeEvents(listener: EventListener): () => void {
  eventListeners.add(listener);
  return () => eventListeners.delete(listener);
}

export async function enqueueUploads(projectId: string, category: string, files: File[]): Promise<void> {
  for (const file of files) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const storagePath = `${projectId}/${Date.now()}-${file.name}`;
    await addQueueItem({ id, projectId, category, file, storagePath, createdAt: Date.now() });
    state.set(id, {
      id, projectId, category,
      fileName: file.name, fileSize: file.size,
      loaded: 0, status: "queued",
    });
  }
  notify();
  void processQueue();
}

export function cancelUpload(id: string): void {
  if (currentUpload && state.get(id)?.status === "uploading") {
    currentUpload.abort(true);
  }
  state.delete(id);
  void removeQueueItem(id);
  notify();
}

async function resumePending(): Promise<void> {
  const items = await getQueueItems();
  for (const item of items) {
    state.set(item.id, {
      id: item.id, projectId: item.projectId, category: item.category,
      fileName: item.file.name, fileSize: item.file.size,
      loaded: 0, status: "queued",
    });
  }
  notify();
  void processQueue();
}

async function processQueue(): Promise<void> {
  if (processing) return;
  processing = true;
  try {
    while (true) {
      const items = await getQueueItems();
      const item = items[0];
      if (!item) break;

      const s = state.get(item.id);
      if (s) { s.status = "uploading"; notify(); }

      try {
        await uploadOne(item);
        if (state.has(item.id)) {
          emitEvent({ type: "success", fileName: item.file.name, projectId: item.projectId });
        }
      } catch (err) {
        if (state.has(item.id)) {
          emitEvent({
            type: "error",
            fileName: item.file.name,
            projectId: item.projectId,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }

      await removeQueueItem(item.id);
      state.delete(item.id);
      currentUpload = null;
      notify();
    }
  } finally {
    processing = false;
  }
}

async function uploadOne(item: QueueItem): Promise<void> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const storagePath = item.storagePath;

  await new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(item.file, {
      endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 1000, 3000, 5000],
      chunkSize: 6 * 1024 * 1024, // required by Supabase resumable uploads
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      headers: {
        authorization: `Bearer ${session.access_token}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        "x-upsert": "false",
      },
      metadata: {
        bucketName: "project-files",
        objectName: storagePath,
        contentType: item.file.type || "application/octet-stream",
        cacheControl: "3600",
      },
      onError: reject,
      onProgress: (loaded) => {
        const s = state.get(item.id);
        if (s) { s.loaded = loaded; notify(); }
      },
      onSuccess: () => resolve(),
    });

    currentUpload = upload;
    void upload.findPreviousUploads().then((prev) => {
      if (prev.length > 0) upload.resumeFromPreviousUpload(prev[0]);
      upload.start();
    });
  });

  await createFileRecord({
    projectId: item.projectId,
    name: item.file.name,
    storagePath,
    size: item.file.size,
    mimeType: item.file.type,
    category: item.category,
  });
}
