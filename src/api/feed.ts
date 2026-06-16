import type { ContentItem } from "@/types";
import { apiRequest } from "./client";

export async function getFeed(): Promise<ContentItem[]> {
  return apiRequest<ContentItem[]>("/feed", { requiresAuth: true });
}
