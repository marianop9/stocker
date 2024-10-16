import {
    IMovementDto,
    IStockEntryDto,
    IStockEntryProductView,
} from "@/models/movements";
import { executeService, ServiceResponse } from "./serviceResponse";
import { pbClient } from "./pocketbase";
import { ListResult } from "pocketbase";

interface IMovementService {
    list(): Promise<ListResult<IMovementDto>>;
    get(id: string): Promise<IMovementDto>;
    create(entity: IMovementDto): Promise<ServiceResponse<IMovementDto>>;
}

export const movementService: IMovementService = {
    list() {
        return pbClient.movements.getList();
    },
    get(id) {
        return pbClient.movements.getOne(id);
    },
    create(entity: IMovementDto) {
        const promise = pbClient.movements.create(entity);

        return executeService(promise);
    },
};

interface IStockEntryService {
    listProducts(movementId: string): Promise<IStockEntryProductView[]>;
    create(entity: IStockEntryDto[]): Promise<ServiceResponse<unknown>>;
    setQuantity(
        stockEntryId: string,
        qty: number,
    ): Promise<ServiceResponse<IStockEntryDto>>;
}

export const stockEntryService: IStockEntryService = {
    async listProducts(movementId: string) {
        const result = await pbClient.stockEntryProductsView.getFullList({
            filter: `movementId='${movementId}'`,
        });

        const view: IStockEntryProductView[] = [];

        for (const dto of result) {
            const idx = view.findIndex((v) => v.productId === dto.productId);

            if (idx >= 0) {
                view[idx].units.push({
                    stockEntryId: dto.stockEntryId,
                    quantity: dto.quantity,
                    productUnitId: dto.productUnitId,
                    colorName: dto.colorName,
                    sizeAlias: dto.sizeAlias,
                });
            } else {
                view.push({
                    movementId: dto.movementId,
                    productId: dto.productId,
                    name: dto.name,
                    units: [
                        {
                            stockEntryId: dto.stockEntryId,
                            quantity: dto.quantity,
                            productUnitId: dto.productUnitId,
                            colorName: dto.colorName,
                            sizeAlias: dto.sizeAlias,
                        },
                    ],
                });
            }
        }

        console.log(view);

        return view;
    },
    create(entity: IStockEntryDto[]) {
        const promise = pbClient.callCustomEndpoint(
            "movements",
            "createStockEntry",
            entity,
        );

        return executeService(promise);
    },
    setQuantity(stockEntryId, quantity) {
        const promise = pbClient.stockEntries.update(stockEntryId, {
            quantity: quantity,
        });

        return executeService(promise);
    },
};
