"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    OnChangeFn,
    Row,
    RowSelectionState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filters?: ColumnFiltersState;
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    rowSelection?: RowSelectionState;
    getRowId?: (
        originalRow: TData,
        index: number,
        parent?: Row<TData>,
    ) => string;
    showIdColumn?: boolean;
}

export function AppDataTable<TData, TValue>({
    columns,
    data,
    filters,
    onRowSelectionChange,
    rowSelection = {},
    getRowId,
    showIdColumn = false,
}: DataTableProps<TData, TValue>) {
    const hasSelection = onRowSelectionChange !== undefined;

    const table = useReactTable({
        getRowId,
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange,
        state: {
            columnFilters: filters,
            rowSelection,
        },
        initialState: {
            columnVisibility: {
                id: showIdColumn,
            },
        },
    });

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
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
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
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
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No se encontraron resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    {/* <TableFooter>
                        {hasSelection && data.length > 0 && (
                            <div className="flex-1 pl-2 py-2 text-xs text-muted-foreground">
                                {
                                    table.getFilteredSelectedRowModel().rows
                                        .length
                                }{" "}
                                de {table.getFilteredRowModel().rows.length}{" "}
                                fila(s) seleccionadas.
                            </div>
                        )}
                    </TableFooter> */}
                </Table>
            </div>
            {hasSelection && data.length > 0 && (
                <div className="flex-1 pl-2 py-2 text-xs text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} fila(s)
                    seleccionadas.
                </div>
            )}
        </div>
    );
}
