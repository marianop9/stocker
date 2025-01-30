import { AppDataTable } from "@/components/AppDataTable";
import AppLink from "@/components/AppLink";
import { Button } from "@/components/ui/button";
import { IProductView } from "@/models/products";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<IProductView>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Nombre",
        filterFn: "includesString",
    },
    {
        accessorKey: "categoryName",
        header: "Categoria",
        filterFn: "includesString",
    },
    {
        accessorKey: "providerName",
        header: "Proveedor",
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        id: "actions",
        cell({ row }) {
            return (
                <Button asChild variant="secondary">
                    <AppLink route={"/products/" + row.getValue("id")} label="Ver" />
                </Button>
            );
        },
    },
];

interface Props {
    products: IProductView[];
}

function ProductsDataTable({ products }: Props) {
    return <AppDataTable data={products} columns={columns} />;
}

export default ProductsDataTable;
