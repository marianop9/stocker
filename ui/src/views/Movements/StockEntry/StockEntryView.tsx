import useAppRouterLoaderData from "@/lib/hooks/useAppRouterLoaderData";
import { stockEntryViewLoader } from "./stockEntryViewLoader";
import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";

function StockEntryView() {
    const data = useAppRouterLoaderData(stockEntryViewLoader);

    return (
        <div className="p-4 w-1/2">
            <AppFormEntry label="Referencia" name="reference">
                <Input disabled value={data.reference} />
            </AppFormEntry>
            <AppFormEntry label="Fecha" name="date">
                <Input type="date" disabled value={data.date.split(' ')[0]} />
            </AppFormEntry>

        </div>
    );
}

export default StockEntryView;
