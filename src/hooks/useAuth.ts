import { useState } from "react";

const STORAGE_KEY = "admin_key";

export function useAuth() {
  const [key, setKey] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY)
  );

  function login(adminKey: string) {
    localStorage.setItem(STORAGE_KEY, adminKey);
    setKey(adminKey);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setKey(null);
  }

  return { key, isLoggedIn: key !== null, login, logout };
}
