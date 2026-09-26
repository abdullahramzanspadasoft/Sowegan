import type { AuthUser } from "./types";

/** Fallback user shape for profile defaults — login accepts any email/password */
export const DEMO_USER: AuthUser = {
  id: "guest-user",
  name: "Sowegan Trader",
  email: "trader@sowegan.app",
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
