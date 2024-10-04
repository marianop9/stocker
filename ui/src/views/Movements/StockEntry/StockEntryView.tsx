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
import { useQueries, useQuery } from "@tanstack/react-query";
import { stockEntryProductService } from "@/service/movementService";
import { productService, productUnitService } from "@/service/productService";
import { Button } from "@/components/ui/button";
import { AppDialog, AppDialogContent, AppDialogTrigger } from "@/components/AppDialog";
import StockEntryProductUnitForm from "./StockEntryProductUnitForm";

function StockEntryView() {
    const stockEntry = useAppRouterLoaderData(stockEntryViewLoader);

    const { data: stockEntryProducts, refetch } = useQuery({
        queryKey: ["stock-entry-products", stockEntry.id],
        queryFn: () => stockEntryProductService.list(stockEntry.id!),
        enabled: !!stockEntry.id,
    });

    return (
        <>
            <div className="p-4 w-1/2">
                <AppFormEntry label="Referencia" name="reference">
                    <Input disabled value={stockEntry.reference} />
                </AppFormEntry>
                <AppFormEntry label="Fecha" name="date">
                    <Input
                        type="date"
                        disabled
                        value={stockEntry.date.split(" ")[0]}
                    />
                </AppFormEntry>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <ProductSearch
                        stockEntryId={stockEntry.id!}
                        onSubmitted={(result) => {
                            console.log(result);
                            refetch();
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
                                    <StockEntryProductDetail productId={stockEntryProd.productId} unitPrice={stockEntryProd.unitPrice} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    );
}

interface StockEntryProductDetailProps {
    productId: string
    unitPrice: number
}
function StockEntryProductDetail({ productId, unitPrice }: StockEntryProductDetailProps) {
    const { data, isLoading } = useQuery({
        queryKey: ["stockEntryProductDetail", productId],
        queryFn: () => productService.get(productId),
    })

    if (isLoading || !data) {
        return <div>loading...</div>
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
    )
}

export default StockEntryView;
