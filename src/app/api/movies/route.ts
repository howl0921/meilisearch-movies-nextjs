import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getFriendlyErrorMessage } from "@/utils/errorHandler";

const MEILISEARCH_API = process.env.MEILISEARCH_API_URL;
const API_KEY = process.env.MEILISEARCH_API_KEY;

if (!MEILISEARCH_API || !API_KEY) {
  throw new Error(
    "Missing required environment variables: MEILISEARCH_API_URL and MEILISEARCH_API_KEY",
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const response = await fetch(`${MEILISEARCH_API}/indexes/movies/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: query,
        limit: limit,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    // 调试：打印返回的数据
    console.log("API Response:", {
      query,
      totalHits: data.hits?.length || 0,
      firstMovie: data.hits?.[0] || null,
    });

    // API返回的poster已经是完整URL，直接使用
    const movies = (data.hits || []).map(
      (movie: {
        id: number;
        title: string;
        overview?: string;
        poster?: string;
        rating?: number;
        release_date?: string;
        genres?: string[];
        runtime?: number;
        director?: string;
        cast?: string[];
      }) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview || "",
        poster: movie.poster || "",
        rating: movie.rating || 0,
        release_date: movie.release_date || "",
        genres: movie.genres || [],
        runtime: movie.runtime || 0,
        director: movie.director || "",
        cast: movie.cast || [],
      }),
    );

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    const friendlyError = getFriendlyErrorMessage(error, "获取电影数据失败");
    return NextResponse.json(
      { error: friendlyError, movies: [] },
      { status: 500 },
    );
  }
}
