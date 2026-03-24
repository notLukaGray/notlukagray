"use client";

import { useEffect, useState } from "react";
import { useVariableStore } from "@/page-builder/core/page-builder-variable-store";
import { useActionLogStore } from "@/page-builder/core/page-builder-variable-store";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  return `${hh}:${mm}:${ss}.${ms}`;
}

function truncate(str: string, max = 80): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

function actionTypeColor(type: string): string {
  if (type.startsWith("three.")) return "text-blue-400";
  if (type.startsWith("rive.")) return "text-purple-400";
  return "text-green-400";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function VariablesTab() {
  const variables = useVariableStore((s) => s.variables);
  const entries = Object.entries(variables);

  if (entries.length === 0) {
    return <p className="text-gray-500 text-xs px-3 py-4 font-mono">No variables set.</p>;
  }

  return (
    <div className="overflow-y-auto max-h-72">
      <table className="w-full text-xs font-mono">
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b border-gray-800">
              <td className="px-3 py-1.5 text-gray-300 w-1/3 align-top break-all">{key}</td>
              <td className="px-3 py-1.5 text-yellow-300 align-top break-all">
                {truncate(JSON.stringify(value))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActionsTab() {
  const entries = useActionLogStore((s) => s.entries);
  const clear = useActionLogStore((s) => s.clear);

  return (
    <>
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800">
        <span className="text-gray-500 text-xs font-mono">
          {entries.length} action{entries.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={clear}
          className="text-xs text-gray-400 hover:text-gray-100 font-mono px-2 py-0.5 rounded border border-gray-700 hover:border-gray-500 transition-colors"
        >
          Clear
        </button>
      </div>
      {entries.length === 0 ? (
        <p className="text-gray-500 text-xs px-3 py-4 font-mono">No actions fired yet.</p>
      ) : (
        <div className="overflow-y-auto max-h-64">
          <table className="w-full text-xs font-mono">
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-800">
                  <td className="px-2 py-1.5 text-gray-500 whitespace-nowrap align-top">
                    {formatTimestamp(entry.timestamp)}
                  </td>
                  <td
                    className={`px-2 py-1.5 whitespace-nowrap align-top ${actionTypeColor(entry.type)}`}
                  >
                    {entry.type}
                  </td>
                  <td className="px-2 py-1.5 text-gray-400 align-top break-all">
                    {truncate(JSON.stringify(entry.payload ?? null))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main overlay
// ---------------------------------------------------------------------------

type Tab = "variables" | "actions";

export function PageBuilderDevOverlay() {
  if (process.env.NODE_ENV !== "development") return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tab, setTab] = useState<Tab>("variables");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key === "D") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] w-[420px] max-w-[calc(100vw-2rem)] bg-gray-900 text-gray-100 rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
      style={{ fontFamily: "monospace" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">PB Dev</span>
        <div className="flex items-center gap-1">
          {(["variables", "actions"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-xs px-2 py-0.5 rounded transition-colors ${
                tab === t ? "bg-gray-600 text-gray-100" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
          <button
            onClick={() => setOpen(false)}
            className="ml-2 text-gray-500 hover:text-gray-200 text-sm leading-none px-1"
            aria-label="Close overlay"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Tab content */}
      {tab === "variables" ? <VariablesTab /> : <ActionsTab />}

      {/* Footer hint */}
      <div className="px-3 py-1 bg-gray-800 border-t border-gray-700">
        <span className="text-gray-600 text-xs">⌘⇧D to toggle</span>
      </div>
    </div>
  );
}
