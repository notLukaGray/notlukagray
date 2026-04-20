import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PosterRequest = {
  outputDir?: unknown;
  posterSecond?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function resolveLocalPath(value: string): string {
  return path.isAbsolute(value) ? path.normalize(value) : path.resolve(process.cwd(), value);
}

function posterArgs(masterPath: string, outputDir: string, posterSecond: number): string[] {
  return [
    "-hide_banner",
    "-y",
    "-ss",
    String(posterSecond),
    "-i",
    masterPath,
    "-frames:v",
    "1",
    "-vf",
    "scale='min(1920,iw)':-2",
    "-q:v",
    "72",
    path.join(outputDir, "poster.webp"),
  ];
}

async function findPosterSourceMaster(outputDir: string): Promise<string | null> {
  for (const relativePath of [
    path.join("x264", "master.m3u8"),
    path.join("x265", "master.m3u8"),
    path.join("vp9", "manifest.mpd"),
    "master.m3u8",
  ]) {
    const masterPath = path.join(outputDir, relativePath);
    const stat = await fs.stat(masterPath).catch(() => null);
    if (stat?.isFile()) return masterPath;
  }
  return null;
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }

  let body: PosterRequest;
  try {
    body = (await request.json()) as PosterRequest;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const outputDirRaw = asTrimmedString(body.outputDir);
  const posterSecond =
    typeof body.posterSecond === "number" && Number.isFinite(body.posterSecond)
      ? Math.max(0, Math.min(3600, body.posterSecond))
      : 0;

  if (!outputDirRaw) {
    return Response.json({ error: "Output folder is required." }, { status: 400 });
  }

  const outputDir = resolveLocalPath(outputDirRaw);
  const masterPath = await findPosterSourceMaster(outputDir);
  if (!masterPath) {
    return Response.json(
      { error: "Run conversion first. master.m3u8 was not found." },
      { status: 400 }
    );
  }

  const args = posterArgs(masterPath, outputDir, posterSecond);

  return await new Promise<Response>((resolve) => {
    const child = spawn("ffmpeg", args, { stdio: ["ignore", "pipe", "pipe"] });
    let output = `Extracting poster from ${masterPath} at ${posterSecond.toFixed(2)}s\n\n`;

    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.on("error", (error) => {
      resolve(
        new Response(`${output}\nFailed to start ffmpeg: ${error.message}\n`, { status: 500 })
      );
    });
    child.on("close", (code) => {
      if (code === 0) {
        output += `\nPoster: ${path.join(outputDir, "poster.webp")}\n`;
        resolve(new Response(output, { headers: { "Content-Type": "text/plain; charset=utf-8" } }));
      } else {
        output += `\nPoster extraction exited with code ${code ?? "unknown"}.\n`;
        resolve(
          new Response(output, {
            status: 500,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          })
        );
      }
    });
  });
}
