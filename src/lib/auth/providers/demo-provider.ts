import type { AuthProvider, AuthResult, LoginCredentials } from "../types";
import { DEMO_EMAIL, DEMO_PASSWORD, DEMO_USER, normalizeEmail } from "../constants";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const demoAuthProvider: AuthProvider = {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    await wait(700);

    const emailMatches =
      normalizeEmail(credentials.email) === normalizeEmail(DEMO_EMAIL);
    const passwordMatches =
      credentials.password.trim() === DEMO_PASSWORD;

    if (emailMatches && passwordMatches) {
      return { ok: true, user: DEMO_USER };
    }

    return { ok: false, error: "Invalid email or password." };
  },
};
