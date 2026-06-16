import type { ContentItem } from "@/types";

interface Props {
  item: ContentItem;
  onClose: () => void;
}

export default function ContentDetail({ item, onClose }: Props) {
  const date = new Date(item.created_at).toLocaleDateString("tr-TR", {
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
          ← Kapat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl px-8 pt-10 pb-16">
          <h1 className="text-4xl font-black text-white leading-tight mb-8">
            {item.query}
          </h1>
          <p className="text-neutral-400 text-base leading-loose whitespace-pre-line">
            {item.content}
          </p>

          {item.sources.length > 0 && (
            <div className="mt-12 pt-6 border-t border-neutral-800">
              <p className="text-xs text-neutral-600 uppercase tracking-widest mb-2">
                Kaynaklar
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
