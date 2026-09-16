import { useEffect, useState } from "react";

/**
 * Cycles through phrases with a type → hold → delete rhythm.
 * Returns the current substring to render (e.g. as a placeholder).
 */
export function useTypewriter(
  phrases: string[],
  options?: { typingMs?: number; deletingMs?: number; holdMs?: number }
) {
  const { typingMs = 70, deletingMs = 30, holdMs = 1800 } = options ?? {};

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (phrases.length === 0) return;
    const current = phrases[phraseIndex % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charIndex < current.length) {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), typingMs);
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), holdMs);
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), deletingMs);
      } else {
        setPhaseAndAdvance();
      }
    }

    function setPhaseAndAdvance() {
      setPhraseIndex((i) => (i + 1) % phrases.length);
      setPhase("typing");
    }

    return () => clearTimeout(timeout);
  }, [charIndex, phase, phraseIndex, phrases, typingMs, deletingMs, holdMs]);

  const current = phrases[phraseIndex % phrases.length] ?? "";
  return { text: current.slice(0, charIndex), full: current };
}
