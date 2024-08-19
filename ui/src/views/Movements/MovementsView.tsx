import { ColumnDef } from "@tanstack/react-table";
import MovementForm from "./MovementForm";
import { IStockEntryDto } from "@/models/movements";
import { AppDataTable } from "@/components/AppDataTable";
import { useQuery } from "@tanstack/react-query";
import { stockEntryService } from "@/service/movementService";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const colums: ColumnDef<IStockEntryDto>[] = [
    {
        header: "Id",
        accessorKey: "id",
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
        queryKey: ["stock-entries"],
        queryFn: stockEntryService.list,
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
