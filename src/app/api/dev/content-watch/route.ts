import path from "path";
import chokidar from "chokidar";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Timestamp when any file under src/content last changed; updated by watcher. */
let lastContentChange = 0;

let watcherInitialized = false;

function initWatcher() {
  if (watcherInitialized) return;
  watcherInitialized = true;

  const contentDir = path.join(process.cwd(), "src/content");
  const watcher = chokidar.watch(contentDir, {
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 50,
    },
  });

  const bump = () => {
    lastContentChange = Date.now();
  };

  watcher.on("add", bump);
  watcher.on("change", bump);
  watcher.on("unlink", bump);
}

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }

  initWatcher();

  return Response.json({ lastContentChange });
}
