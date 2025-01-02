import { ColumnDef } from "@tanstack/react-table";
import MovementForm from "./MovementForm";
import { IMovementDto } from "@/models/movements";
import { AppDataTable } from "@/components/AppDataTable";
import AppDialogWrapper from "@/components/AppDialogWrapper";
import AppLink from "@/components/AppLink";
import { useRef } from "react";
import { FilterOption } from "@/components/AppDataTable/AppColumnFilter";
import { Button } from "@/components/ui/button";
import { useFetcher } from "react-router-dom";
import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { movementsLoader } from "./movementsLoader";
import { formatDate, getMovementState } from "@/lib/formatters";
import { AppMovementTypeBadge } from "@/components/AppBadgeColored";
import AppStatefulBadge from "@/components/AppBadgeStateful";
import { CustomEndpointResponse } from "@/service/pocketbase";

function useMovementColumns(onDelete: (id: string) => void) {
    const colums: ColumnDef<IMovementDto>[] = [
        {
            header: "Id",
            accessorKey: "id",
        },
        {
            header: "Fecha",
            accessorKey: "date",
            cell: ({ getValue }) => <>{formatDate(getValue() as string)}</>,
            enableColumnFilter: false,
        },
        {
            header: "Tipo",
            accessorKey: "type",
            cell: ({ row }) => <AppMovementTypeBadge type={row.original.type} />,
            filterFn: "arrIncludesSome",
            meta: {
                variant: "checkboxes",
                filterOpts: [
                    { label: "Entrada", value: "IN" },
                    { label: "Salida", value: "OUT" },
                ] as FilterOption[],
            },
        },
        {
            header: "Estado",
            accessorKey: "state",
            cell: ({ row }) => (
                <AppStatefulBadge
                    label={getMovementState(row.original.state)}
                    type={
                        row.original.state === "OPEN"
                            ? "success"
                            : row.original.state === "ANNULLED"
                              ? "secondary"
                              : "primary"
                    }
                />
            ),
            meta: {
                variant: "checkboxes",
                filterOpts: [
                    { label: "Abierto", value: "OPEN" },
                    { label: "Cerrado", value: "CLOSED" },
                    { label: "Anulado", value: "ANNULLED" },
                ] as FilterOption[],
            },
            filterFn: "arrIncludesSome",
        },
        {
            id: "actions",
            cell({ row }) {
                const isOpen = row.original.state === "OPEN";
                const isAnnulled = row.original.state === "ANNULLED";
                return (
                    <div className="flex gap-2">
                        <AppLink route={"/movements/" + row.getValue("id")} label="Ver" />
                        {!isAnnulled && (
                            <Button
                                type="submit"
                                variant="link"
                                onClick={() => onDelete(row.getValue("id"))}
                                className="h-4"
                            >
                                {isOpen ? "Eliminar" : "Anular"}
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return colums;
}

function MovementsView() {
    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current + 1;

    const { movements } = useAppRouterLoaderData(movementsLoader);
    const fetcher = useFetcher<CustomEndpointResponse>();

    const hasError = fetcher.data && !fetcher.data.success;

    function handleDelete(id: string) {
        fetcher.submit({ id: id }, { method: "DELETE" });
    }

    // const columns: ColumnDef<IMovementDto>[] = useMemo(
    //     () => useMovementColumns(filters, setFilters, handleDelete),
    //     [],
    // );
    const columns: ColumnDef<IMovementDto>[] = useMovementColumns(handleDelete);

    return (
        <>
            {hasError && (
                <p className="my-4 p-2 rounded-md bg-red-400 text">{fetcher.data?.message}</p>
            )}
            {renderCounter.current}

            <div className="flex justify-end mb-4">
                <AppDialogWrapper dialogTitle="Crear movimiento" triggerLabel="Crear movimiento">
                    <MovementForm />
                </AppDialogWrapper>
            </div>

            <AppDataTable data={movements?.items ?? []} columns={columns} />
        </>
    );
}

export default MovementsView;
