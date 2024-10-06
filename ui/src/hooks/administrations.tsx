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
    const queryKey = ["colors"];
    const queryResult = useQuery({
        queryKey,
        queryFn: colorService.list,
    });

    return {
        queryKey,
        ...queryResult,
    }
}

export function useSizes() {
    const queryKey = ["sizes"];
    const queryResult = useQuery({
        queryKey,
        queryFn: sizeService.list,
    });

    return {
        queryKey,
        ...queryResult,
    }
}
