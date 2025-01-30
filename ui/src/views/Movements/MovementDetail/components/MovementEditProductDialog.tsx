import { AppDialog, AppDialogContent, AppDialogTrigger } from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMovementDetailProductsView } from "@/models/movements";
import { FormEvent, useState } from "react";
import { useMovementDetailContext } from "../movementDetailContext";

export default function StockMovementEditProductDialog({
    product,
    unitIdx,
}: {
    product: IMovementDetailProductsView;
    unitIdx: number;
}) {
    const prodUnit = product.units[unitIdx];

    const [errorMsg, setErrorMsg] = useState("");

    const [open, setOpen] = useState(false);

    const { updateStockMovementMutation } = useMovementDetailContext();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fdata = new FormData(e.currentTarget);

        const qty = parseInt(fdata.get("quantity") as string);
        setErrorMsg("");
        if (isNaN(qty) || qty < 0) {
            setErrorMsg("Ingrese una cantidad mayor a 0.");
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
                <Button variant="link">Editar</Button>
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
                        <span>{prodUnit.sizeAlias}</span>
                    </AppFormEntry>
                </div>
                <form onSubmit={handleSubmit} className="flex justify-center items-center gap-x-4">
                    <input
                        name="movementDetailId"
                        defaultValue={prodUnit.movementDetailId}
                        hidden
                    />
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
                    <Button type="submit">Guardar</Button>
                </form>
            </AppDialogContent>
        </AppDialog>
    );
}
