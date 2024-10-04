import { AppDataTable } from "@/components/AppDataTable";
import {
    AppDialog,
    AppDialogContent,
    AppDialogTrigger,
} from "@/components/AppDialog";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/administrations";
import { ICategory } from "@/models/administrations";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef, ColumnFilter } from "@tanstack/react-table";
import { useState } from "react";
import CategoriesForm from "./CategoriesForm";
import GenericFilter from "../GenericFilter";

function categoriesColumns(
    onEdit: (row: ICategory) => void,
    onDelete: (id: string) => void,
): ColumnDef<ICategory>[] {
    return [
        {
            accessorKey: "name",
            header: "Nombre",
            filterFn: "includesString",
        },
        {
            accessorKey: "description",
            header: "Descripción",
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
                        onClick={() => onDelete(row.original.id)}
                        variant="destructive"
                        className="mr-2"
                    >
                        Eliminar
                    </Button>
                    <Button onClick={() => onEdit(row.original)}>Editar</Button>
                </div>
            ),
        },
    ];
}

function CategoriesView() {
    const queryClient = useQueryClient();
    const { data, queryKey } = useCategories();

    const [filter, setFilter] = useState<ColumnFilter | null>(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [entityToEdit, setEntityToEdit] = useState<ICategory | null>(null);

    function handleCreateUpdateSuccess(cat: ICategory, wasUpdate: boolean) {
        queryClient.setQueryData(queryKey, (oldData: ICategory[]) =>
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

    const columns = categoriesColumns(
        (entity) => {
            setEntityToEdit(entity);
            setIsDialogOpen(true);
        },
        (id) => {
            console.log(id);
        },
    );

    return (
        <>
            <div className="mb-5 flex items-center bg-gray-100 p-4 rounded-md">
                <GenericFilter<ICategory>
                    propertiesToFilter={[
                        { key: "name", label: "Nombre" },
                        { key: "code", label: "Código" },
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
                        <AppDialogContent title="Agregar categoría">
                            <CategoriesForm
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

export default CategoriesView;
