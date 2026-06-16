import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [inputKey, setInputKey] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!inputKey.trim()) return;
    login(inputKey.trim());
    navigate("/admin");
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
          Admin Girişi
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full bg-neutral-900 border border-neutral-700 focus:border-sky-600 outline-none px-4 py-3 text-white text-sm placeholder-neutral-700 transition-colors rounded-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 py-3 transition-colors rounded-sm tracking-wide"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
