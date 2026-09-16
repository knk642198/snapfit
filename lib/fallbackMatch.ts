import { Photographer } from "./types";

/**
 * Lightweight keyword-overlap scorer used when no OPENAI_API_KEY is configured,
 * so the app still works end-to-end without any external API.
 */
export function fallbackMatch(query: string, photographers: Photographer[]): string[] {
  const normalizedQuery = query.toLowerCase().replace(/[,.!?~]/g, " ");

  const scored = photographers.map((p) => {
    const haystack = [p.name, p.description, ...p.tags].join(" ").toLowerCase();
    let score = 0;

    for (const tag of p.tags) {
      if (normalizedQuery.includes(tag.toLowerCase())) score += 3;
    }

    const words = normalizedQuery.split(/\s+/).filter((w) => w.length >= 2);
    for (const word of words) {
      if (haystack.includes(word)) score += 1;
    }

    return { id: p.id, score };
  });

  const ranked = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.id);

  if (ranked.length > 0) return ranked;

  // No overlap at all — just return the first few so the UI never dead-ends.
  return photographers.slice(0, 3).map((p) => p.id);
}
