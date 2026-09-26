import type { AuthProvider, AuthResult, AuthUser, LoginCredentials } from "../types";
import { normalizeEmail } from "../constants";

const USERS_KEY = "sowegan.users.v1";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nameFromEmail(email: string) {
  const local = email.split("@")[0] || "trader";
  const cleaned = local.replace(/[._+-]+/g, " ").trim();
  if (!cleaned) return "Sowegan Trader";
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toAuthUser(user: Pick<StoredUser, "id" | "name" | "email">): AuthUser {
  return { id: user.id, name: user.name, email: user.email };
}

/** Frontend-only auth: any valid email + password signs in */
export const demoAuthProvider: AuthProvider = {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    await wait(500);

    const email = normalizeEmail(credentials.email);
    const password = credentials.password.trim();

    if (!email || !email.includes("@")) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (password.length < 4) {
      return { ok: false, error: "Password must be at least 4 characters." };
    }

    const users = readUsers();
    const existing = users.find((u) => normalizeEmail(u.email) === email);

    if (existing) {
      if (existing.password !== password) {
        return { ok: false, error: "Incorrect password for this account." };
      }
      return { ok: true, user: toAuthUser(existing) };
    }

    // New frontend user — accept any email/password and remember them
    const user: StoredUser = {
      id: `user-${Date.now()}`,
      name: nameFromEmail(email),
      email,
      password,
    };
    writeUsers([...users, user]);
    return { ok: true, user: toAuthUser(user) };
  },

  async register(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResult> {
    await wait(500);
    const email = normalizeEmail(input.email);
    const password = input.password.trim();
    const name = input.name.trim() || nameFromEmail(email);

    if (!email || !email.includes("@")) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (password.length < 4) {
      return { ok: false, error: "Password must be at least 4 characters." };
    }

    const users = readUsers();
    if (users.some((u) => normalizeEmail(u.email) === email)) {
      return { ok: false, error: "An account with this email already exists. Please log in." };
    }

    const user: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
    };
    writeUsers([...users, user]);
    return { ok: true, user: toAuthUser(user) };
  },
};
