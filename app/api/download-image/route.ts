import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = ["shikimori.one", "shikimori.io", "img.youtube.com"];

function isAllowedUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return ALLOWED_HOSTS.includes(u.hostname);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const filename = request.nextUrl.searchParams.get("filename") ?? "image.jpg";

  if (!url || !isAllowedUrl(url)) {
    return NextResponse.json({ error: "Invalid or disallowed URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "AnimeVault/1.0 (https://github.com/anime-vault)" },
    });
    if (!res.ok) throw new Error("Upstream fetch failed");
    const blob = await res.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    const contentType = res.headers.get("content-type") ?? "image/jpeg";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}"`,
      },
    });
  } catch (e) {
    console.error("download-image proxy error:", e);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
  }
}
