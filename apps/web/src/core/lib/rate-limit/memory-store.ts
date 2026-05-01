const MAX = 1000;

type Entry = { count: number; ttl: number };

const store = new Map<string, Entry>();

export function rememberFingerprint(fp: string, count: number, ttlMs: number): void {
  if (store.size >= MAX) {
    const first = store.keys().next().value;
    if (first) store.delete(first);
  }
  store.set(fp, { count, ttl: Date.now() + ttlMs });
}

export function getRememberedCount(fp: string): number | undefined {
  const entry = store.get(fp);
  if (!entry) return undefined;
  if (Date.now() > entry.ttl) {
    store.delete(fp);
    return undefined;
  }
  return entry.count;
}
