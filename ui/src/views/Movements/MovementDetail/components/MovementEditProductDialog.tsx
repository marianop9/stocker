import {
    AppDialog,
    AppDialogClose,
    AppDialogContent,
    AppDialogFooter,
    AppDialogTrigger,
} from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMovementDetailProductsView } from "@/models/movements";
import { FormEvent, useState } from "react";
import { useMovementDetailContext } from "../movementDetailContext";
import AppLabel from "@/components/AppLabel";
import { useQuery } from "@tanstack/react-query";
import { productUnitService } from "@/service/productService";
import AppPendingIndicator from "@/components/AppPendingIndicator";

export default function StockMovementEditProductDialog({
    product,
    unitIdx,
    // indica si el producto corresponde a una entrada o salida
    isProductOutgoing,
}: {
    product: IMovementDetailProductsView;
    unitIdx: number;
    isProductOutgoing: boolean;
}) {
    const prodUnit = product.units[unitIdx];

    const [errorMsg, setErrorMsg] = useState("");

    const [open, setOpen] = useState(false);

    const { updateStockMovementMutation } = useMovementDetailContext();

    const { data: availableQuantity, ...availableQuantityQuery } = useQuery({
        queryKey: ["product-unit-quantity", prodUnit.productUnitId],
        // disable if not outgoing (exit) since availableQuantity is not needed for entries
        enabled: !!prodUnit.productUnitId && isProductOutgoing,
        queryFn: () => productUnitService.getAvailableQuantity(prodUnit.productUnitId),
    });
    const loadedAvailableQuantity = availableQuantityQuery.status === "success";

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fdata = new FormData(e.currentTarget);

        const qty = parseInt(fdata.get("quantity") as string);
        setErrorMsg("");
        if (isNaN(qty) || qty < 0) {
            setErrorMsg("Ingrese una cantidad mayor a 0.");
            return;
        }

        // validar que la cantidad de salida no supere la cantidad disponible
        if (isProductOutgoing && availableQuantity! < qty) {
            setErrorMsg("La unidad seleccionada no tiene cantidad disponible suficiente");
            return;
        }

        const movDetailId = fdata.get("movementDetailId") as string;

        updateStockMovementMutation.mutate(
            { movDetailId, qty },
            {
                onSuccess: () => {
                    setOpen(false);
                },
                onError: (error) => {
                    setErrorMsg("ocurrió un error al ejecutar el servicio");
                    console.error(error);
                },
            },
        );
    }

    return (
        <AppDialog open={open} onOpenChange={setOpen}>
            <AppDialogTrigger asChild>
                <Button className="p-0" variant="link">
                    Editar
                </Button>
            </AppDialogTrigger>
            <AppDialogContent title="Editar entrada">
                <div className="flex justify-between">
                    <AppFormEntry label="Nombre" name="" disabled>
                        <span>{product.name}</span>
                    </AppFormEntry>
                    <AppFormEntry label="Color" name="" disabled>
                        <span>{prodUnit.colorName}</span>
                    </AppFormEntry>
                    <AppFormEntry label="Talle" name="" disabled>
                        <span>{prodUnit.sizeName}</span>
                    </AppFormEntry>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        name="movementDetailId"
                        defaultValue={prodUnit.movementDetailId}
                        hidden
                    />
                    <div className="flex justify-between items-center gap-x-4">
                        <AppLabel label="Cantidad disponible">
                            <AppPendingIndicator loading={!loadedAvailableQuantity}>
                                {prodUnit.quantity}
                            </AppPendingIndicator>
                        </AppLabel>
                        <AppFormEntry label="Cantidad" name="quantity" errors={errorMsg}>
                            <Input
                                name="quantity"
                                type="number"
                                step="1"
                                autoFocus
                                onFocus={(e) => e.target.select()}
                                defaultValue={prodUnit.quantity}
                                onSubmit={(e) => console.log(e.currentTarget.value)}
                            />
                        </AppFormEntry>
                    </div>
                    <AppDialogFooter>
                        <Button asChild variant="ghost">
                            <AppDialogClose>Cancelar</AppDialogClose>
                        </Button>
                        <Button type="submit" disabled={!loadedAvailableQuantity}>
                            Guardar
                        </Button>
                    </AppDialogFooter>
                </form>
            </AppDialogContent>
        </AppDialog>
    );
}
