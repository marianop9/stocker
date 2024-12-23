import AppBackNavButton from "@/components/AppBackNavButton";
import { useLoaderData } from "react-router-dom";
import { IMovementDto } from "@/models/movements";
import MovementOverview from "../MovementOverview";
import ProductSearch from "./components/ProductSearch";
import { MovementDetailContextProvider } from "./movementDetailContext";
import MovementCloseConfirm from "./components/MovementCloseConfirm";
import MovementProductDetails from "./components/MovementProductDetails";
import { AppControlledDialogWrapper } from "@/components/AppDialogWrapper";
import StockEntryAddProductsForm from "../StockEntry/StockEntryAddProductsForm";
import { IProductView } from "@/models/products";
import { useState } from "react";
import MovementAddProductsForm from "./components/MovementAddProductsForm";

export default function MovementDetailView() {
    const movement = useLoaderData() as IMovementDto;

    const [isAddProductsDialogOpen, setIsAddProductsDialogOpen] = useState(false);
    const [selecetedProduct, setSelectedProduct] = useState<IProductView | null>(null);

    async function closeMovement() {
        // fetcher.submit(null, { method: "POST" });
    }

    function handleProductAdded() {
        setIsAddProductsDialogOpen(false);
    }

    return (
        <>
            <div className="mb-4">
                <AppBackNavButton />
            </div>
            <MovementDetailContextProvider movementId={movement.id} movementType={movement.type}>
                <div className="flex">
                    <div className="w-2/3">
                        <MovementOverview movement={movement} />
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-col h-full gap-2 items-end">
                            {/* <Button>asd</Button> */}
                            <MovementCloseConfirm movement={movement} />
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
                        <MovementProductDetails movement={movement} />
                    </div>
                </div>

                <AppControlledDialogWrapper
                    dialogTitle="Agregar productos"
                    open={isAddProductsDialogOpen}
                    onOpenChange={setIsAddProductsDialogOpen}
                >
                    <MovementAddProductsForm
                        movement={movement}
                        product={selecetedProduct}
                        // stockEntryProduct={
                        //     stockEntryProducts.find((x) => x.productId === selecetedProduct?.id) ?? null
                        // }
                        onProductAdded={handleProductAdded}
                    />
                </AppControlledDialogWrapper>
            </MovementDetailContextProvider>
        </>
    );
}
