import { useState } from "react";

const STORAGE_KEY = "admin_key";

export function useAuth() {
  const [key, setKey] = useState<string | null>(() =>
    sessionStorage.getItem(STORAGE_KEY)
  );

  function login(adminKey: string) {
    sessionStorage.setItem(STORAGE_KEY, adminKey);
    setKey(adminKey);
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setKey(null);
  }

  return { key, isLoggedIn: key !== null, login, logout };
}
