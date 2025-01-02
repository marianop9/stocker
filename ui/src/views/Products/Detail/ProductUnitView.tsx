import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { productUnitLoader } from "./productUnitLoader";
import ProductForm from "../ProductForm";
import { AppDialog, AppDialogTrigger, AppDialogContent } from "@/components/AppDialog";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IProductUnitView } from "@/models/products";
import { AppDataTable } from "@/components/AppDataTable";
import ProductUnitForm from "./ProductUnitForm";
import { useProductUnitsListService } from "@/lib/hooks/useProductUnitsService";
import AppBackNavButton from "@/components/AppBackNavButton";
import { AppControlledDialogWrapper } from "@/components/AppDialogWrapper";
import { Checkbox } from "@/components/ui/checkbox";

const currencyFmt = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

function ProductUnitView() {
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [unitsDialogOpen, setUnitsDialogOpen] = useState(false);

    const [hideUnavailableVariants, setHideUnavailableVariants] = useState(false);

    const product = useAppRouterLoaderData(productUnitLoader);
    const routeParams = useParams();
    const productId = routeParams["id"]!;

    const { data: details = [], invalidate } = useProductUnitsListService(productId);

    const handleUpdatedProduct = () => {
        // product is revalidated automatically by the loader
        setProductDialogOpen(false);
    };

    function handleUnitsCreated() {
        invalidate();
        setUnitsDialogOpen(false);
    }

    return (
        <>
            <div className="mb-4">
                <AppBackNavButton />
            </div>
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
                <div className="flex">
                    <AppControlledDialogWrapper
                        dialogTitle="Agregar detalles"
                        open={unitsDialogOpen}
                        onOpenChange={setUnitsDialogOpen}
                        triggerLabel="Agregar detalles"
                    >
                        <ProductUnitForm
                            productId={product.id}
                            details={details ?? []}
                            onSubmitted={handleUnitsCreated}
                        />
                    </AppControlledDialogWrapper>

                    <div className="ml-8 flex items-center space-x-2">
                        <Checkbox
                            id="hideUnavailable"
                            checked={hideUnavailableVariants}
                            onCheckedChange={(c) => setHideUnavailableVariants(!!c)}
                        />
                        <label htmlFor="hideUnavailable" className="text-sm font-medium">
                            Ocultar variantes no disponibles
                        </label>
                    </div>
                </div>
                <AppDataTable
                    columns={productDetailsColumns}
                    data={
                        hideUnavailableVariants
                            ? details.filter((det) => det.quantity > 0)
                            : details
                    }
                />
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
