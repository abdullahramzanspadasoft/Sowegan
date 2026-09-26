"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { isValidEmail } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email associated with your Sowegan account and we’ll send a reset link."
    >
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        {status === "success" && (
          <Alert tone="success" title="Reset link sent">
            If an account exists for {email}, a reset email is on its way.
          </Alert>
        )}
        {status === "error" && (
          <Alert tone="error" title="Check your email">
            Use a valid address so we can send the reset link.
          </Alert>
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={error}
          placeholder="you@email.com"
        />
        <Button type="submit" fullWidth loading={status === "loading"}>
          Send reset link
        </Button>
        <p className="text-center text-sm text-muted">
          <Link href="/login" className="font-semibold text-accent hover:text-accent-hover">
            Back to login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
