"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/layout/AuthShell";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { PasswordStrength } from "@/components/ui/PasswordStrength";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { isValidEmail } from "@/lib/utils";
import { authClient } from "@/lib/auth";
import { getRegion, getRegionLabel, getRegionOption } from "@/lib/preferences";
import { Flag } from "@/components/ui/Flag";

export default function SignupPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [regionLabel, setRegionLabel] = useState<string | null>(null);
  const [regionCode, setRegionCode] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const region = getRegion();
    if (!region) {
      router.replace("/region?next=signup");
      return;
    }
    setRegionLabel(getRegionLabel());
    setRegionCode(getRegionOption()?.code ?? region);
    setReady(true);
  }, [router]);

  function validate() {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 8) next.password = "Use at least 8 characters.";
    if (form.confirm !== form.password) next.confirm = "Passwords do not match.";
    if (!form.terms) next.terms = "Accept the terms to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const result = await authClient.register({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    if (!result.ok) {
      setErrors({ email: result.error });
      setStatus("error");
      return;
    }
    setStatus("success");
    router.push("/start-trading");
  }

  if (!ready) {
    return (
      <AuthShell title="Create your account" subtitle="Checking your region selection...">
        <div className="h-40 animate-pulse rounded-2xl bg-surface-muted" />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Open a Sowegan workspace and start with a professional multi-asset dashboard."
    >
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        {regionLabel && regionCode && (
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm">
            <span className="inline-flex items-center gap-2.5 text-muted">
              <Flag code={regionCode} name={regionLabel} size="sm" />
              Region: <span className="font-medium text-text">{regionLabel}</span>
            </span>
            <Link href="/region?next=signup" className="font-semibold text-accent hover:text-accent-hover">
              Change
            </Link>
          </div>
        )}
        {status === "error" && (
          <Alert tone="error" title="Please review your details">
            Complete the required fields before creating an account.
          </Alert>
        )}
        {status === "success" && (
          <Alert tone="success" title="Account created">
            Signing you in to your Sowegan workspace…
          </Alert>
        )}
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          error={errors.name}
          placeholder="Amelia Grant"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          error={errors.email}
          placeholder="you@email.com"
        />
        <div className="space-y-3">
          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            onChange={(value) => setForm({ ...form, password: value })}
            error={errors.password}
            autoComplete="new-password"
          />
          <PasswordStrength password={form.password} />
        </div>
        <PasswordInput
          label="Confirm password"
          name="confirm"
          value={form.confirm}
          onChange={(value) => setForm({ ...form, confirm: value })}
          error={errors.confirm}
          autoComplete="new-password"
          placeholder="Re-enter your password"
        />
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(event) => setForm({ ...form, terms: event.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-border bg-surface-muted"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-semibold text-accent">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-semibold text-accent">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.terms && <p className="text-sm text-danger">{errors.terms}</p>}
        <Button type="submit" fullWidth loading={status === "loading"}>
          Create account
        </Button>
        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/region?next=login" className="font-semibold text-accent hover:text-accent-hover">
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
