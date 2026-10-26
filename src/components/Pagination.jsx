export function Pagination({ page, total, limit, onChange }) {
  const pages = Math.max(1, Math.ceil(total / limit));
  if (pages <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="rounded-full border border-ink/15 px-4 py-2 text-sm disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-sm text-muted">
        {page} / {pages}
      </span>
      <button
        type="button"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className="rounded-full border border-ink/15 px-4 py-2 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
