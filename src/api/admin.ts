import type { ContentItem, ContentStatus } from "@/types";
import { mockContents } from "@/api/mock/contents";

const USE_MOCK = true;

const localMock = [...mockContents];

export async function getDraftContents(): Promise<ContentItem[]> {
  if (USE_MOCK) {
    return localMock.filter((c) => c.status === "draft");
  }

  const { apiRequest } = await import("./client");
  return apiRequest<ContentItem[]>("/admin/content?status=draft", {
    requiresAuth: true,
  });
}

export async function updateContentStatus(
  id: string,
  status: ContentStatus,
  content?: string
): Promise<ContentItem> {
  if (USE_MOCK) {
    const item = localMock.find((c) => c.id === id);
    if (!item) throw new Error("NOT_FOUND");
    item.status = status;
    if (content !== undefined) item.content = content;
    item.updated_at = new Date().toISOString();
    return { ...item };
  }

  const { apiRequest } = await import("./client");
  return apiRequest<ContentItem>(`/admin/content/${id}`, {
    method: "PATCH",
    body: { status, ...(content !== undefined ? { content } : {}) },
    requiresAuth: true,
  });
}
