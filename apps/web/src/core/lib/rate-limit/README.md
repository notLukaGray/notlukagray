# Rate Limiting

This directory provides best-effort, cookie-based rate limiting for the unlock flow and form submissions.

## Design

- Rate-limit state is stored in signed cookies on the client.
- A request fingerprint (IP + UA hash + route key) is embedded in each cookie payload.
- An in-memory LRU cache stores the last-known counter per fingerprint, making it harder to bypass by simply clearing cookies.
- No Redis, no database — all state is ephemeral and per-instance.

## Limitations

- **Not abuse-proof.** Cookies can be manipulated, and the LRU is lost on server restart.
- **Best-effort.** Suitable for portfolio gating only.
- **Replace with Upstash / Redis** if abuse becomes a real concern.
