"use client";

import { Loader2, SearchX } from "lucide-react";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import CardDeck from "./CardDeck";
import { Photographer } from "@/lib/types";

export default function ResultsPage({
  loading,
  error,
  results,
  query,
  onSearch,
  onLogoClick,
}: {
  loading: boolean;
  error: string | null;
  results: Photographer[] | null;
  query: string;
  onSearch: (query: string) => void;
  onLogoClick: () => void;
}) {
  return (
    <div className="h-svh w-full flex flex-col overflow-hidden">
      <Nav onLogoClick={onLogoClick} absolute={false} />

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 px-6 py-1">
        {loading && (
          <div className="flex flex-col items-center gap-3 text-white/50">
            <Loader2 className="animate-spin" size={28} />
            <p className="text-sm">어울리는 작가를 찾고 있어요…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 text-center text-white/50">
            <SearchX size={28} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && results && results.length === 0 && (
          <div className="flex flex-col items-center gap-2 text-center text-white/50">
            <SearchX size={28} />
            <p>조건에 맞는 작가를 찾지 못했어요. 다른 키워드로 검색해보세요.</p>
          </div>
        )}

        {!loading && !error && results && results.length > 0 && (
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              분위기에 맞는 작가님을 찾았어요!
            </h2>
            <CardDeck results={results} />
          </div>
        )}
      </div>

      <div className="shrink-0 pb-3 sm:pb-5">
        <SearchBar onSearch={onSearch} loading={loading} initialValue={query} />
      </div>
    </div>
  );
}
