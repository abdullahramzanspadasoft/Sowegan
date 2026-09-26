import type { AuthUser } from "./types";

export const DEMO_EMAIL = "Sowegan123@gmail.com";
export const DEMO_PASSWORD = "Sowegan123";

export const DEMO_USER: AuthUser = {
  id: "demo-user",
  name: "Sowegan Demo",
  email: DEMO_EMAIL,
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
