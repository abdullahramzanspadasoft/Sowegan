"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { id: string; role: "user" | "assistant"; text: string };

type AskCtx = {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
};

const AskContext = createContext<AskCtx | null>(null);

const STARTERS = [
  "How do I start trading?",
  "What is Rise/Fall?",
  "How do I connect Deriv?",
  "Explain Gold account",
];

function replyTo(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("deriv") || q.includes("connect")) {
    return "To trade in Real mode, open Connect Deriv from Try real trading or Featured cards. After the demo OAuth handshake, your desk stays the same but badges show Real.";
  }
  if (q.includes("rise") || q.includes("fall") || q.includes("option")) {
    return "Rise/Fall is a tick contract: pick Rise if you expect the next ticks higher, Fall if lower. Set duration + stake, then Buy. Results settle when ticks complete.";
  }
  if (q.includes("gold") || q.includes("xau") || q.includes("metal")) {
    return "MT5 Gold is a specialised desk for XAU/USD and metals. Tap Activate now on Featured → Connect Deriv → you’ll open the commodities board with Gold ready.";
  }
  if (q.includes("tradingview") || q.includes("tv")) {
    return "TradingView Connect links charting to Sowegan markets. After Deriv connect, you’ll land on the markets board with TV-ready instruments.";
  }
  if (q.includes("deposit") || q.includes("fund")) {
    return "Use Deposit from CFDs, Crypto, Options, or Portfolio. Methods include USDT, USDC, P2P, and local rails — all frontend demo only.";
  }
  if (q.includes("demo") || q.includes("real")) {
    return "Demo uses virtual funds. Real mode is the same UI after Deriv connect — still a frontend prototype, no live brokerage money.";
  }
  return "I’m Sowegan AI (frontend demo). Ask about markets, Rise/Fall, Deriv connect, Gold, TradingView, deposits, or switching Demo/Real — I’ll guide you through this desk.";
}

export function AskSoweganProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);

  return (
    <AskContext.Provider value={{ open, openChat, closeChat }}>
      {children}
      <AskSoweganPanel open={open} onClose={closeChat} />
    </AskContext.Provider>
  );
}

export function useAskSowegan() {
  const ctx = useContext(AskContext);
  if (!ctx) {
    throw new Error("useAskSowegan must be used within AskSoweganProvider");
  }
  return ctx;
}

/** Safe hook for places that may render outside provider */
export function useAskSoweganOptional() {
  return useContext(AskContext);
}

function AskSoweganPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi — I’m Ask Sowegan. Ask about trading, Deriv, Gold, TradingView, or how this desk works.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => inputRef.current?.focus(), 200);
  }, [open, messages, busy]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setBusy(true);
    await wait(550 + Math.random() * 450);
    const assistantMsg: Msg = {
      id: `a-${Date.now()}`,
      role: "assistant",
      text: replyTo(trimmed),
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setBusy(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[85] flex items-end justify-end p-3 sm:p-5">
          <motion.button
            type="button"
            aria-label="Close chat"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Ask Sowegan"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative z-10 flex h-[min(72vh,560px)] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
          >
            <header className="flex items-center justify-between gap-3 border-b border-border bg-[linear-gradient(105deg,#fbbf24_0%,#f97316_45%,#a855f7_100%)] px-4 py-3.5">
              <div className="flex items-center gap-2.5 text-white">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Sparkles size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Ask Sowegan</p>
                  <p className="text-[11px] text-white/80">AI assistant · frontend demo</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-accent text-[#06231a]"
                        : "border border-border bg-bg-elevated text-text",
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-border bg-bg-elevated px-3.5 py-2.5 text-sm text-muted">
                    Thinking…
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-border px-3 pb-2 pt-2">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={busy}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted transition hover:border-accent/40 hover:text-text disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about trading…"
                  disabled={busy}
                  className="h-11 flex-1 rounded-xl border border-border bg-surface-muted px-3 text-sm outline-none placeholder:text-subtle focus:border-accent/40 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(105deg,#fbbf24_0%,#f97316_45%,#a855f7_100%)] text-white shadow-md transition hover:brightness-110 disabled:opacity-50"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Gradient pill — matches reference Ask Sowegan button */
export function AskSoweganButton({
  className,
  fullWidth,
  onClick,
}: {
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  const ask = useAskSoweganOptional();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        ask?.openChat();
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(105deg,#fbbf24_0%,#f97316_45%,#a855f7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(168,85,247,0.28)] transition hover:brightness-110",
        fullWidth && "w-full",
        className,
      )}
    >
      <Sparkles size={16} />
      Ask Sowegan
    </button>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
