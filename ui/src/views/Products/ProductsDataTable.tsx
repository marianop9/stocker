import { AppDataTable } from "@/components/AppDataTable";
import { Button } from "@/components/ui/button";
import { IProductView } from "@/models/products";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const columns: ColumnDef<IProductView>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "categoryName",
        header: "Categoria",
    },
    {
        accessorKey: "providerName",
        header: "Proveedor",
    },
    {
        id: "actions",
        cell({ row }) {
            return (
                <Button asChild variant="secondary">
                    <Link to={"/products/" + row.getValue("id")}>Ver</Link>
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
