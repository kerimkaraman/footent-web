import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export default function LoginPage() {
  const [inputKey, setInputKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    const trimmed = inputKey.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      // Validate the key against the server before persisting it — prevents storing
      // an invalid key that would silently fail on every subsequent admin request.
      const res = await fetch(`${BASE_URL}/admin/content?limit=1`, {
        headers: { "X-Admin-Key": trimmed, "Content-Type": "application/json" },
      });

      if (res.ok) {
        login(trimmed);
        navigate("/admin");
      } else if (res.status === 403) {
        setError("Invalid API key.");
      } else {
        setError("Unable to connect to server.");
      }
    } catch {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-5 bg-sky-500 rounded-sm" />
          <h1 className="text-4xl font-black tracking-tight text-white">
            FOOT<span className="text-sky-400">ENT</span>
          </h1>
        </div>
        <p className="text-xs text-neutral-600 tracking-widest uppercase mb-10 ml-4">
          Admin Login
        </p>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
          <div>
            <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">
              Admin Key
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="••••••••••"
              autoFocus
              disabled={loading}
              className="w-full bg-neutral-900 border border-neutral-700 focus:border-sky-600 outline-none px-4 py-3 text-white text-sm placeholder-neutral-700 transition-colors rounded-sm disabled:opacity-50"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 py-3 transition-colors rounded-sm tracking-wide"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
