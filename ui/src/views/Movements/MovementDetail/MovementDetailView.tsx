import AppBackNavButton from "@/components/AppBackNavButton";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import { IMovementDto } from "@/models/movements";
import MovementOverview from "../MovementOverview";
import ProductSearch from "./components/ProductSearch";
import { MovementDetailContextProvider } from "./movementDetailContext";
import MovementCloseConfirm from "./components/MovementCloseConfirm";
import MovementProductDetails from "./components/MovementProductDetails";
import { AppControlledDialogWrapper } from "@/components/AppDialogWrapper";
import { IProductView } from "@/models/products";
import { useState } from "react";
import MovementAddProductsForm from "./components/MovementAddProductsForm";
import { CustomEndpointResponse } from "@/service/pocketbase";
import AppAlert from "@/components/AppAlert";
import { Button } from "@/components/ui/button";

export default function MovementDetailView() {
    const movement = useLoaderData() as IMovementDto;

    const [isAddProductsDialogOpen, setIsAddProductsDialogOpen] = useState(false);
    const [selecetedProduct, setSelectedProduct] = useState<IProductView | null>(null);

    const submit = useSubmit();
    async function closeMovement() {
        submit(null, { method: "POST" });
    }
    const actionData = useActionData() as CustomEndpointResponse | undefined;
    const closedSuccessfully = actionData && actionData.success;

    function handleProductAdded() {
        setIsAddProductsDialogOpen(false);
    }

    return (
        <>
            <div className="mb-4">
                <AppBackNavButton />
            </div>
            {actionData && (
                <AppAlert
                    variant={closedSuccessfully ? "success" : "error"}
                    title={closedSuccessfully ? "Movimiento cerrado" : "Ocurrió un error"}
                    className="mb-4"
                >
                    <p>
                        {closedSuccessfully ? "Movimiento cerrado con éxito" : actionData.message}
                    </p>
                </AppAlert>
            )}

            <MovementDetailContextProvider movement={movement}>
                <div className="flex">
                    <div className="w-2/3">
                        <MovementOverview movement={movement} />
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-col h-full gap-2 items-end">
                            <Button onClick={() => alert("todo!")}>Eliminar movimiento</Button>
                            <MovementCloseConfirm movement={movement} onConfirm={closeMovement} />
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
                        onProductAdded={handleProductAdded}
                    />
                </AppControlledDialogWrapper>
            </MovementDetailContextProvider>
        </>
    );
}
