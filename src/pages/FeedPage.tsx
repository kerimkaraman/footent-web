import { useEffect, useState } from "react";
import type { ContentItem } from "@/types";
import { getFeed } from "@/api/feed";
import ContentCard from "@/components/feed/ContentCard";
import ContentDetail from "@/components/feed/ContentDetail";

export default function FeedPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ContentItem | null>(null);

  useEffect(() => {
    getFeed()
      .then(setItems)
      .catch(() => setError("İçerikler yüklenemedi."))
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = items;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="px-8 pt-8 pb-6 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 bg-sky-500 rounded-sm" />
          <h1 className="text-3xl font-black tracking-tight text-white">
            FOOT<span className="text-sky-400">ENT</span>
          </h1>
        </div>
        <p className="text-xs tracking-[0.25em] text-neutral-600 uppercase">
          Futbol · Analiz
        </p>
      </header>

      <main className="px-8 py-8">
        {loading && (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="h-3 w-28 bg-neutral-800 rounded animate-pulse" />
              <div className="h-10 w-4/5 bg-neutral-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-neutral-800 rounded animate-pulse" />
            </div>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-20 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="text-neutral-500 text-sm">{error}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-neutral-600 text-sm">Henüz içerik yayınlanmadı.</p>
        )}

        {!loading && !error && featured && (
          <div className="grid grid-cols-3 gap-0">
            <div className="col-span-2 pr-8 border-r border-neutral-800">
              <ContentCard
                item={featured}
                featured
                onClick={() => setSelected(featured)}
              />
            </div>

            <div className="pl-8">
              {rest.length > 0 && (
                <>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
                      Diğer
                    </span>
                    <span className="h-px flex-1 bg-neutral-800" />
                  </div>
                  <div>
                    {rest.map((item, i) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        index={i}
                        onClick={() => setSelected(item)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {selected && (
        <ContentDetail item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
