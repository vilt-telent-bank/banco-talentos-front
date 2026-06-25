import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Column<T> {
    header: string;
    render: (row: T) => ReactNode;
    className?: string;
}

interface Props<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (row: T) => string | number;
    emptyMessage?: string;
    minRows?: number;
    className?: string;
    wrapperClassName?: string;
}

const thBaseCls = "py-3 px-4";
const tdBaseCls = "py-4 px-4";

export function Table<T>({
    columns,
    data,
    keyExtractor,
    emptyMessage = "Sem dados disponíveis",
    minRows = 0,
    className = "",
    wrapperClassName = "",
}: Props<T>) {
    const emptyRows = data.length === 0 ? 0 : Math.max(0, minRows - data.length);

    return (
        <div className={twMerge("overflow-x-auto", wrapperClassName)}>
            <table className={twMerge("w-full text-left border-collapse", className)}>
                <thead>
                    <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                        {columns.map((column) => (
                            <th
                                key={column.header}
                                className={twMerge(thBaseCls, column.className)}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="py-8 text-center text-slate-400"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        <>
                            {data.map((row) => (
                                <tr
                                    key={keyExtractor(row)}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.header}
                                            className={twMerge(tdBaseCls, column.className)}
                                        >
                                            {column.render(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {Array.from({ length: emptyRows }).map((_, index) => (
                                <tr
                                    key={`empty-row-${index}`}
                                    className="border-b border-slate-100"
                                >
                                    <td colSpan={columns.length} className={`${tdBaseCls} h-11`}>
                                        &nbsp;
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}
