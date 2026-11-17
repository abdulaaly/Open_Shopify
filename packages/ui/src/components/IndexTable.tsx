import React, { useState } from "react";
import { cn } from "../utils.js";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

export interface Column<T> {
  id: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface IndexTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  emptyState?: React.ReactNode;
  className?: string;
}

export function IndexTable<T>({
  columns,
  data,
  keyExtractor,
  selectable = true,
  selectedIds = [],
  onSelectionChange,
  emptyState,
  className,
}: IndexTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectionChange) return;
    if (e.target.checked) {
      onSelectionChange(data.map(keyExtractor));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((item) => item !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold select-none">
            {selectable && (
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.id}
                style={{ width: col.width }}
                className={cn(
                  "px-4 py-3 font-semibold",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.sortable && "cursor-pointer hover:text-slate-900 dark:hover:text-slate-200"
                )}
                onClick={() => col.sortable && handleSort(col.id)}
              >
                <div
                  className={cn(
                    "inline-flex items-center gap-1",
                    col.align === "right" && "justify-end",
                    col.align === "center" && "justify-center"
                  )}
                >
                  {col.header}
                  {col.sortable && (
                    <span className="text-slate-400">
                      {sortColumn === col.id ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-3.5 h-3.5 opacity-40" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-12 text-center text-slate-400"
              >
                {emptyState || "No records found"}
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const id = keyExtractor(item);
              const isSelected = selectedIds.includes(id);

              return (
                <tr
                  key={id}
                  className={cn(
                    "hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors",
                    isSelected && "bg-emerald-50/40 dark:bg-emerald-950/20"
                  )}
                >
                  {selectable && (
                    <td className="w-10 px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={cn(
                        "px-4 py-3.5 text-slate-700 dark:text-slate-300",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center"
                      )}
                    >
                      {col.accessor(item)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
