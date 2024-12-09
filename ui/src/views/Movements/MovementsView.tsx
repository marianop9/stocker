import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import MovementForm from "./MovementForm";
import { IMovementDto } from "@/models/movements";
import { AppDataTable } from "@/components/AppDataTable";
import AppDialogWrapper from "@/components/AppDialogWrapper";
import AppLink from "@/components/AppLink";
import { useState } from "react";
import AppColumnFilter from "@/components/AppDataTable/AppColumnFilter";
import { Button } from "@/components/ui/button";
import { useFetcher } from "react-router-dom";
import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { movementsLoader } from "./movementsLoader";

function useMovementColumns(
    filters: ColumnFiltersState,
    setFilters: (f: ColumnFiltersState) => void,
    onDelete: (id: string) => void,
) {
    const colums: ColumnDef<IMovementDto>[] = [
        {
            header: "Id",
            accessorKey: "id",
        },
        {
            header: "Fecha",
            accessorKey: "date",
        },
        {
            header: () => (
                <AppColumnFilter
                    filters={filters}
                    setFilters={setFilters}
                    columnLabel="Tipo"
                    columnId="type"
                    opts={[
                        { label: "Entrada", value: "IN" },
                        { label: "Salida", value: "OUT" },
                    ]}
                />
            ),
            accessorKey: "type",
        },
        {
            accessorKey: "state",
            header: () => (
                <AppColumnFilter
                    filters={filters}
                    setFilters={setFilters}
                    columnLabel="Estado"
                    columnId="state"
                    opts={[
                        { label: "Abierto", value: "OPEN" },
                        { label: "Cerrado", value: "CLOSED" },
                    ]}
                />
            ),
        },
        {
            id: "actions",
            cell({ row }) {
                return (
                    <div className="flex gap-2">
                        <AppLink
                            route={"/movements/" + row.getValue("id")}
                            label="Ver"
                        />
                        {/* <Form method="DELETE">
                            <input
                                type="text"
                                name="id"
                                defaultValue={row.getValue("id")}
                                hidden
                            /> */}
                        <Button
                            type="submit"
                            variant="link"
                            disabled={row.original.state == "CLOSED"}
                            onClick={() => onDelete(row.getValue("id"))}
                        >
                            Eliminar
                        </Button>
                        {/* </Form> */}
                    </div>
                );
            },
        },
    ];

    return colums;
}

function MovementsView() {
    const [filters, setFilters] = useState<ColumnFiltersState>([]);

    const { movements } = useAppRouterLoaderData(movementsLoader);
    const fetcher = useFetcher<{ ok: boolean; error: string }>();

    const hasError = fetcher.data && !fetcher.data.ok;

    function handleDelete(id: string) {
        fetcher.submit({ id: id }, { method: "DELETE" });
    }

    const columns = useMovementColumns(filters, setFilters, handleDelete);

    return (
        <>
            {hasError && (
                <p className="my-4 p-2 rounded-md bg-red-400 text">
                    {fetcher.data?.error}
                </p>
            )}

            <div className="flex justify-end mb-4">
                <AppDialogWrapper
                    dialogTitle="Crear movimiento"
                    triggerLabel="Crear movimiento"
                >
                    <MovementForm />
                </AppDialogWrapper>
            </div>

            <AppDataTable
                data={movements?.items ?? []}
                columns={columns}
                filters={filters}
            />
        </>
    );
}

export default MovementsView;
