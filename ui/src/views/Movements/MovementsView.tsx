import { ColumnDef } from "@tanstack/react-table";
import MovementForm from "./MovementForm";
import { IMovementDto } from "@/models/movements";
import { AppDataTable } from "@/components/AppDataTable";
import { useQuery } from "@tanstack/react-query";
import { movementService } from "@/service/movementService";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const colums: ColumnDef<IMovementDto>[] = [
    {
        header: "Id",
        accessorKey: "id",
    },
    {
        header: "Tipo",
        accessorKey: "type",
    },
    {
        header: "Fecha",
        accessorKey: "date",
    },
    {
        id: "actions",
        cell({ row }) {
            return (
                <Link to={"/movements/" + row.getValue("id")}>
                    <Button>Ver</Button>
                </Link>
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
            <div className="w-1/2 mx-auto">
                <MovementForm />
            </div>
            <AppDataTable data={data?.items ?? []} columns={colums} />
        </>
    );
}

export default MovementsView;
