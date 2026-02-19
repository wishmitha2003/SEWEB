import React from 'react';
export function Table({
  columns,
  data,
  onRowClick,
  className = ''
}) {
  return (
    <div
      className={`overflow-x-auto rounded-2xl border border-slate-100 ${className}`}>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {columns.map((col) =>
            <th
              key={col.key}
              className={`px-4 py-3.5 text-left font-semibold text-slate-600 whitespace-nowrap ${col.className || ''}`}>

                {col.header}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) =>
          <tr
            key={idx}
            className={`
                border-b border-slate-50 last:border-0
                ${onRowClick ? 'cursor-pointer hover:bg-blue-50/50 transition-colors' : ''}
              `}
            onClick={() => onRowClick?.(row)}>

              {columns.map((col) =>
            <td
              key={col.key}
              className={`px-4 py-3.5 text-slate-700 ${col.className || ''}`}>

                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
            )}
            </tr>
          )}
          {data.length === 0 &&
          <tr>
              <td
              colSpan={columns.length}
              className="px-4 py-12 text-center text-slate-400">

                No data available
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>);

}