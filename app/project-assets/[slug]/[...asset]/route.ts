import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

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
    params: Promise<{ slug: string; asset: string[] }>;
  },
) {
  const { slug, asset } = await context.params;

  if (!asset.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  const projectRoot = path.join(PROJECTS_DIR, slug);
  const assetPath = path.resolve(projectRoot, ...asset);

  if (!assetPath.startsWith(projectRoot)) {
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
