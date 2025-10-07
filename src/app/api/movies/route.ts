import { NextRequest, NextResponse } from "next/server";

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
        const limit = parseInt(searchParams.get("limit") || "100");

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

        // API返回的poster已经是完整URL，直接使用
        const movies = (data.hits || []).map((movie: any) => ({
            ...movie,
            poster: movie.poster || "",
        }));

        return NextResponse.json({ movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        return NextResponse.json(
            { error: "Failed to fetch movies", movies: [] },
            { status: 500 }
        );
    }
}
