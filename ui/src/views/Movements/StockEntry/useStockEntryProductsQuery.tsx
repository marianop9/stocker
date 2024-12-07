import { stockEntryService } from "@/service/movementService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const stockEntryProductsKey = "stock-entry-products";

export function useStockEntryProductsQuery(movementId: string) {
    const { data = [] } = useQuery({
        queryKey: [stockEntryProductsKey, movementId],
        enabled: !!movementId,
        queryFn: () => stockEntryService.listProducts(movementId!),
    });

    const qc = useQueryClient();
    function invalidateQuery() {
        qc.invalidateQueries({ queryKey: [stockEntryProductsKey, movementId] });
    }

    return {
        data,
        invalidateQuery,
    };
}
