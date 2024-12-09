import { productUnitService } from "@/service/productService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useProductUnitsListService(productId: string) {
    const queryKey = ["product-details", productId];

    const { data } = useQuery({
        queryKey,
        enabled: productId !== "",
        queryFn: () => productUnitService.list(productId!),
    });

    const qc = useQueryClient();
    const invalidate = () => qc.invalidateQueries({ queryKey });

    return { data, invalidate };
}
