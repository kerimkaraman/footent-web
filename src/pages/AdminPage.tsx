import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { ContentItem } from "@/types";
import { getDraftContents } from "@/api/admin";
import { useAuth } from "@/hooks/useAuth";
import DraftCard from "@/components/admin/DraftCard";

export default function AdminPage() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    getDraftContents()
      .then(setDrafts)
      .catch((err: Error) => {
        if (err.message === "UNAUTHORIZED" || err.message === "NO_AUTH_KEY") {
          navigate("/login");
        } else {
          setError("Failed to load content.");
        }
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn, navigate]);

  function handleUpdate(updated: ContentItem) {
    setDrafts((prev) => prev.filter((d) => d.id !== updated.id));
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="px-8 pt-8 pb-6 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-sky-500 rounded-sm" />
            <h1 className="text-3xl font-black tracking-tight text-white">
              FOOT<span className="text-sky-400">ENT</span>
            </h1>
          </div>
          <span className="text-neutral-800">|</span>
          <Link
            to="/"
            className="text-xs text-sky-700 hover:text-sky-400 transition-colors uppercase tracking-widest font-semibold"
          >
            Feed
          </Link>
        </div>

        <div className="flex items-center gap-5">
          {!loading && (
            <span className="text-xs font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-1 rounded-sm">
              {drafts.length} pending
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-xs text-neutral-600 hover:text-red-400 transition-colors uppercase tracking-wider"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="border-t-2 border-sky-900 pt-6">
          <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase mb-6">
            Pending Drafts
          </h2>

          {loading && (
            <div className="grid grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-32 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-5 w-2/3 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-neutral-500 text-sm">{error}</p>
          )}

          {!loading && !error && drafts.length === 0 && (
            <p className="text-neutral-600 text-sm">No pending drafts.</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-2 gap-x-12">
              {drafts.map((item) => (
                <DraftCard key={item.id} item={item} onUpdate={handleUpdate} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
