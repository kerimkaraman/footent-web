const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function getAdminKey(): string | null {
  return localStorage.getItem("admin_key");
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  requiresAuth?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, requiresAuth = false } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    const key = getAdminKey();
    if (!key) {
      throw new Error("NO_AUTH_KEY");
    }
    headers["X-Admin-Key"] = key;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error(`API_ERROR:${response.status}`);
  }

  return response.json() as Promise<T>;
}
