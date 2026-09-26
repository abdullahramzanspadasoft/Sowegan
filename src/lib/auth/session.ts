import type { AuthSession, AuthUser } from "./types";

const SESSION_KEY = "sowegan.auth.session";

function storage(remember: boolean) {
  return remember ? window.localStorage : window.sessionStorage;
}

function clearBoth() {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function writeSession(user: AuthUser, remember: boolean) {
  const session: AuthSession = {
    user,
    createdAt: new Date().toISOString(),
  };
  clearBoth();
  storage(remember).setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw =
    window.sessionStorage.getItem(SESSION_KEY) ?? window.localStorage.getItem(SESSION_KEY);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.user?.email || !parsed?.user?.id) {
      clearBoth();
      return null;
    }
    return parsed;
  } catch {
    clearBoth();
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  clearBoth();
}
