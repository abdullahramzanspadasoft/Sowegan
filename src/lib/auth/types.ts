export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthSession = {
  user: AuthUser;
  createdAt: string;
};

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string };

export type AuthProvider = {
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  register?: (input: {
    name: string;
    email: string;
    password: string;
  }) => Promise<AuthResult>;
};
