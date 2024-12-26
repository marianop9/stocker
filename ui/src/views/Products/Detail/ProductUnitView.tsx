import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { productUnitLoader } from "./productUnitLoader";
import ProductForm from "../ProductForm";
import { AppDialog, AppDialogTrigger, AppDialogContent } from "@/components/AppDialog";
import { Button } from "@/components/ui/button";
import { useParams, useRevalidator } from "react-router-dom";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IProductUnitView } from "@/models/products";
import { AppDataTable } from "@/components/AppDataTable";
import ProductUnitForm from "./ProductUnitForm";
import { useProductUnitsListService } from "@/lib/hooks/useProductUnitsService";

const currencyFmt = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

function ProductUnitView() {
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [unitsDialogOpen, setUnitsDialogOpen] = useState(false);

    const product = useAppRouterLoaderData(productUnitLoader);
    const routeParams = useParams();
    const productId = routeParams["id"] ?? "";

    const { data: details, invalidate } = useProductUnitsListService(productId);

    const { revalidate } = useRevalidator();

    const handleUpdatedProduct = () => {
        // manually revalidate product
        revalidate();
        setProductDialogOpen(false);
    };

    function handleUnitsCreated() {
        invalidate();
        setUnitsDialogOpen(false);
    }

    return (
        <>
            <div className="flex">
                <div className="h-[250px] w-[200px] bg-gray-400 mr-4"></div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>
                    <p>{product?.description}</p>
                    <div>
                        <span>
                            {product?.categoryName} / {product?.providerName}
                        </span>
                    </div>
                    <div>Costo: {currencyFmt.format(product.cost)}</div>
                    <div>Precio: {currencyFmt.format(product.price)}</div>

                    <AppDialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                        <AppDialogTrigger asChild>
                            <Button className="mt-4" variant="secondary">
                                Modificar
                            </Button>
                        </AppDialogTrigger>
                        <AppDialogContent title="Modificar producto">
                            <ProductForm product={product} afterSubmit={handleUpdatedProduct} />
                        </AppDialogContent>
                    </AppDialog>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Detalles</h2>
                <AppDialog open={unitsDialogOpen} onOpenChange={(x) => setUnitsDialogOpen(x)}>
                    <AppDialogTrigger asChild>
                        <div>
                            <Button>Agregar detalles</Button>
                        </div>
                    </AppDialogTrigger>
                    <AppDialogContent title="Agregar detalles">
                        <ProductUnitForm
                            productId={product.id}
                            details={details ?? []}
                            onSubmitted={handleUnitsCreated}
                        />
                    </AppDialogContent>
                </AppDialog>
                <AppDataTable columns={productDetailsColumns} data={details ?? []} />
            </div>
        </>
    );
}

const productDetailsColumns: ColumnDef<IProductUnitView>[] = [
    {
        header: "Id",
        accessorKey: "id",
    },
    {
        header: "Color",
        accessorKey: "colorName",
    },
    {
        header: "Talle",
        accessorKey: "sizeAlias",
    },
    {
        header: "Cantidad",
        accessorKey: "quantity",
        enableColumnFilter: false,
    },
];

export default ProductUnitView;
