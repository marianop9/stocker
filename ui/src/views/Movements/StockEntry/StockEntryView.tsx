import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { stockEntryViewLoader } from "./stockEntryViewLoader";

import ProductSearch from "../ProductSearch";

import { Button } from "@/components/ui/button";
import { AppDialogClose, AppDialogFooter } from "@/components/AppDialog";
import { useState } from "react";
import { IProductView } from "@/models/products";
import StockEntryAddProductsDialog from "./StockEntryAddProductsDialog";
import { movementService } from "@/service/movementService";
import MovementOverview from "../MovementOverview";
import StockEntryProductDetails from "./StockEntryProductDetails";
import { useStockEntryProductsQuery } from "./useStockEntryProductsQuery";
import AppDialogWrapper from "@/components/AppDialogWrapper";
import AppLink from "@/components/AppLink";

function StockEntryView() {
    const movement = useAppRouterLoaderData(stockEntryViewLoader);

    const [isAddProductsDialogOpen, setIsAddProductsDialogOpen] =
        useState(false);

    const [selecetedProduct, setSelectedProduct] =
        useState<IProductView | null>(null);

    const { data: stockEntryProducts, invalidateQuery } =
        useStockEntryProductsQuery(movement.id);

    function handleProductAdded() {
        invalidateQuery();
        setIsAddProductsDialogOpen(false);
    }

    async function closeMovement() {
        const result = await movementService.close(movement.id);

        if (!result.success) {
            console.error(result.error);
        } else {
            alert("movimiento cerrado!");
        }
    }

    return (
        <>
            <div className="mb-4">
                <AppLink label="Volver" route="/movements" />
            </div>
            <div className="w-2/3">
                <MovementOverview movement={movement} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-8">
                <div className="">
                    <ProductSearch
                        onSelected={(product) => {
                            setIsAddProductsDialogOpen(true);
                            setSelectedProduct(product);
                        }}
                    />
                </div>
                <div className="col-span-2">
                    <StockEntryProductDetails
                        movement={movement}
                        stockEntryProducts={stockEntryProducts ?? []}
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <AppDialogWrapper
                    dialogTitle="Cerrar movimiento"
                    triggerLabel="Cerrar movimiento"
                    triggerDisabled={movement.state !== "OPEN"}
                >
                    <p>
                        Productos:{" "}
                        {stockEntryProducts
                            .flatMap((p) => p.units)
                            .reduce(
                                (totalQty, unit) => totalQty + unit.quantity,
                                0,
                            )}
                    </p>
                    <p>
                        Total:{" "}
                        {stockEntryProducts
                            .map((p) =>
                                p.units.reduce(
                                    (prodTotal, unit) =>
                                        prodTotal + unit.quantity * p.cost,
                                    0,
                                ),
                            )
                            .reduce((total, prodTotal) => total + prodTotal, 0)}
                    </p>
                    <AppDialogFooter>
                        <AppDialogClose className="mr-2">
                            Cancelar
                        </AppDialogClose>
                        <Button onClick={closeMovement}>Confirmar</Button>
                    </AppDialogFooter>
                </AppDialogWrapper>
            </div>
            <StockEntryAddProductsDialog
                open={isAddProductsDialogOpen}
                onOpenChange={setIsAddProductsDialogOpen}
                movement={movement}
                product={selecetedProduct}
                onProductAdded={handleProductAdded}
            />
        </>
    );
}

export default StockEntryView;
