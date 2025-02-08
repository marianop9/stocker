import type {
    IProductCreateDto,
    IProductUnitView,
    IProductDto,
    IProductView,
    IProductUnitDto,
} from "@/models/products";
import { pbClient } from "./pocketbase";
import { executeService, ServiceResponse } from "./serviceResponse";

interface IProductSerivce {
    list(): Promise<IProductView[]>;
    get(id: string): Promise<IProductView>;
    find(name: string): Promise<IProductView[]>;
    create(p: IProductCreateDto | FormData): Promise<ServiceResponse<IProductDto>>;
    update(p: IProductDto | FormData): Promise<ServiceResponse<IProductDto>>;
}

export const productService: IProductSerivce = {
    async list() {
        return pbClient.productsView.getFullList();
    },
    async get(id: string) {
        return pbClient.productsView.getOne(id);
    },
    async find(name: string) {
        const promise = pbClient.productsView.getList(1, 10, {
            filter: `name ~ '${name}'`,
        });

        const result = await executeService(promise);
        if (!result.success) {
            console.error("failed to find product: ", result.error.response);
            return [];
        }
        return result.data.items;
    },
    async create(p: IProductCreateDto | FormData) {
        const resp = await executeService(pbClient.products.create(p));

        return resp;
    },
    async update(p: IProductDto | FormData) {
        let id: string;
        if (p instanceof FormData) {
            id = p.get("id") as string;
        } else {
            id = p.id;
        }

        const promise = pbClient.products.update(id, p);

        return executeService(promise);
    },
};

interface IProductUnitService {
    list(productId: string): Promise<IProductUnitView[]>;
    createBatch(dtos: IProductUnitDto[]): Promise<ServiceResponse<any>>;
    getAvailableQuantity(id: string): Promise<number>;
}

export const productUnitService: IProductUnitService = {
    async list(productId: string) {
        return pbClient.productUnitsView.getFullList(20, {
            filter: `productId = '${productId}'`,
        });
    },
    async createBatch(dtos) {
        const promise = pbClient.callCustomEndpoint("productUnits", "createBatch", dtos);

        return executeService(promise);
    },
    async getAvailableQuantity(id: string) {
        await new Promise((res) => setTimeout(res, 3000));

        const result = await pbClient.productUnitsView.getOne(id, {
            fields: "quantity",
        });

        return result.quantity;
    },
};
