import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import { IMovementDto, IStockEntryProductView } from "@/models/movements";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import {
    AppDialog,
    AppDialogContent,
    AppDialogTrigger,
} from "@/components/AppDialog";
import { stockEntryService } from "@/service/movementService";
import { useStockEntryProductsQuery } from "./useStockEntryProductsQuery";
import { Badge } from "@/components/ui/badge";

interface StockEntryProductDetailsProps {
    movement: IMovementDto;
    stockEntryProducts: IStockEntryProductView[];
}
function StockEntryProductDetails({
    movement,
    stockEntryProducts,
}: StockEntryProductDetailsProps) {
    function productSubtotal(product: IStockEntryProductView) {
        const subtotal = product.units
            .map(
                (p) =>
                    p.quantity *
                    (movement.type === "IN" ? product.cost : product.price),
            )
            .reduce((total, val) => total + val, 0);

        return subtotal;
    }

    const { invalidateQuery } = useStockEntryProductsQuery(movement.id);

    function handleStockProductEdited() {
        invalidateQuery();
    }

    return (
        <>
            <Accordion type="single" collapsible>
                {stockEntryProducts.map((stockEntryProd) => (
                    <AccordionItem
                        key={stockEntryProd.productId}
                        value={stockEntryProd.productId}
                    >
                        <AccordionTrigger className="px-2 rounded-sm data-[state=open]:text-primary">
                            <span className="flex gap-6">
                                {stockEntryProd.name}
                                <Badge variant="secondary">
                                    {stockEntryProd.units.length > 1
                                        ? `${stockEntryProd.units.length} unidades`
                                        : "1 unidad"}
                                </Badge>
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <table className="table-fixed w-full border">
                                <thead className="bg-muted">
                                    <tr>
                                        <td className="p-2">Color</td>
                                        <td className="p-2">Talle</td>
                                        <td className="p-2">Cantidad</td>
                                        <td className="p-2">
                                            {movement.type === "IN"
                                                ? "Costo"
                                                : "Precio"}
                                        </td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockEntryProd.units.map(
                                        (unit, unitIdx) => (
                                            <tr
                                                key={unit.productUnitId}
                                                className="border"
                                            >
                                                <td className="p-2">
                                                    {unit.colorName}
                                                </td>
                                                <td className="p-2">
                                                    {unit.sizeAlias}
                                                </td>
                                                <td className="p-2">
                                                    {unit.quantity}
                                                </td>
                                                <td className="p-2">
                                                    {movement.type === "IN"
                                                        ? stockEntryProd.cost
                                                        : stockEntryProd.price}
                                                </td>
                                                <td className="p-2 flex">
                                                    <StockEntryEditProductDialog
                                                        product={stockEntryProd}
                                                        unitIdx={unitIdx}
                                                        onSubmitted={
                                                            handleStockProductEdited
                                                        }
                                                    />
                                                    <Button variant="link">
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                    <tr>
                                        <td className="p-2">
                                            Subtotal por producto
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="p-2">
                                            {productSubtotal(stockEntryProd)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}

export default StockEntryProductDetails;

function StockEntryEditProductDialog({
    product,
    unitIdx,
    onSubmitted,
}: {
    product: IStockEntryProductView;
    unitIdx: number;
    onSubmitted: () => void;
}) {
    const prodUnit = product.units[unitIdx];

    const [errorMsg, setErrorMsg] = useState("");

    const [open, setOpen] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fdata = new FormData(e.currentTarget);

        const qty = parseInt(fdata.get("quantity") as string);
        setErrorMsg("");
        if (isNaN(qty) || qty < 0) {
            setErrorMsg("Ingrese una cantidad mayor a 0.");
            return;
        }

        const stockEntryId = fdata.get("stockEntryId") as string;

        const result = await stockEntryService.setQuantity(stockEntryId, qty);
        if (!result.success) {
            setErrorMsg("ocurrió un error al ejecutar el servicio");
            console.error(result.error);
            return;
        }

        onSubmitted();
        setOpen(false);
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
                <form
                    onSubmit={handleSubmit}
                    className="flex justify-center items-center gap-x-4"
                >
                    <input
                        name="stockEntryId"
                        defaultValue={prodUnit.stockEntryId}
                        hidden
                    />
                    <AppFormEntry
                        label="Cantidad"
                        name="quantity"
                        errors={errorMsg}
                    >
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
