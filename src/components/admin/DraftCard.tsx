import { useState } from "react";
import type { ContentItem, ContentStatus } from "@/types";
import { updateContentStatus } from "@/api/admin";

interface Props {
  item: ContentItem;
  onUpdate: (updated: ContentItem) => void;
}

export default function DraftCard({ item, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);
  const [loading, setLoading] = useState(false);

  const date = new Date(item.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  async function handleAction(status: ContentStatus) {
    setLoading(true);
    try {
      const updated = await updateContentStatus(
        item.id,
        status,
        editing ? editedContent : undefined
      );
      onUpdate(updated);
    } finally {
      setLoading(false);
      setEditing(false);
    }
  }

  return (
    <div className="py-6 border-b border-neutral-800">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-sm font-semibold text-white leading-snug flex-1 mr-4">
          {item.query}
        </h3>
        <p className="text-xs text-neutral-600 shrink-0">{date}</p>
      </div>

      {editing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={5}
          className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-neutral-300 resize-none outline-none focus:border-neutral-500 transition-colors mt-1"
        />
      ) : (
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3 mt-1">
          {item.content}
        </p>
      )}

      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={() => handleAction("published")}
          disabled={loading}
          className="text-xs font-semibold text-green-400 hover:text-green-300 disabled:opacity-40 transition-colors uppercase tracking-wide"
        >
          Publish
        </button>
        <button
          onClick={() => handleAction("rejected")}
          disabled={loading}
          className="text-xs font-semibold text-red-500 hover:text-red-400 disabled:opacity-40 transition-colors uppercase tracking-wide"
        >
          Reject
        </button>
        <button
          onClick={() => setEditing((e) => !e)}
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors ml-auto"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>
    </div>
  );
}
