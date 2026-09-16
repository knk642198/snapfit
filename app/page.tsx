"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PhotographerCard from "@/components/PhotographerCard";
import ResultsPage from "@/components/ResultsPage";
import HeroDecoration from "@/components/HeroDecoration";
import Nav from "@/components/Nav";
import { Photographer } from "@/lib/types";
import allPhotographers from "@/data/photographers.json";

export default function Home() {
  const [results, setResults] = useState<Photographer[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState("");

  async function handleSearch(query: string) {
    setLoading(true);
    setError(null);
    setSearched(true);
    setQuery(query);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "검색 중 오류가 발생했습니다.");
      }

      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  function resetToLanding() {
    setSearched(false);
    setResults(null);
    setError(null);
  }

  if (searched) {
    return (
      <ResultsPage
        loading={loading}
        error={error}
        results={results}
        query={query}
        onSearch={handleSearch}
        onLogoClick={resetToLanding}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative overflow-hidden min-h-[calc(100svh-160px)] flex flex-col">
        <Nav onLogoClick={resetToLanding} />
        <HeroDecoration />
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <Header />
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </div>

      <section className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-14">
        <SectionHeading title="작가와 소중한 추억을 만들어보세요" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(allPhotographers as Photographer[]).map((p) => (
            <PhotographerCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg sm:text-xl font-bold tracking-tight">{title}</h2>
      <ArrowUpRight className="text-white/30" size={20} />
    </div>
  );
}
