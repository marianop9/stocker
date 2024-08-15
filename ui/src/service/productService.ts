import type {
  IProductCreateDto,
  IProductDetailView,
  IProductDto,
  IProductView,
} from "@/models/products";
import { pbClient } from "./pocketbase";
import type { ListResult } from "pocketbase";
import { executeService, ServiceResponse } from "./serviceResponse";

interface IProductSerivce {
  list(): Promise<ListResult<IProductView>>;
  get(id: string): Promise<IProductView>;
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
  async create(p: IProductCreateDto) {
    const resp = await executeService(
      pbClient.products.create({
        name: p.name,
        description: p.description,
        category: p.categoryId,
        provider: p.providerId,
      })
    );

    return resp;
  },
  async update(p: IProductDto) {
    const promise = pbClient.products.update(p.id, {
      name: p.name,
      description: p.description,
      category: p.categoryId,
      provider: p.providerId,
    });

    return executeService(promise);
  },
};

interface IProductDetailService {
  list(productId: string): Promise<ListResult<IProductDetailView>>
}

export const productDetailService: IProductDetailService = {
  async list(productId: string) {
    return pbClient.productDetailsView.getList(1, 10, {
      filter: `productId = '${productId}'`
    })
  },
}