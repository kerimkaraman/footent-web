import type { ContentItem } from "@/types";

interface Props {
  item: ContentItem;
  index?: number;
  onClick: () => void;
  featured?: boolean;
}

export default function ContentCard({ item, index, onClick, featured }: Props) {
  const date = new Date(item.created_at).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });

  if (featured) {
    return (
      <button onClick={onClick} className="w-full text-left group pb-2">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
            Öne Çıkan
          </span>
          <span className="h-px flex-1 bg-sky-900" />
          <span className="text-xs text-neutral-600">{date}</span>
        </div>
        <h2 className="text-4xl font-black leading-tight text-white group-hover:text-sky-300 transition-colors duration-150 mb-5">
          {item.query}
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed border-l-2 border-sky-800 pl-4">
          {item.content}
        </p>
        {item.sources.length > 0 && (
          <p className="mt-5 text-xs text-neutral-600">
            {item.sources.join(" · ")}
          </p>
        )}
      </button>
    );
  }

  const num = String((index ?? 0) + 1).padStart(2, "0");

  return (
    <button
      onClick={onClick}
      className="w-full text-left group py-4 border-b border-neutral-800/60 flex gap-3 items-start hover:bg-neutral-900/50 -mx-3 px-3 transition-colors"
    >
      <span className="text-lg font-black text-neutral-800 group-hover:text-sky-700 transition-colors shrink-0 leading-none pt-0.5">
        {num}
      </span>
      <div className="flex-1 min-w-0">
        <h2 className="text-xs font-semibold text-neutral-300 group-hover:text-sky-300 transition-colors leading-snug mb-1">
          {item.query}
        </h2>
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
          {item.content}
        </p>
        <p className="text-xs text-neutral-700 mt-1.5">{date}</p>
      </div>
    </button>
  );
}
