import {
    categoryService,
    colorService,
    providerService,
    sizeService,
} from "@/service/administrationsService";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
    const queryKey = ["categories"];

    const queryResult = useQuery({
        queryKey,
        queryFn: categoryService.list,
    });

    return {
        queryKey,
        ...queryResult,
    };
}

export function useProviders() {
    const queryKey = ["providers"];
    const queryResult = useQuery({
        queryKey,
        queryFn: providerService.list,
    });

    return {
        queryKey,
        ...queryResult,
    };
}

export function useColors() {
    return useQuery({
        queryKey: ["colors"],
        queryFn: colorService.list,
    });
}

export function useSizes() {
    return useQuery({
        queryKey: ["sizes"],
        queryFn: sizeService.list,
    });
}
