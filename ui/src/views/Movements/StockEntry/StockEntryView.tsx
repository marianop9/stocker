import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { stockEntryViewLoader } from "./stockEntryViewLoader";

import ProductSearch from "../ProductSearch";

import { useState } from "react";
import { IProductView } from "@/models/products";
import StockEntryAddProductsForm from "./StockEntryAddProductsForm";
import { movementService } from "@/service/movementService";
import MovementOverview from "../MovementOverview";
import StockEntryProductDetails from "./StockEntryProductDetails";
import { useStockEntryProductsQuery } from "./useStockEntryProductsQuery";
import AppConfirm from "@/components/AppConfirm";
import AppBackNavButton from "@/components/AppBackNavButton";
import { AppControlledDialogWrapper } from "@/components/AppDialogWrapper";

function StockEntryView() {
    const movement = useAppRouterLoaderData(stockEntryViewLoader);

    const [isAddProductsDialogOpen, setIsAddProductsDialogOpen] = useState(false);

    const [selecetedProduct, setSelectedProduct] = useState<IProductView | null>(null);

    const { data: stockEntryProducts, invalidateQuery } = useStockEntryProductsQuery(movement.id);

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
                <AppBackNavButton />
            </div>
            <div className="flex">
                <div className="w-2/3">
                    <MovementOverview movement={movement} />
                </div>
                <div className="flex-grow">
                    <div className="flex flex-col h-full gap-2 items-end">
                        {/* <Button>asd</Button> */}
                        <AppConfirm
                            onConfirm={closeMovement}
                            title="Cerrar movimiento"
                            triggerLabel="Cerrar movimiento"
                            triggerDisabled={movement.state !== "OPEN"}
                        >
                            <p>
                                Productos:{" "}
                                {stockEntryProducts
                                    .flatMap((p) => p.units)
                                    .reduce((totalQty, unit) => totalQty + unit.quantity, 0)}
                            </p>
                            <p>
                                Total:{" "}
                                {stockEntryProducts
                                    .map((p) =>
                                        p.units.reduce(
                                            (prodTotal, unit) => prodTotal + unit.quantity * p.cost,
                                            0,
                                        ),
                                    )
                                    .reduce((total, prodTotal) => total + prodTotal, 0)}
                            </p>
                        </AppConfirm>
                    </div>
                </div>
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
            <AppControlledDialogWrapper
                dialogTitle="Agregar productos"
                open={isAddProductsDialogOpen}
                onOpenChange={setIsAddProductsDialogOpen}
            >
                <StockEntryAddProductsForm
                    movement={movement}
                    product={selecetedProduct}
                    stockEntryProduct={
                        stockEntryProducts.find((x) => x.productId === selecetedProduct?.id) ?? null
                    }
                    onProductAdded={handleProductAdded}
                />
            </AppControlledDialogWrapper>
        </>
    );
}

export default StockEntryView;
