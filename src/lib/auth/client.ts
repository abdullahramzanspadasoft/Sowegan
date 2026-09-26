import { demoAuthProvider } from "./providers/demo-provider";
import { clearSession, readSession, writeSession } from "./session";
import type { AuthProvider, AuthResult, AuthSession, LoginCredentials } from "./types";

let provider: AuthProvider = demoAuthProvider;

export function setAuthProvider(next: AuthProvider) {
  provider = next;
}

export const authClient = {
  async login(
    credentials: LoginCredentials,
    options: { remember?: boolean } = {},
  ): Promise<AuthResult> {
    const result = await provider.login(credentials);

    if (result.ok) {
      writeSession(result.user, options.remember ?? true);
    }

    return result;
  },

  async register(
    input: { name: string; email: string; password: string },
    options: { remember?: boolean } = {},
  ): Promise<AuthResult> {
    if (!provider.register) {
      return { ok: false, error: "Registration is not available." };
    }
    const result = await provider.register(input);
    if (result.ok) {
      writeSession(result.user, options.remember ?? true);
    }
    return result;
  },

  logout() {
    clearSession();
  },

  getSession(): AuthSession | null {
    return readSession();
  },
};
