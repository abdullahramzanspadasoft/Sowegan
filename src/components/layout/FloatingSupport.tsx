"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChatBubbleIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

const WHATSAPP_URL = "https://wa.me/10000000000";

export function FloatingSupport() {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <motion.div whileHover={{ y: -2, scale: 1.04 }} whileTap={{ scale: 0.96 }}>
        <Link
          href="/contact"
          aria-label="Open live chat"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition hover:shadow-[0_14px_32px_rgba(0,0,0,0.34)]"
        >
          <ChatBubbleIcon className="h-6 w-6" />
        </Link>
      </motion.div>

      <motion.div whileHover={{ y: -2, scale: 1.04 }} whileTap={{ scale: 0.96 }}>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition hover:shadow-[0_14px_32px_rgba(0,0,0,0.34)]"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </motion.div>
    </div>
  );
}
