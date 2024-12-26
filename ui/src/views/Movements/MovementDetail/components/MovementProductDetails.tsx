import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import { IMovementDetailProductsView, IMovementDto } from "@/models/movements";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "@/components/AppDialog";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatters";
import AppColorDisplay from "@/components/AppColorDisplay";
import { useMovementDetailContext } from "../movementDetailContext";
import AppConfirm from "@/components/AppConfirm";

interface StockEntryProductDetailsProps {
    movement: IMovementDto;
}

export default function MovementProductDetails({ movement }: StockEntryProductDetailsProps) {
    const isStockEntry = movement.type === "IN";

    function productSubtotal(product: IMovementDetailProductsView) {
        const subtotal = product.units
            .map((p) => p.quantity * (isStockEntry ? product.cost : product.price))
            .reduce((total, val) => total + val, 0);

        return subtotal;
    }

    const { movementProducts, deleteStockMovementMutation } = useMovementDetailContext();
    // const { invalidateQuery } = useStockEntryProductsQuery(movement.id);

    async function handleDelete(productId: string, movementDetailId: string) {
        deleteStockMovementMutation.mutate(
            { productId, movementDetailId },
            {
                onError(error) {
                    console.error("stock entry product deletion failed (NO HANDLER!)", error);
                },
            },
        );
    }

    return (
        <>
            <Accordion type="single" collapsible>
                {movementProducts.map((movProduct) => (
                    <AccordionItem key={movProduct.productId} value={movProduct.productId}>
                        <AccordionTrigger className="px-2 rounded-sm data-[state=open]:text-primary">
                            <span className="flex gap-6">
                                {movProduct.name}
                                <Badge variant="secondary">
                                    {movProduct.units.length > 1
                                        ? `${movProduct.units.length} variantes`
                                        : "1 variante"}
                                </Badge>
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="overflow-x-scroll">
                            <table className="table-fixed w-full border">
                                <thead className="bg-muted">
                                    <tr>
                                        <td className="p-2">Color</td>
                                        <td className="p-2">Talle</td>
                                        <td className="p-2">Cantidad</td>
                                        <td className="p-2">
                                            {isStockEntry ? "Costo" : "Precio"} unitario
                                        </td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movProduct.units.map((unit, unitIdx) => (
                                        <tr key={unit.productUnitId} className="border">
                                            <td className="p-2">
                                                <AppColorDisplay
                                                    name={unit.colorName}
                                                    hexcode={unit.colorHexcode}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <SizeBadge size={unit.sizeAlias} />
                                            </td>
                                            <td className="p-2">{unit.quantity}</td>
                                            <td className="p-2">
                                                {formatCurrency(
                                                    isStockEntry
                                                        ? movProduct.cost
                                                        : movProduct.price,
                                                )}
                                            </td>
                                            <td className="py-2 flex">
                                                <StockEntryEditProductDialog
                                                    product={movProduct}
                                                    unitIdx={unitIdx}
                                                />
                                                <AppConfirm
                                                    title="Eliminar entrada"
                                                    triggerLabel="Eliminar"
                                                    triggerVariant="link"
                                                    onConfirm={() =>
                                                        handleDelete(
                                                            movProduct.productId,
                                                            unit.movementDetailId,
                                                        )
                                                    }
                                                >
                                                    <div className="flex justify-around items-center mb-4">
                                                        <h3 className=" font-medium">
                                                            {movProduct.name}
                                                        </h3>
                                                        <AppColorDisplay
                                                            name={unit.colorName}
                                                            hexcode={unit.colorHexcode}
                                                        />
                                                        <SizeBadge size={unit.sizeAlias} />
                                                    </div>
                                                </AppConfirm>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-muted">
                                    <tr>
                                        <td className="p-2">Totales</td>
                                        <td></td>
                                        <td className="p-2">
                                            {movProduct.units.reduce(
                                                (total, { quantity }) => total + quantity,
                                                0,
                                            )}
                                        </td>
                                        <td className="p-2">
                                            {formatCurrency(productSubtotal(movProduct))}
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}

function SizeBadge({ size }: { size: string }) {
    /*
        Palette 2, Vibrant Hues
        Orange, rgb(255, 165, 0)
        Purple, rgb(128, 0, 128)
        Green, rgb(0, 128, 0)
        Blue, rgb(0, 0, 255)
        Yellow, rgb(255, 255, 0)

        Palette 5, Vibrant Hues with White Font
        Deep Orange, rgb(230, 100, 0)
        Dark Purple, rgb(100, 0, 100)
        Forest Green, rgb(0, 100, 0)
        Navy Blue, rgb(0, 0, 150)
        Golden Yellow, rgb(255, 215, 0)

        Palette 3, Pastel Tones
        Light Pink, rgb(255, 192, 203)
        Light Blue, rgb(220, 230, 250)
        Light Green, rgb(220, 250, 220)
        Light Yellow, rgb(255, 255, 192)
        Light Purple, rgb(238, 130, 238)

        Palette 6, Pastel Tones with White Font
        Soft Pink, rgb(255, 200, 200)
        Baby Blue, rgb(200, 230, 255)
        Mint Green, rgb(200, 250, 200)
        Cream Yellow, rgb(255, 255, 220)
        Lilac, rgb(230, 200, 230)
*/
    const sizeMap: Map<string, string> = new Map([
        // ["XS", "rgb(255, 190, 100)"],
        ["XS", "rgb(230, 100, 0)"],
        ["S", "rgb(100, 0, 100)"],
        ["M", "rgb(0, 100, 0)"],
        ["L", "rgb(0, 0, 150)"],
        ["XL", "rgb(255, 215, 0)"],
    ]);

    return (
        <div
            className="inline-flex items-center rounded-full border-transparent px-2.5 py-0.5 bg-primary text-primary-foreground text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:opacity-80"
            style={{ backgroundColor: sizeMap.get(size) }}
        >
            {size}
        </div>
    );
}

function StockEntryEditProductDialog({
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
