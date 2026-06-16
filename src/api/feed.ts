import type { ContentItem } from "@/types";
import { mockContents } from "@/api/mock/contents";

const USE_MOCK = true;

export async function getFeed(): Promise<ContentItem[]> {
  if (USE_MOCK) {
    return mockContents.filter((c) => c.status === "published");
  }

  const { apiRequest } = await import("./client");
  return apiRequest<ContentItem[]>("/feed");
}
