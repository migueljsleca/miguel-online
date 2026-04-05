import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";

const CONTENT_DIR = path.join(process.cwd(), "content");

const MIME_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ collection: string; slug: string; asset: string[] }>;
  },
) {
  const { collection, slug, asset } = await context.params;

  if (!asset.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  const contentRoot = path.join(CONTENT_DIR, collection, slug);
  const assetPath = path.resolve(contentRoot, ...asset);

  if (!assetPath.startsWith(contentRoot)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(assetPath);
    const extension = path.extname(assetPath).toLowerCase();

    return new NextResponse(file, {
      headers: {
        "Content-Type": MIME_TYPES[extension] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
