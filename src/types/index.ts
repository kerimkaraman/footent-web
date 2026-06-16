export type DocType = "match_result" | "stats" | "news" | "transfer" | "injury" | "lineup";

export type ContentStatus = "draft" | "approved" | "published" | "rejected";

export interface ContentItem {
  id: string;
  query: string;
  content: string;
  sources: string[];
  status: ContentStatus;
  created_at: string;
  updated_at: string | null;
}
