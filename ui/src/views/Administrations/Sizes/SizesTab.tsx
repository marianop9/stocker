import { AppDataTable } from "@/components/AppDataTable";
import {
    AppDialog,
    AppDialogContent,
    AppDialogTrigger,
} from "@/components/AppDialog";
import { Button } from "@/components/ui/button";
import { useSizes } from "@/hooks/administrations";
import { ISize } from "@/models/administrations";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef, ColumnFilter } from "@tanstack/react-table";
import { useState } from "react";
import SizesForm from "./SizesForm";
import GenericFilter from "../GenericFilter";

function SizesTab() {
    const queryClient = useQueryClient();
    const { data, queryKey } = useSizes();

    const [filter, setFilter] = useState<ColumnFilter | null>(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [entityToEdit, setEntityToEdit] = useState<ISize | null>(null);

    function handleCreateUpdateSuccess(cat: ISize, wasUpdate: boolean) {
        queryClient.setQueryData(queryKey, (oldData: ISize[]) =>
            wasUpdate
                ? oldData.map((old) => (old.id === cat.id ? cat : old))
                : [...oldData, cat],
        );
        setIsDialogOpen(false);
    }

    function handleDialogOpenChange(open: boolean) {
        !open && setEntityToEdit(null);

        setIsDialogOpen(open);
    }

    const columns: ColumnDef<ISize>[] = [
        {
            accessorKey: "alias",
            header: "Alias",
            filterFn: "includesString",
        },
        {
            accessorKey: "code",
            header: "Código",
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex justify-end">
                    <Button
                        onClick={() => console.log(row.original.id)}
                        variant="destructive"
                        className="mr-2"
                    >
                        Eliminar
                    </Button>
                    <Button
                        onClick={() => {
                            setEntityToEdit(row.original);
                            setIsDialogOpen(true)
                        }}
                    >
                        Editar
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="mb-5 flex items-center bg-gray-100 p-4 rounded-md">
                <GenericFilter<ISize>
                    propertiesToFilter={[
                        { key: "alias", label: "Alias" },
                    ]}
                    onFilterChange={(f) => setFilter(f)}
                />

                <div className="ml-auto">
                    <AppDialog
                        open={isDialogOpen}
                        onOpenChange={handleDialogOpenChange}
                    >
                        <AppDialogTrigger asChild>
                            <Button>Agregar</Button>
                        </AppDialogTrigger>
                        <AppDialogContent title="Agregar talle">
                            <SizesForm
                                onSuccess={handleCreateUpdateSuccess}
                                formEntity={entityToEdit}
                            />
                        </AppDialogContent>
                    </AppDialog>
                </div>
            </div>
            <AppDataTable
                columns={columns}
                data={data ?? []}
                filters={filter !== null ? [filter] : []}
            />
        </>
    );
}

export default SizesTab;
