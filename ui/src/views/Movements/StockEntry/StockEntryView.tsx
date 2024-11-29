import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { stockEntryViewLoader } from "./stockEntryViewLoader";
import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import ProductSearch from "../ProductSearch";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    AppDialog,
    AppDialogContent,
    AppDialogTrigger,
} from "@/components/AppDialog";
import { FormEvent, useState } from "react";
import { IProductView } from "@/models/products";
import StockEntryAddProductsDialog from "./StockEntryAddProductsDialog";
import { stockEntryService } from "@/service/movementService";
import { IMovementDto, IStockEntryProductView } from "@/models/movements";
import MovementOverview from "../MovementOverview";

function StockEntryView() {
    const movement = useAppRouterLoaderData(stockEntryViewLoader);

    const [isAddProductsDialogOpen, setIsAddProductsDialogOpen] =
        useState(false);

    const [selecetedProduct, setSelectedProduct] =
        useState<IProductView | null>(null);

    const { data: stockEntryProducts } = useQuery({
        queryKey: ["stock-entry-products", movement.id],
        enabled: !!movement.id,
        queryFn: () => stockEntryService.listProducts(movement.id!),
    });

    return (
        <>
            <div className="w-1/3">
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

            <StockEntryAddProductsDialog
                open={isAddProductsDialogOpen}
                onOpenChange={setIsAddProductsDialogOpen}
                movement={movement}
                product={selecetedProduct}
            />
        </>
    );
}

export default StockEntryView;

interface StockEntryProductDetailsProps {
    movement: IMovementDto;
    stockEntryProducts: IStockEntryProductView[];
}
function StockEntryProductDetails({
    movement,
    stockEntryProducts,
}: StockEntryProductDetailsProps) {
    const [errorMsg, setErrorMsg] = useState("");

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
        }
    }

    function productSubtotal(product: IStockEntryProductView) {
        let subtotal = 0;
        for (const unit of product.units) {
            if (movement.type == "IN") {
                subtotal += product.cost * unit.quantity;
            } else {
                subtotal += product.price * unit.quantity;
            }
        }

        return subtotal;
    }

    return (
        <Accordion type="single" collapsible>
            {stockEntryProducts.map((stockEntryProd) => (
                <AccordionItem
                    key={stockEntryProd.productId}
                    value={stockEntryProd.productId}
                >
                    <AccordionTrigger className="px-2 rounded-sm data-[state=open]:text-primary">
                        {stockEntryProd.name}
                    </AccordionTrigger>
                    <AccordionContent>
                        <table className="table-fixed w-full border">
                            <thead className="bg-muted">
                                <tr>
                                    <td className="p-2">Color</td>
                                    <td className="p-2">Talle</td>
                                    <td className="p-2">Cantidad</td>
                                    <td className="p-2">Precio</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {stockEntryProd.units.map((unit) => (
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
                                        <td className="p-2">{unit.quantity}</td>
                                        <td className="p-2">
                                            {stockEntryProd.price}
                                        </td>
                                        <td className="p-2 flex">
                                            <AppDialog>
                                                <AppDialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="link"
                                                    >
                                                        Editar
                                                    </Button>
                                                </AppDialogTrigger>
                                                <AppDialogContent title="Editar entrada">
                                                    <div className="flex justify-between">
                                                        <AppFormEntry
                                                            label="Nombre"
                                                            name=""
                                                            disabled
                                                        >
                                                            <span>
                                                                {
                                                                    stockEntryProd.name
                                                                }
                                                            </span>
                                                        </AppFormEntry>
                                                        <AppFormEntry
                                                            label="Color"
                                                            name=""
                                                            disabled
                                                        >
                                                            <span>
                                                                {unit.colorName}
                                                            </span>
                                                        </AppFormEntry>
                                                        <AppFormEntry
                                                            label="Talle"
                                                            name=""
                                                            disabled
                                                        >
                                                            <span>
                                                                {unit.sizeAlias}
                                                            </span>
                                                        </AppFormEntry>
                                                    </div>
                                                    <form
                                                        onSubmit={handleSubmit}
                                                        className="flex justify-center items-center gap-x-4"
                                                    >
                                                        <input
                                                            name="stockEntryId"
                                                            defaultValue={
                                                                unit.stockEntryId
                                                            }
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
                                                                onFocus={(e) =>
                                                                    e.target.select()
                                                                }
                                                                defaultValue={
                                                                    unit.quantity
                                                                }
                                                                onSubmit={(e) =>
                                                                    console.log(
                                                                        e
                                                                            .currentTarget
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </AppFormEntry>
                                                        <Button type="submit">
                                                            Guardar
                                                        </Button>
                                                    </form>
                                                </AppDialogContent>
                                            </AppDialog>
                                            <Button variant="link">
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
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
    );
}
