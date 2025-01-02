import { AppDataTable } from "@/components/AppDataTable";
import { AppDialog, AppDialogTrigger, AppDialogContent } from "@/components/AppDialog";
import { Button } from "@/components/ui/button";
import { useProviders } from "@/lib/hooks/useAdministrations";
import { IProvider } from "@/models/administrations";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProvidersForm from "./ProvidersForm";

function ProvidersTab() {
    const queryClient = useQueryClient();
    const { data, queryKey } = useProviders();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [entityToEdit, setEntityToEdit] = useState<IProvider | null>(null);

    function handleCreateUpdateSuccess(cat: IProvider, wasUpdate: boolean) {
        queryClient.setQueryData(queryKey, (oldData: IProvider[]) =>
            wasUpdate ? oldData.map((old) => (old.id === cat.id ? cat : old)) : [...oldData, cat],
        );
        setIsDialogOpen(false);
    }

    function handleDialogOpenChange(open: boolean) {
        !open && setEntityToEdit(null);

        setIsDialogOpen(open);
    }

    const columns: ColumnDef<IProvider>[] = [
        {
            accessorKey: "name",
            header: "Nombre",
            filterFn: "includesString",
        },
        {
            accessorKey: "description",
            header: "Descripción",
            enableColumnFilter: false,
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
            <div className="mb-5 flex bg-gray-100 p-4 rounded-md items-center">
                <div className="ml-auto">
                    <AppDialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                        <AppDialogTrigger asChild>
                            <Button>Agregar</Button>
                        </AppDialogTrigger>
                        <AppDialogContent title="Agregar categoría">
                            <ProvidersForm
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

export default ProvidersTab;
