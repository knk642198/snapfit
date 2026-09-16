"use client";

import { useState } from "react";
import { Photographer } from "@/lib/types";

function LongArrowLeft({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.45}
      viewBox="0 0 44 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M42 10H4" />
      <path d="M14 2 4 10l10 8" />
    </svg>
  );
}

function LongArrowRight({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.45}
      viewBox="0 0 44 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 10h38" />
      <path d="M30 2l10 8-10 8" />
    </svg>
  );
}

export default function CardDeck({ results }: { results: Photographer[] }) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<{ item: Photographer; dir: 1 | -1 } | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const total = results.length;
  const current = results[index];

  function go(d: 1 | -1) {
    setOutgoing({ item: results[index], dir: d });
    setDir(d);
    setIndex((i) => (i + d + total) % total);
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
      <div className="relative w-[320px] sm:w-[400px] h-[460px] sm:h-[520px]">
        {/* left peek */}
        <div className="absolute inset-0 z-[1] -translate-x-5 sm:-translate-x-6 rotate-[-7deg] scale-[0.95] opacity-40 rounded-2xl bg-base-800 border border-white/10" />

        {/* far right peek */}
        {total > 2 && (
          <div className="absolute inset-0 z-[2] translate-x-8 sm:translate-x-10 rotate-[10deg] scale-[0.92] opacity-25 rounded-2xl bg-base-800 border border-white/10" />
        )}

        {/* near right peek — hints at the next card */}
        {total > 1 && (
          <div className="absolute inset-0 z-[3] translate-x-4 sm:translate-x-5 rotate-[5deg] scale-[0.965] opacity-55 rounded-2xl bg-base-800 border border-white/10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={results[(index + 1) % total].ogImage}
              alt=""
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        )}

        {outgoing && (
          <div
            key={`out-${outgoing.item.id}`}
            className={`absolute inset-0 z-[5] ${
              outgoing.dir === 1
                ? "animate-[cardOutLeft_0.35s_ease-in_forwards]"
                : "animate-[cardOutRight_0.35s_ease-in_forwards]"
            }`}
            onAnimationEnd={() => setOutgoing(null)}
          >
            <DeckCard p={outgoing.item} />
          </div>
        )}

        <div
          key={`in-${current.id}`}
          className={`absolute inset-0 z-[4] ${
            dir === 1
              ? "animate-[cardInFromRight_0.35s_ease-out]"
              : "animate-[cardInFromLeft_0.35s_ease-out]"
          }`}
        >
          <DeckCard p={current} />
        </div>
      </div>

      {total > 1 && (
        <div className="flex items-center gap-16 sm:gap-20">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="이전 작가"
            className="text-white/60 hover:text-white transition-colors"
          >
            <LongArrowLeft size={40} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="다음 작가"
            className="text-white/60 hover:text-white transition-colors"
          >
            <LongArrowRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}

function DeckCard({ p }: { p: Photographer }) {
  return (
    <div className="w-full h-full flex flex-col bg-base-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
      <div className="relative h-[52%] shrink-0 overflow-hidden bg-base-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.ogImage} alt={p.name} className="w-full h-full object-cover" />
        <span className="absolute top-3 right-3 bg-black/70 backdrop-blur text-xs font-medium text-white/90 rounded-full px-3 py-1">
          {p.price}
        </span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-2.5 p-4 sm:p-5">
        <div className="min-h-0">
          <h3 className="font-semibold text-base sm:text-lg truncate">{p.name}</h3>
          <p className="text-xs sm:text-sm text-white/50 mt-1 leading-relaxed line-clamp-2">
            {p.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
          {p.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] sm:text-xs font-medium text-white/70 bg-white/10 rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={p.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full flex items-center justify-center gap-1.5 text-sm font-medium bg-accent-500 hover:bg-accent-400 text-base-950 rounded-xl py-2.5 transition-colors"
        >
          예약 문의 ↗
        </a>
      </div>
    </div>
  );
}
