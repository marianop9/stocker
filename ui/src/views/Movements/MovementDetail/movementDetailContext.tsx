import {
    IMovementDetailProductsView,
    IMovementDto,
    IStockMovementDto,
    MovementType,
} from "@/models/movements";
import { stockEntryService, stockExitService } from "@/service/movementService";
import { CustomEndpointResponse } from "@/service/pocketbase";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import { createContext, ReactNode, useContext } from "react";

export type MovementProductsType = {
    entries: IMovementDetailProductsView[];
    exits: IMovementDetailProductsView[];
};

type MovementDetailContextType = {
    movementType: MovementType;
    movement: IMovementDto;
    movementProducts: MovementProductsType;
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
    movement,
    children,
}: {
    movement: IMovementDto;
    children: ReactNode;
}) {
    const movementId = movement.id;
    const movementType = movement.type;

    const queryKey = ["movement-detail-products", movementId];

    const isStockEntry = movementType === "IN";

    const { data = { entries: [], exits: [] } } = useQuery<MovementProductsType>({
        queryKey,
        enabled: movementId !== "",
        queryFn: async () => {
            if (movementType === "IN") {
                return {
                    entries: await stockEntryService.listProducts(movementId),
                    exits: [],
                };
            } else if (movementType === "OUT") {
                return { entries: [], exits: await stockExitService.listProducts(movementId) };
            } else if (movementType === "EXCHANGE") {
                const entries = stockEntryService.listProducts(movementId);
                const exits = stockExitService.listProducts(movementId);
                return {
                    entries: await entries,
                    exits: await exits,
                } satisfies MovementProductsType;
            }

            return { entries: [], exits: [] };
        },
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
        onSuccess(data, _variables, _context) {
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
            // manually update query data
            queryClient.setQueryData(queryKey, (prev: MovementProductsType) => {
                switch (movementType) {
                    case "IN":
                        return {
                            ...prev,
                            entries: removeMovementDetailUnit(
                                prev.entries,
                                productId,
                                movementDetailId,
                            ),
                        };
                    case "OUT":
                        return {
                            ...prev,
                            exits: removeMovementDetailUnit(
                                prev.exits,
                                productId,
                                movementDetailId,
                            ),
                        };
                    case "EXCHANGE":
                        return {
                            entries: removeMovementDetailUnit(
                                prev.entries,
                                productId,
                                movementDetailId,
                            ),
                            exits: removeMovementDetailUnit(
                                prev.exits,
                                productId,
                                movementDetailId,
                            ),
                        };
                }
            });
        },
    });

    return (
        <movementDetailContext.Provider
            value={{
                movementType,
                movement,
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

// removes the unit corresponding to <movDetailId> for the given productId in the IMovementDetailProductsView array
function removeMovementDetailUnit(
    movementDetailProducts: IMovementDetailProductsView[],
    productId: string,
    movementDetailId: string,
): IMovementDetailProductsView[] {
    const afterRemoveDetail = movementDetailProducts.map((movDetProd) => {
        if (movDetProd.productId === productId) {
            return {
                ...movDetProd,
                units: movDetProd.units.filter(
                    (unit) => unit.movementDetailId !== movementDetailId,
                ),
            };
        }
        return movDetProd;
    });

    // remove movement products with empty units
    return afterRemoveDetail.filter((movDetProd) => movDetProd.units.length > 0);
}
