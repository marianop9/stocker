import {
    categoryService,
    colorService,
    providerService,
    sizeService,
} from "@/service/administrationsService";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categoryService.list,
    });
}

export function useProviders() {
    return useQuery({
        queryKey: ["providers"],
        queryFn: providerService.list,
    });
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
