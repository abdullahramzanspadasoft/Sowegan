"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { isValidEmail } from "@/lib/utils";
import { authClient, DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/auth";
import { AppleIcon, GoogleIcon } from "@/components/icons/BrandIcons";
import { getRegion, getRegionLabel, getRegionOption } from "@/lib/preferences";
import { Flag } from "@/components/ui/Flag";

export default function LoginPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [regionLabel, setRegionLabel] = useState<string | null>(null);
  const [regionCode, setRegionCode] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "info">("idle");

  useEffect(() => {
    const region = getRegion();
    if (!region) {
      router.replace("/region?next=login");
      return;
    }
    setRegionLabel(getRegionLabel());
    setRegionCode(getRegionOption()?.code ?? region);
    setReady(true);
  }, [router]);

  function validate(nextEmail: string, nextPassword: string) {
    const next: Record<string, string> = {};
    if (!isValidEmail(nextEmail)) next.email = "Enter a valid email address.";
    if (!nextPassword) next.password = "Enter your password.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");

    // Read from the form so browser autofill values are included
    const formData = new FormData(event.currentTarget);
    const nextEmail = String(formData.get("email") ?? email).trim();
    const nextPassword = String(formData.get("password") ?? password);
    setEmail(nextEmail);
    setPassword(nextPassword);

    if (!validate(nextEmail, nextPassword)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const result = await authClient.login(
      { email: nextEmail, password: nextPassword },
      { remember },
    );

    if (!result.ok) {
      setAuthError(result.error);
      setStatus("error");
      return;
    }

    setStatus("success");
    router.push("/start-trading");
  }

  function useDemoAccount() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setAuthError("");
    setErrors({});
    setStatus("idle");
  }

  if (!ready) {
    return (
      <AuthShell title="Welcome back" subtitle="Checking your region selection...">
        <div className="h-40 animate-pulse rounded-2xl bg-surface-muted" />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to your Sowegan workspace to review markets, balances, and account activity."
    >
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        {regionLabel && regionCode && (
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm">
            <span className="inline-flex items-center gap-2.5 text-muted">
              <Flag code={regionCode} name={regionLabel} size="sm" />
              Region: <span className="font-medium text-text">{regionLabel}</span>
            </span>
            <Link href="/region?next=login" className="font-semibold text-accent hover:text-accent-hover">
              Change
            </Link>
          </div>
        )}
        {status === "error" && authError && (
          <Alert tone="error" title="Unable to log in">
            {authError}
          </Alert>
        )}
        {status === "success" && (
          <Alert tone="success" title="Signed in">
            Opening your trading setup.
          </Alert>
        )}
        {status === "info" && (
          <Alert tone="info" title="Social login is a UI preview">
            Use the demo email and password to enter the Sowegan dashboard.
          </Alert>
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          placeholder="Sowegan123@gmail.com"
          leftIcon={<Mail size={16} />}
          autoComplete="username"
        />
        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="inline-flex items-center gap-2 text-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-border bg-surface-muted text-accent"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-medium text-accent hover:text-accent-hover">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth loading={status === "loading"}>
          Log in
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="secondary" fullWidth onClick={() => setStatus("info")}>
            <GoogleIcon className="h-[18px] w-[18px] shrink-0" />
            Continue with Google
          </Button>
          <Button type="button" variant="secondary" fullWidth onClick={() => setStatus("info")}>
            <AppleIcon className="h-[18px] w-[18px] shrink-0" />
            Continue with Apple
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-text">Demo account</p>
            <button
              type="button"
              onClick={useDemoAccount}
              className="text-xs font-semibold text-accent hover:text-accent-hover"
            >
              Use demo
            </button>
          </div>
          <p className="mt-1 text-muted">
            Email: <span className="font-medium text-text">{DEMO_EMAIL}</span>
          </p>
          <p className="text-muted">
            Password: <span className="font-medium text-text">{DEMO_PASSWORD}</span>
          </p>
        </div>
        <p className="text-center text-sm text-muted">
          New to Sowegan?{" "}
          <Link href="/region?next=signup" className="font-semibold text-accent hover:text-accent-hover">
            Register
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
