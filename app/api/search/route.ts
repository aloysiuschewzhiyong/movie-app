import { searchMulti } from "@/utils/tmdb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const page = searchParams.get("page") || "1"

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const results = await searchMulti(query, Number.parseInt(page))
    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "An error occurred while searching" }, { status: 500 })
  }
}

