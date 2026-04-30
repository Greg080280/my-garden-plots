import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/HandDrawn";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  /** Cell renderer. Returns ReactNode. */
  render: (row: T) => ReactNode;
  /** Tailwind width / alignment classes for both header + cell. */
  className?: string;
  /** Hide on small screens. */
  hideOnMobile?: boolean;
}

interface Props<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Stable row key. */
  rowKey: (row: T) => string;
  /** Optional per-row click handler. */
  onRowClick?: (row: T) => void;
  /** Right-aligned action menu per row. */
  actions?: (row: T) => ReactNode;
  pageSize?: number;
  emptyMessage?: string;
  className?: string;
}

/** Generic typed table with cream styling + paginated client-side. */
export function DataTable<T>({
  columns, data, rowKey, onRowClick, actions, pageSize = 10, emptyMessage = "Nimic de afișat.",
  className,
}: Props<T>) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(data.length / pageSize));
  const slice = useMemo(
    () => data.slice(page * pageSize, page * pageSize + pageSize),
    [data, page, pageSize]
  );

  if (data.length === 0) {
    return (
      <div className={cn("rounded-2xl border border-primary/25 bg-paper p-8 text-center text-sm text-muted-foreground", className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-primary/25 bg-card overflow-hidden shadow-paper", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-accent/40 border-b border-primary/20">
            <tr>
              {columns.map(c => (
                <th key={c.key}
                  className={cn("text-left font-display font-bold uppercase tracking-wide text-[11px] px-4 py-3 text-primary-deep",
                    c.hideOnMobile && "hidden md:table-cell", c.className)}>
                  {c.header}
                </th>
              ))}
              {actions && <th className="px-4 py-3 w-12" />}
            </tr>
          </thead>
          <tbody>
            {slice.map((row, i) => (
              <tr
                key={rowKey(row)}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-primary/10 last:border-0 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-accent/30",
                  i % 2 === 1 && "bg-paper/40"
                )}
              >
                {columns.map(c => (
                  <td key={c.key} className={cn("px-4 py-3 align-middle", c.hideOnMobile && "hidden md:table-cell", c.className)}>
                    {c.render(row)}
                  </td>
                ))}
                {actions && <td className="px-4 py-3 text-right">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-paper/60 border-t border-primary/15">
          <p className="text-xs text-muted-foreground">
            Pagina <span className="font-display font-bold text-foreground">{page + 1}</span> din {pages} · {data.length} înregistrări
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="h-8 w-8 grid place-items-center rounded-full border border-primary/30 text-primary hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed press"
              aria-label="Pagina anterioară"
            >
              <ChevronLeftIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPage(p => Math.min(pages - 1, p + 1))}
              disabled={page === pages - 1}
              className="h-8 w-8 grid place-items-center rounded-full border border-primary/30 text-primary hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed press"
              aria-label="Pagina următoare"
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
