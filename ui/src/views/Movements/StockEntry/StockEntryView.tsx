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

function StockEntryView() {
    const stockEntry = useAppRouterLoaderData(stockEntryViewLoader);

    const { data: stockEntryProducts } = useQuery({
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
                        onSubmitted={console.log}
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
                                    Yes. It adheres to the WAI-ARIA design
                                    pattern.
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    );
}

export default StockEntryView;
