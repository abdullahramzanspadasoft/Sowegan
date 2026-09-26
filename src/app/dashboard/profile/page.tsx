"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Modal } from "@/components/ui/Modal";
import { isValidEmail } from "@/lib/utils";
import { authClient, DEMO_USER } from "@/lib/auth";
import { clearTradingPreferences } from "@/lib/preferences";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: DEMO_USER.name,
    email: DEMO_USER.email,
    timezone: "Europe/London",
  });
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = authClient.getSession();
    if (session?.user) {
      setProfile((current) => ({
        ...current,
        name: session.user.name,
        email: session.user.email,
      }));
    }
  }, []);

  function onSave(event: FormEvent) {
    event.preventDefault();
    if (!profile.name.trim() || !isValidEmail(profile.email)) {
      setError("Enter a valid name and email.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("success");
  }

  return (
    <DashboardShell title="Profile" subtitle="Account details, security, and preferences">
      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <h2 className="mb-5 text-lg font-semibold">Profile details</h2>
          <form className="space-y-5" onSubmit={onSave}>
            {status === "success" && <Alert tone="success" title="Profile updated" />}
            {status === "error" && <Alert tone="error" title={error} />}
            <Input
              label="Full name"
              name="name"
              value={profile.name}
              onChange={(event) => setProfile({ ...profile, name: event.target.value })}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={(event) => setProfile({ ...profile, email: event.target.value })}
            />
            <Input
              label="Timezone"
              name="timezone"
              value={profile.timezone}
              onChange={(event) => setProfile({ ...profile, timezone: event.target.value })}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Card>

        <Card>
          <h2 className="mb-5 text-lg font-semibold">Security</h2>
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (password.length < 8) {
                setStatus("error");
                setError("New password must be at least 8 characters.");
                return;
              }
              setStatus("success");
              setPassword("");
            }}
          >
            <PasswordInput
              label="New password"
              name="new-password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
            />
            <Button type="submit" variant="secondary">
              Update password
            </Button>
          </form>
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-semibold">Session</h3>
            <p className="mt-2 text-sm text-muted">
              Sign out of this demo workspace and return to the login screen. No password is stored.
            </p>
            <Button className="mt-4" variant="danger" onClick={() => setLogoutOpen(true)}>
              Sign out
            </Button>
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <h2 className="mb-4 text-lg font-semibold">Notification preferences</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {["Price alerts", "Order fills", "Product updates"].map((label) => (
            <label key={label} className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
              {label}
              <input defaultChecked type="checkbox" className="h-4 w-4" />
            </label>
          ))}
        </div>
      </Card>

      <Modal open={logoutOpen} title="Sign out?" onClose={() => setLogoutOpen(false)}>
        <p className="text-sm leading-6 text-muted">
          You will return to the login page. This demo does not persist a real session.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setLogoutOpen(false)}>
            Stay
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              authClient.logout();
              clearTradingPreferences();
              router.push("/region?next=login");
            }}
          >
            Sign out
          </Button>
        </div>
      </Modal>
    </DashboardShell>
  );
}
