import { useState } from "react";
import { callMCP, MCP_TOOLS } from "../services/mcp";

export function MCPButton({ tool, input, label, onGenerated, className = "" }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await callMCP(tool, input);

    if (res.success) {
      setResult(res.data);
      onGenerated?.(res.data);
    } else {
      setError(res.error || "MCP request failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end {className}">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-[#315C43] bg-gradient-to-b from-[#315C43] to-[#1F4933] px-6 py-3 text-[14px] font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B6B4E] focus-visible:ring-offset-2"
      >
        {loading ? (
          <svg className="size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          label
        )}
      </button>

      {error && (
        <p className="text-[12px] text-[#dc2626]">{error}</p>
      )}

      {result && (
        <div className="pt-2 max-w-full overflow-hidden">
          <details className="border border-[#cbd5e1] rounded-lg p-3 text-sm content-fit-sm">
            <summary className="cursor-pointer font-medium text-ink">AI Generated Content</summary>
            <pre className="mt-2 overflow-x-auto text-[12px] leading-5 text-muted whitespace-pre-wrap break-words bg-[#f8fafc] p-2 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}