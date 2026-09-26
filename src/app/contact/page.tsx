"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { faqs } from "@/lib/data";
import { isValidEmail } from "@/lib/utils";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Add a subject.";
    if (form.message.trim().length < 12) next.message = "Message should be at least 12 characters.";
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
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  }

  return (
    <MarketingShell>
      <section className="section-space">
        <Container className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Talk to the Sowegan desk.
            </h1>
            <p className="text-lg leading-8 text-muted">
              Questions about the platform, account access, or market coverage?
              Send a message and our support team will get back to you.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <form className="space-y-5" onSubmit={onSubmit} noValidate>
                {status === "success" && (
                  <Alert tone="success" title="Message sent">
                    Thanks. A Sowegan specialist will reply using the email you provided.
                  </Alert>
                )}
                {status === "error" && (
                  <Alert tone="error" title="Please review the form">
                    Fix the highlighted fields and try again.
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
                <Input
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={(event) => setForm({ ...form, subject: event.target.value })}
                  error={errors.subject}
                  placeholder="Account access, markets, or general inquiry"
                />
                <label className="block space-y-2">
                  <span className="block text-sm font-medium">Message</span>
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-text placeholder:text-subtle focus:border-accent/50 focus:outline-none focus:ring-4 focus:ring-accent/10"
                  />
                  {errors.message && <span className="text-sm text-danger">{errors.message}</span>}
                </label>
                <Button type="submit" loading={status === "loading"}>
                  Send message
                </Button>
              </form>
            </Card>

            <div className="space-y-5">
              <Card className="space-y-4">
                <h2 className="text-xl font-semibold">Contact information</h2>
                <div className="flex items-start gap-3 text-sm text-muted">
                  <Mail className="mt-0.5 text-accent" size={18} />
                  support@sowegan.com
                </div>
                <div className="flex items-start gap-3 text-sm text-muted">
                  <Phone className="mt-0.5 text-accent" size={18} />
                  +1 (800) 555-0148
                </div>
                <div className="flex items-start gap-3 text-sm text-muted">
                  <MapPin className="mt-0.5 text-accent" size={18} />
                  120 Market Street, Suite 400, London
                </div>
              </Card>
              <Card>
                <h2 className="mb-4 text-xl font-semibold">Support notes</h2>
                <div className="space-y-4">
                  {faqs.slice(0, 3).map((item) => (
                    <div key={item.question}>
                      <p className="font-semibold">{item.question}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </MarketingShell>
  );
}
