"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  MessageCircle,
  Share2,
} from "lucide-react";

interface ShareButtonsProps {
  title: string;
  description?: string;
}

export function ShareButtons({
  title,
  description,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = description
    ? `${title} — ${description}`
    : title;

  function getUrl() {
    return window.location.href;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = getUrl();
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand("copy");
      textarea.remove();

      setCopied(success);
    }
  }

  function openShare(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function nativeShare() {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({
        title,
        text: shareText,
        url: getUrl(),
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        await copyLink();
      }
    }
  }

  return (
    <section
      aria-label="Share this resource"
      className="flex flex-col gap-4"
    >
      <div>
        <h2 className="text-sm font-semibold text-foreground">
          Share this guide
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Help another indie maker discover this resource.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() =>
            openShare(
              `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${getUrl()}`)}`,
            )
          }
          aria-label="Share on WhatsApp"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
        >
          <MessageCircle size={15} />
          WhatsApp
        </button>

        <button
          type="button"
          onClick={() =>
            openShare(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`,
            )
          }
          aria-label="Share on Facebook"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
        >
          <span className="font-bold">f</span>
          Facebook
        </button>

        <button
          type="button"
          onClick={() =>
            openShare(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(shareText)}`,
            )
          }
          aria-label="Share on X"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
        >
          <span className="font-semibold">𝕏</span>
          Share on X
        </button>

        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
        >
          <Share2 size={15} />
          Share
        </button>

        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </section>
  );
}
