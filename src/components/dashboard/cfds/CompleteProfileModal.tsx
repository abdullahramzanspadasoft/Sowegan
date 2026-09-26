"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  demoTradeProfile,
  getProfileProgress,
  getTradeProfile,
  saveTradeProfile,
  type TradeProfile,
} from "@/lib/preferences";

export function CompleteProfileModal({
  open,
  onClose,
  onCompleted,
}: {
  open: boolean;
  onClose: () => void;
  onCompleted: () => void;
}) {
  const [profile, setProfile] = useState<TradeProfile>(emptySafe());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setProfile(getTradeProfile());
  }, [open]);

  const progress = useMemo(() => getProfileProgress(profile), [profile]);

  function update<K extends keyof TradeProfile>(key: K, value: TradeProfile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value, completed: false }));
  }

  function fillDemo() {
    setProfile({ ...demoTradeProfile, completed: false });
  }

  async function submit() {
    if (progress < 100) return;
    setSaving(true);
    await wait(900);
    const next = { ...profile, completed: true };
    saveTradeProfile(next);
    setSaving(false);
    onCompleted();
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-xl font-semibold">Please complete profile</h2>
                <p className="mt-1 text-sm text-muted">
                  Verify identity before trading CFDs. Use Demo to autofill.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/5 p-2 text-subtle hover:bg-white/10 hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs text-subtle">
                  <span>Profile progress</span>
                  <span className="font-semibold text-accent">{progress}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                  onClick={fillDemo}
                >
                  <Sparkles size={15} />
                  Demo autofill
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Full name"
                  value={profile.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Your legal name"
                />
                <Input
                  label="ID card number"
                  value={profile.idCard}
                  onChange={(e) => update("idCard", e.target.value)}
                  placeholder="National ID / Passport"
                />
                <Input
                  label="License number"
                  value={profile.licenseNumber}
                  onChange={(e) => update("licenseNumber", e.target.value)}
                  placeholder="Dummy trading licence"
                />
                <Input
                  label="Nationality"
                  value={profile.nationality}
                  onChange={(e) => update("nationality", e.target.value)}
                  placeholder="Country"
                />
              </div>
              <Input
                label="Address"
                value={profile.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Residential address"
              />

              <AnimatePresence>
                {saving && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent-dim px-4 py-3 text-sm text-accent"
                  >
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                    Saving verified profile…
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="button"
                fullWidth
                className="rounded-full"
                disabled={progress < 100 || saving}
                onClick={submit}
              >
                {progress < 100 ? `Complete remaining ${100 - progress}%` : "Save & continue to trade"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function emptySafe(): TradeProfile {
  return {
    fullName: "",
    idCard: "",
    licenseNumber: "",
    nationality: "",
    address: "",
    completed: false,
  };
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
