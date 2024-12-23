import { IMovementDetailProductsView, IStockMovementDto, MovementType } from "@/models/movements";
import { stockEntryService, stockExitService } from "@/service/movementService";
import { CustomEndpointResponse } from "@/service/pocketbase";
import { ServiceResponse } from "@/service/serviceResponse";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import { createContext, ReactNode, useContext } from "react";

type MovementDetailContextType = {
    movementProducts: IMovementDetailProductsView[];
    createStockMovementMutation: UseMutationResult<
        CustomEndpointResponse,
        ClientResponseError,
        IStockMovementDto
    >;
    updateStockMovementMutation: UseMutationResult<
        IStockMovementDto,
        ClientResponseError,
        { movDetailId: string; qty: number }
    >;
    deleteStockMovementMutation: UseMutationResult<
        boolean,
        ClientResponseError,
        { productId: string; movementDetailId: string }
    >;
};

const movementDetailContext = createContext<MovementDetailContextType | undefined>(undefined);

export function MovementDetailContextProvider({
    movementId,
    movementType,
    children,
}: {
    movementId: string;
    movementType: MovementType;
    children: ReactNode;
}) {
    const queryKey = ["movement-detail-products", movementId];

    const isStockEntry = movementType === "IN";

    const { data = [] } = useQuery({
        queryKey,
        enabled: movementId !== "",
        queryFn: () =>
            movementType === "IN"
                ? stockEntryService.listProducts(movementId)
                : stockExitService.listProducts(movementId),
    });

    const queryClient = useQueryClient();

    function invalidateQuery() {
        queryClient.invalidateQueries({ queryKey });
    }

    const createStockMovementMutation = useMutation<
        CustomEndpointResponse,
        ClientResponseError,
        IStockMovementDto
    >({
        mutationFn: (stockMovement: IStockMovementDto) =>
            isStockEntry
                ? stockEntryService.create(stockMovement)
                : stockExitService.create(stockMovement),
        onSuccess(data, variables, context) {
            if (data.success) {
                invalidateQuery();
            }
        },
    });

    const updateStockMovementMutation = useMutation<
        IStockMovementDto,
        ClientResponseError,
        { movDetailId: string; qty: number }
    >({
        mutationFn: ({ movDetailId, qty }) =>
            isStockEntry
                ? stockEntryService.setQuantity(movDetailId, qty)
                : stockExitService.setQuantity(movDetailId, qty),
        onSuccess: () => {
            invalidateQuery();
        },
    });

    const deleteStockMovementMutation = useMutation<
        boolean,
        ClientResponseError,
        { productId: string; movementDetailId: string }
    >({
        mutationFn: ({ movementDetailId }) =>
            isStockEntry
                ? stockEntryService.delete(movementDetailId)
                : stockExitService.delete(movementDetailId),
        onSuccess(_data, variables) {
            // retrieve deleted id
            const { productId, movementDetailId } = variables;
            queryClient.setQueryData(queryKey, (prev: IMovementDetailProductsView[]) =>
                prev.map((p) => {
                    if (p.productId === productId) {
                        return {
                            ...p,
                            units: p.units.filter(
                                (unit) => unit.movementDetailId !== movementDetailId,
                            ),
                        };
                    }
                    return p;
                }),
            );
        },
    });

    return (
        <movementDetailContext.Provider
            value={{
                movementProducts: data,
                createStockMovementMutation,
                updateStockMovementMutation,
                deleteStockMovementMutation,
            }}
        >
            {children}
        </movementDetailContext.Provider>
    );
}

export function useMovementDetailContext() {
    const context = useContext(movementDetailContext);

    if (context === undefined) {
        throw new Error(
            "useMovementDetailContext must be used within a MovementDetailContextProvider",
        );
    }

    return context;
}
