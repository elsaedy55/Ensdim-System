"use client";

import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { subscribe, type UploadItemState } from "@/lib/upload/manager";

export function useUploadQueue(projectId: string): UploadItemState[] {
  const qc = useQueryClient();
  const [items, setItems] = React.useState<UploadItemState[]>([]);
  const prevIdsRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    return subscribe((all) => {
      const filtered = all.filter((i) => i.projectId === projectId);
      const ids = new Set(filtered.map((i) => i.id));
      const finished = [...prevIdsRef.current].some((id) => !ids.has(id));
      if (finished) qc.invalidateQueries({ queryKey: ["files", projectId] });
      prevIdsRef.current = ids;
      setItems(filtered);
    });
  }, [projectId, qc]);

  return items;
}
