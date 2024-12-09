import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import MovementForm from "./MovementForm";
import { IMovementDto } from "@/models/movements";
import { AppDataTable } from "@/components/AppDataTable";
import { useQuery } from "@tanstack/react-query";
import { movementService } from "@/service/movementService";
import AppDialogWrapper from "@/components/AppDialogWrapper";
import AppLink from "@/components/AppLink";
import { useState } from "react";
import AppColumnFilter from "@/components/AppDataTable/AppColumnFilter";

function useMovementColumns(
    filters: ColumnFiltersState,
    setFilters: (f: ColumnFiltersState) => void,
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
                    <AppLink
                        route={"/movements/" + row.getValue("id")}
                        label="Ver"
                    />
                );
            },
        },
    ];

    return colums;
}

function MovementsView() {
    const { data } = useQuery({
        queryKey: ["movements"],
        queryFn: movementService.list,
    });

    const [filters, setFilters] = useState<ColumnFiltersState>([]);

    return (
        <>
            <div className="flex justify-end mb-4">
                <AppDialogWrapper
                    dialogTitle="Crear movimiento"
                    triggerLabel="Crear movimiento"
                >
                    <MovementForm />
                </AppDialogWrapper>
            </div>
            <AppDataTable
                data={data?.items ?? []}
                columns={useMovementColumns(filters, setFilters)}
                filters={filters}
            />
        </>
    );
}

export default MovementsView;
