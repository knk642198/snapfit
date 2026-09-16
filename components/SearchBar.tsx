"use client";

import { Search, Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useTypewriter } from "@/lib/useTypewriter";

const EMOTIONAL_PROMPTS = [
  "노을이 스며든 골목에서, 우리 둘만의 필름 한 컷",
  "비 오는 날 우산 속에 담긴 조용한 순간",
  "가을바람이 스치던 오후의 다정한 기록",
  "밤바다와 별빛 아래 남기고 싶은 이야기",
  "낡은 필름 카메라로 그리는 우리의 봄날",
];

export default function SearchBar({
  onSearch,
  loading,
  initialValue = "",
}: {
  onSearch: (query: string) => void;
  loading: boolean;
  initialValue?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const { text: typed, full: typedFull } = useTypewriter(EMOTIONAL_PROMPTS);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    const query = value.trim() || typedFull.trim();
    if (!query) return;
    setValue(query);
    onSearch(query);
  }

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-8 mt-8 sm:mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-base-900/90 backdrop-blur border border-white/10 rounded-full p-2 pl-5 shadow-2xl shadow-black/60 focus-within:border-accent-500/60 transition-colors"
      >
        <Search className="shrink-0 text-white/40" size={20} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`${typed}${showCursor ? "|" : ""}`}
          className="flex-1 min-w-0 bg-transparent outline-none py-3 text-sm sm:text-base placeholder:text-white/30"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 flex items-center gap-2 bg-accent-500 hover:bg-accent-400 disabled:opacity-40 disabled:cursor-not-allowed text-base-950 font-semibold text-sm rounded-full px-5 py-3 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              검색중
            </>
          ) : (
            "검색"
          )}
        </button>
      </form>
    </div>
  );
}
