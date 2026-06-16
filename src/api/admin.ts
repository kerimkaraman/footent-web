import type { ContentItem, ContentStatus } from "@/types";
import { apiRequest } from "./client";

export async function getDraftContents(): Promise<ContentItem[]> {
  return apiRequest<ContentItem[]>("/admin/content?status=draft", {
    requiresAuth: true,
  });
}

export async function updateContentStatus(
  id: string,
  status: ContentStatus,
  content?: string
): Promise<ContentItem> {
  return apiRequest<ContentItem>(`/admin/content/${id}`, {
    method: "PATCH",
    body: { status, ...(content !== undefined ? { content } : {}) },
    requiresAuth: true,
  });
}
