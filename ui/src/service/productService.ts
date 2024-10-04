import type {
    IProductCreateDto,
    IProductUnitView,
    IProductDto,
    IProductView,
    IProductUnitDto,
} from "@/models/products";
import { pbClient } from "./pocketbase";
import type { ListResult } from "pocketbase";
import { executeService, ServiceResponse } from "./serviceResponse";

interface IProductSerivce {
    list(): Promise<ListResult<IProductView>>;
    get(id: string): Promise<IProductView>;
    find(name: string): Promise<IProductView[]>;
    create(p: IProductCreateDto): Promise<ServiceResponse<IProductDto>>;
    update(p: IProductDto): Promise<ServiceResponse<IProductDto>>;
}

export const productService: IProductSerivce = {
    async list() {
        return pbClient.productsView.getList();
    },
    async get(id: string) {
        return pbClient.productsView.getOne(id);
    },
    async find(name: string) {
        return pbClient.productsView.getFullList(20, {
            filter: `name ~ '${name}'`,
        });
    },
    async create(p: IProductCreateDto) {
        const resp = await executeService(pbClient.products.create(p));

        return resp;
    },
    async update(p: IProductDto) {
        const promise = pbClient.products.update(p.id, p);

        return executeService(promise);
    },
};

interface IProductUnitService {
    list(productId: string): Promise<IProductUnitView[]>;
    createBatch(dtos: IProductUnitDto[]): Promise<boolean>;
}

export const productUnitService: IProductUnitService = {
    async list(productId: string) {
        return pbClient.productUnitsView.getFullList(20, {
            filter: `productId = '${productId}'`,
        });
    },
    async createBatch(dtos) {
        const success: boolean = await pbClient
            .getInternalClient()
            .send("/api/custom/productUnits/createBatch", {
                body: dtos,
                method: "POST",
            });

        return success;
    },
};
