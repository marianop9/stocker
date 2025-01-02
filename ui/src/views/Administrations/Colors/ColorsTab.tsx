import { AppDataTable } from "@/components/AppDataTable";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "@/components/AppDialog";
import { Button } from "@/components/ui/button";
import { useColors } from "@/lib/hooks/useAdministrations";
import { IColor } from "@/models/administrations";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import ColorsForm from "./ColorsForm";

function ColorsTab() {
    const queryClient = useQueryClient();
    const { data, queryKey } = useColors();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [entityToEdit, setEntityToEdit] = useState<IColor | null>(null);

    function handleCreateUpdateSuccess(cat: IColor, wasUpdate: boolean) {
        queryClient.setQueryData(queryKey, (oldData: IColor[]) =>
            wasUpdate ? oldData.map((old) => (old.id === cat.id ? cat : old)) : [...oldData, cat],
        );
        setIsDialogOpen(false);
    }

    function handleDialogOpenChange(open: boolean) {
        !open && setEntityToEdit(null);

        setIsDialogOpen(open);
    }

    const columns: ColumnDef<IColor>[] = [
        {
            accessorKey: "name",
            header: "Nombre",
        },
        {
            accessorKey: "hexcode",
            header: "Color (HEX)",
            enableColumnFilter: false,
        },
        {
            accessorKey: "code",
            header: "Código ",
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
                            setIsDialogOpen(true);
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
                <div className="ml-auto">
                    <AppDialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                        <AppDialogTrigger asChild>
                            <Button>Agregar</Button>
                        </AppDialogTrigger>
                        <AppDialogContent title="Agregar talle">
                            <ColorsForm
                                onSuccess={handleCreateUpdateSuccess}
                                formEntity={entityToEdit}
                            />
                        </AppDialogContent>
                    </AppDialog>
                </div>
            </div>
            <AppDataTable columns={columns} data={data ?? []} />
        </>
    );
}

export default ColorsTab;
