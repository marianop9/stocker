import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    OnChangeFn,
    Row,
    RowSelectionState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import AppColumnFilter from "./AppDataTable/AppColumnFilter";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    rowSelection?: RowSelectionState;
    getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
    showIdColumn?: boolean;
}

export function AppDataTable<TData, TValue>({
    columns,
    data,
    onRowSelectionChange,
    rowSelection = {},
    getRowId,
    showIdColumn = false,
}: DataTableProps<TData, TValue>) {
    const hasSelection = onRowSelectionChange !== undefined;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here

    const table = useReactTable({
        getRowId,
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters: columnFilters,
            rowSelection,
            sorting,
        },
        initialState: {
            columnVisibility: {
                id: showIdColumn,
            },
        },
    });

    return (
        <div>
            <div className="rounded-md border bg-secondary/25">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div className="flex gap-2 items-center">
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                    {header.column.getCanFilter() && (
                                                        <AppColumnFilter column={header.column} />
                                                    )}
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No se encontraron resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {hasSelection && data.length > 0 && (
                <div className="flex-1 pl-2 py-2 text-xs text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
                </div>
            )}
        </div>
    );
}
