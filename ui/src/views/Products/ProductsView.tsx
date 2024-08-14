import ProductsDataTable from "./ProductsDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { IProductDto, IProductView } from "@/models/products";
import { Button } from "@/components/ui/button";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
    AppDialog,
    AppDialogContent,
    AppDialogTrigger,
} from "@/components/AppDialog";
import { ListResult } from "pocketbase";
import { ICategory } from "@/models/administrations";
import ProductForm from "./ProductForm";

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
                <Button asChild>
                    <Link to={"/products/" + row.getValue("id")}>Ver</Link>
                </Button>
            );
        },
    },
];

function ProductsView() {
    const navigate = useNavigate();

    const { products } = useLoaderData() as {
        products: ListResult<IProductView>;
        categories: ListResult<ICategory>;
    };

    const handleCreatedProduct = (p: IProductDto) => {
        // navigate to detail once created
        navigate(p.id);
    };

    return (
        <>
            <h1>Hello products</h1>
            <div>
                <ProductsDataTable
                    columns={columns}
                    data={products?.items ?? []}
                />
            </div>

            <AppDialog>
                <AppDialogTrigger asChild>
                    <Button>Agregar producto</Button>
                </AppDialogTrigger>
                <AppDialogContent title="Agregar producto">
                    <ProductForm afterSubmit={handleCreatedProduct} />
                </AppDialogContent>
            </AppDialog>
        </>
    );
}

export default ProductsView;
