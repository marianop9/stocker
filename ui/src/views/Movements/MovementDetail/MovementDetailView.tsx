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
import AppConfirm from "@/components/AppConfirm";

export default function MovementDetailView() {
    const movement = useLoaderData() as IMovementDto;

    const canClose = movement.state === "OPEN";
    const canDelete = movement.state === "OPEN" || movement.state === "CLOSED";

    const [isAddProductsDialogOpen, setIsAddProductsDialogOpen] = useState(false);
    const [selecetedProduct, setSelectedProduct] = useState<IProductView | null>(null);

    const submit = useSubmit();
    function closeMovement() {
        submit(null, { method: "POST" });
    }
    function deleteMovement() {
        submit(null, { method: "DELETE" });
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
                            {canDelete && (
                                <AppConfirm
                                    onConfirm={deleteMovement}
                                    triggerLabel={
                                        movement.state === "OPEN"
                                            ? "Eliminar movimiento"
                                            : "Anular movimiento"
                                    }
                                    triggerVariant="destructive"
                                >
                                    Se {movement.state === "OPEN" ? "eliminará" : "anulará"} el
                                    movimiento
                                </AppConfirm>
                            )}
                            {canClose && (
                                <MovementCloseConfirm
                                    movement={movement}
                                    onConfirm={closeMovement}
                                />
                            )}
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
