import { NextRequest, NextResponse } from "next/server";
import photographers from "@/data/photographers.json";
import { fallbackMatch } from "@/lib/fallbackMatch";
import { Photographer } from "@/lib/types";

const SYSTEM_PROMPT = `You are SnapFit's matching engine.
Given a user's natural language request and a JSON array of photographer profiles, analyze the user's intent (location, mood, tone, shooting type) and return the top 3 matching photographer IDs in JSON format.

Response Format:
{ "matchedIds": ["1", "3"] }`;

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json({ error: "검색어를 입력해주세요." }, { status: 400 });
    }

    const list = photographers as Photographer[];
    const apiKey = process.env.OPENAI_API_KEY;

    let matchedIds: string[];

    if (apiKey) {
      matchedIds = await matchWithOpenAI(query, list, apiKey);
    } else {
      matchedIds = fallbackMatch(query, list);
    }

    const matched = matchedIds
      .map((id) => list.find((p) => p.id === id))
      .filter((p): p is Photographer => Boolean(p));

    const results = matched.length > 0 ? matched : list.slice(0, 3);

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[/api/search] error:", err);
    return NextResponse.json(
      { error: "검색 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

async function matchWithOpenAI(
  query: string,
  list: Photographer[],
  apiKey: string
): Promise<string[]> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `User request: "${query}"\n\nPhotographer profiles:\n${JSON.stringify(
              list
            )}`,
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      console.error("[OpenAI] non-OK response:", res.status, await res.text());
      return fallbackMatch(query, list);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return fallbackMatch(query, list);

    const parsed = JSON.parse(content);
    const ids = Array.isArray(parsed.matchedIds) ? parsed.matchedIds : [];
    const validIds = ids.filter((id: unknown) =>
      list.some((p) => p.id === id)
    );

    return validIds.length > 0 ? validIds : fallbackMatch(query, list);
  } catch (err) {
    console.error("[OpenAI] request failed, using fallback matcher:", err);
    return fallbackMatch(query, list);
  }
}
