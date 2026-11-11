import path from "node:path";
import { NextResponse } from "next/server";
import { loadGuides } from "@preshipos/content";


export async function GET() {
  try {
    const contentRoot = path.resolve(process.cwd(), "..", "docs");

    const guides = await loadGuides({ contentRoot });

    return NextResponse.json(
      {
        guides,
        total: guides.length,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=300",
        },
      },
    );
  } catch (error) {
    console.error("Failed to load public guides:", error);

    return NextResponse.json(
      { error: "Unable to load guides." },
      { status: 500 },
    );
  }
}