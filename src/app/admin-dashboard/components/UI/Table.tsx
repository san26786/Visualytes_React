import React from "react";
import { Inbox } from "lucide-react";

export interface TableProps {
  headings?: (string | React.ReactNode)[];
  children: React.ReactNode;
  empty?: boolean;
  emptyMessage?: string;
  className?: string;
  wrapperClassName?: string;
}

export function Table({
  headings = [],
  children,
  empty = false,
  emptyMessage = "No records found.",
  className = "",
  wrapperClassName = "",
}: TableProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs ${wrapperClassName}`}
    >
      <div className="overflow-x-auto">
        <table
          className={`w-full min-w-[600px] text-left text-sm ${className}`}
        >
          <thead className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-3.5 first:pl-5 last:pr-5 select-none"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-600">
            {empty ? (
              <tr>
                <td
                  colSpan={headings.length || 1}
                  className="py-12 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Inbox className="text-slate-300" size={32} />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}