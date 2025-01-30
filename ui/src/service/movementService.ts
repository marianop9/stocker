import {
    IMovementDetailProductsDto,
    IMovementDetailProductsView,
    IMovementDto,
    IStockMovementDto,
} from "@/models/movements";
import { executeService, ServiceResponse } from "./serviceResponse";
import { CustomEndpointResponse, pbClient } from "./pocketbase";
import { ListResult } from "pocketbase";

interface IMovementService {
    list(): Promise<ListResult<IMovementDto>>;
    get(id: string): Promise<IMovementDto>;
    create(entity: IMovementDto): Promise<ServiceResponse<IMovementDto>>;
    close(id: string): Promise<CustomEndpointResponse>;
    delete(id: string): Promise<CustomEndpointResponse>;
}

export const movementService: IMovementService = {
    list() {
        return pbClient.movements.getList(1, 50, {
            sort: "-date",
        });
    },
    get(id) {
        return pbClient.movements.getOne(id);
    },
    create(entity: IMovementDto) {
        const promise = pbClient.movements.create(entity);

        return executeService(promise);
    },
    close(id) {
        const promise = pbClient.callCustomEndpoint("movements", `${id}/close`, {}, "POST");
        return promise;
    },
    delete(id) {
        const promise = pbClient.callCustomEndpoint("movements", id, {}, "DELETE");
        return promise;
    },
};

interface IStockMovementService {
    listProducts(movementId: string): Promise<IMovementDetailProductsView[]>;
    // listProducts2(
    //     movementType: MovementType,
    //     movementId: string,
    // ): Promise<IMovementDetailProductsView[]>;
    create(entity: IStockMovementDto): Promise<CustomEndpointResponse>;
    setQuantity(movDetailId: string, qty: number): Promise<IStockMovementDto>;
    delete(movDetailId: string): Promise<boolean>;
}

export const stockEntryService: IStockMovementService = {
    async listProducts(movementId: string) {
        const result = await pbClient.stockEntryProductsView.getFullList({
            filter: `movementId='${movementId}'`,
        });

        const views: IMovementDetailProductsView[] = [];

        for (const dto of result) {
            const idx = views.findIndex((v) => v.productId === dto.productId);

            if (idx >= 0) {
                views[idx].units.push({
                    movementDetailId: dto.stockEntryId,
                    quantity: dto.quantity,
                    productUnitId: dto.productUnitId,
                    colorName: dto.colorName,
                    colorHexcode: dto.colorHexcode,
                    sizeAlias: dto.sizeAlias,
                });
            } else {
                views.push({
                    movementId: dto.movementId,
                    movementType: "IN",
                    productId: dto.productId,
                    name: dto.name,
                    cost: dto.cost,
                    price: dto.price,
                    units: [
                        {
                            movementDetailId: dto.stockEntryId,
                            quantity: dto.quantity,
                            productUnitId: dto.productUnitId,
                            colorName: dto.colorName,
                            colorHexcode: dto.colorHexcode,
                            sizeAlias: dto.sizeAlias,
                        },
                    ],
                });
            }
        }

        console.log(views);

        return views;
    },
    create(entity: IStockMovementDto) {
        const promise = pbClient.callCustomEndpoint("movements", "createStockMovement", entity);

        return promise;
    },
    setQuantity(movDetailId, quantity) {
        const promise = pbClient.stockEntries.update(movDetailId, {
            quantity: quantity,
        });

        /* we use the service from a mutation so we want it throw if it fails so it's 
            handled by the mutation. executeService handles the error and wraps it in the response
            object 
        */
        // return executeService(promise);
        return promise;
    },
    delete(movDetailId) {
        const promise = pbClient.stockEntries.delete(movDetailId);
        return promise;
    },
};

export const stockExitService: IStockMovementService = {
    async listProducts(movementId) {
        const result: IMovementDetailProductsDto[] =
            await pbClient.stockExitProductsView.getFullList({
                filter: `movementId = '${movementId}'`,
            });

        const views: IMovementDetailProductsView[] = [];

        for (const dto of result) {
            const idx = views.findIndex((x) => x.productId === dto.productId);
            if (idx >= 0) {
                views[idx].units.push({
                    movementDetailId: dto.stockExitId,
                    quantity: dto.quantity,
                    productUnitId: dto.productUnitId,
                    colorName: dto.colorName,
                    colorHexcode: dto.colorHexcode,
                    sizeAlias: dto.sizeAlias,
                });
            } else {
                views.push({
                    movementId: dto.movementId,
                    movementType: "OUT",
                    productId: dto.productId,
                    name: dto.name,
                    cost: dto.cost,
                    price: dto.price,
                    units: [
                        {
                            movementDetailId: dto.stockExitId,
                            quantity: dto.quantity,
                            productUnitId: dto.productUnitId,
                            colorName: dto.colorName,
                            colorHexcode: dto.colorHexcode,
                            sizeAlias: dto.sizeAlias,
                        },
                    ],
                });
            }
        }

        return views;
    },
    create(entity: IStockMovementDto) {
        const promise = pbClient.callCustomEndpoint("movements", "createStockMovement", entity);

        return promise;
    },
    setQuantity(movDetailId, quantity) {
        const promise = pbClient.stockExits.update(movDetailId, {
            quantity: quantity,
        });

        return promise;
    },
    delete(movDetailId) {
        const promise = pbClient.stockExits.delete(movDetailId);
        return promise;
    },
};
