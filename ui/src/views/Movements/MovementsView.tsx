import { ColumnDef } from "@tanstack/react-table";
import MovementForm from "./MovementForm";
import { IMovementDto } from "@/models/movements";
import { AppDataTable } from "@/components/AppDataTable";
import { useQuery } from "@tanstack/react-query";
import { movementService } from "@/service/movementService";
import AppDialogWrapper from "@/components/AppDialogWrapper";
import AppLink from "@/components/AppLink";

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
        header: "Tipo",
        accessorKey: "type",
    },
    {
        header: "Estado",
        accessorKey: "state",
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

function MovementsView() {
    const { data } = useQuery({
        queryKey: ["movements"],
        queryFn: movementService.list,
    });

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
            <AppDataTable data={data?.items ?? []} columns={colums} />
        </>
    );
}

export default MovementsView;
