import ReactMarkdown from "react-markdown";
import type { ContentItem } from "@/types";

interface Props {
  item: ContentItem;
  onClose: () => void;
}

export default function ContentDetail({ item, onClose }: Props) {
  const date = new Date(item.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-8 py-5 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <span className="w-1 h-4 bg-sky-500 rounded-sm" />
          <p className="text-xs tracking-widest text-sky-400 uppercase font-semibold">
            {date}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          ← Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-12 pt-12 pb-20">
          <h1 className="text-4xl font-black text-white leading-tight mb-8">
            {item.query}
          </h1>
          <div className="prose prose-invert prose-neutral max-w-none text-neutral-400 text-base leading-loose">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>

          {item.sources.length > 0 && (
            <div className="mt-12 pt-6 border-t border-neutral-800">
              <p className="text-xs text-neutral-600 uppercase tracking-widest mb-2">
                Sources
              </p>
              <p className="text-sm text-neutral-500">
                {item.sources.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
