import {
    IMovementDto,
    IStockEntryDto,
    IStockEntryProductDto,
    IStockEntryProductView,
} from "@/models/movements";
import { executeService, ServiceResponse } from "./serviceResponse";
import { pbClient } from "./pocketbase";
import { ListResult } from "pocketbase";

export interface IStockEntryService {
    list(): Promise<ListResult<IStockEntryDto>>;
    get(id: string): Promise<IStockEntryDto>;
    create(dto: IStockEntryDto): Promise<ServiceResponse<IStockEntryDto>>;
}

export const stockEntryService: IStockEntryService = {
    async list() {
        return pbClient.stockEntries.getList(1, 15);
    },
    async get(id) {
        return pbClient.stockEntries.getOne(id, {
            fields: "id, reference, date",
        });
    },
    async create(dto) {
        const response = await executeService(
            pbClient.stockEntries.create<IStockEntryDto>(dto),
        );

        return response;
    },
};

export interface IStockEntryProductService {
    list(stockEntryId: string): Promise<IStockEntryProductView[]>;
    addProduct(
        dto: IStockEntryProductDto,
    ): Promise<ServiceResponse<IStockEntryProductDto>>;
}

export const stockEntryProductService: IStockEntryProductService = {
    async list(stockEntryId) {
        type stockEntryProductListResponse = IStockEntryProductDto & {
            expand: {
                productId: {
                    name: string;
                };
            };
        };
        const result =
            await pbClient.stockEntryProducts.getFullList<stockEntryProductListResponse>(
                {
                    filter: `stockEntryId = '${stockEntryId}'`,
                    expand: "productId",
                    fields: "*, expand.productId.name",
                },
            );

        return result.map((r) => ({
            id: r.id ?? "",
            stockEntryId: r.stockEntryId,
            unitPrice: r.unitPrice,
            productId: r.productId,
            productName: r.expand.productId.name,
        }));
    },
    async addProduct(dto) {
        const response = await executeService(
            pbClient.stockEntryProducts.create(dto),
        );

        return response;
    },
};

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
    async create(entity: IMovementDto) {
        const promise = pbClient.movements.create(entity);

        return executeService(promise);
    },
};
