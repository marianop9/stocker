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
import { stockEntryProductService } from "@/service/movementService";
import { productService } from "@/service/productService";
import { Button } from "@/components/ui/button";
import {
    AppDialog,
    AppDialogContent,
    AppDialogTrigger,
} from "@/components/AppDialog";
import StockEntryProductUnitForm from "./StockEntryProductUnitForm";
import { useState } from "react";
import { IProductView } from "@/models/products";
import StockEntryAddProductsDialog from "./StockEntryAddProductsDialog";

function StockEntryView() {
    const movement = useAppRouterLoaderData(stockEntryViewLoader);

    const [isAddProductsDialogOpen, setIsAddProductsDialogOpen] =
        useState(false);

    const [selecetedProduct, setSelectedProduct] =
        useState<IProductView | null>(null);

    const { data: stockEntryProducts, refetch } = useQuery({
        queryKey: ["stock-entry-products", movement.id],
        queryFn: () => stockEntryProductService.list(movement.id!),
        enabled: !!movement.id,
    });

    return (
        <>
            <div className="w-1/3">
                <AppFormEntry label="Tipo" name="type">
                    <Input type="type" disabled value={movement.type} />
                </AppFormEntry>
                <AppFormEntry label="Fecha" name="date">
                    <Input
                        type="date"
                        disabled
                        value={movement.date.split(" ")[0]}
                    />
                </AppFormEntry>
                <AppFormEntry label="Referencia" name="reference">
                    <Input disabled value={movement.reference} />
                </AppFormEntry>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <ProductSearch
                        onSelected={(product) => {
                            setIsAddProductsDialogOpen(true);
                            setSelectedProduct(product);
                        }}
                    />
                </div>
                <div>
                    <Accordion type="single" collapsible>
                        {stockEntryProducts?.map((stockEntryProd) => (
                            <AccordionItem
                                key={stockEntryProd.id}
                                value={stockEntryProd.id}
                            >
                                <AccordionTrigger>
                                    {stockEntryProd.productName}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <StockEntryProductDetail
                                        productId={stockEntryProd.productId}
                                        unitPrice={stockEntryProd.unitPrice}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

            <StockEntryAddProductsDialog
                open={isAddProductsDialogOpen}
                onOpenChange={setIsAddProductsDialogOpen}
                product={selecetedProduct}
            />
        </>
    );
}

interface StockEntryProductDetailProps {
    productId: string;
    unitPrice: number;
}
function StockEntryProductDetail({
    productId,
    unitPrice,
}: StockEntryProductDetailProps) {
    const { data, isLoading } = useQuery({
        queryKey: ["stockEntryProductDetail", productId],
        queryFn: () => productService.get(productId),
    });

    if (isLoading || !data) {
        return <div>loading...</div>;
    }

    return (
        <div className="flex justify-around p-4">
            <div>
                <div>
                    <span>Categoria: </span>
                    <span>{data.categoryName}</span>
                </div>
                <div>
                    <span>Proveedor: </span>
                    <span>{data.providerName}</span>
                </div>
                <div>
                    <span>Precio: </span>
                    <span>{unitPrice}</span>
                </div>
            </div>
            <div>
                <div className="flex">
                    <h3>Unidades</h3>
                    <AppDialog>
                        <AppDialogTrigger asChild>
                            <Button size={"sm"}>Editar</Button>
                        </AppDialogTrigger>
                        <AppDialogContent title="Editar unidades">
                            <StockEntryProductUnitForm />
                        </AppDialogContent>
                    </AppDialog>
                </div>
            </div>
        </div>
    );
}

export default StockEntryView;
