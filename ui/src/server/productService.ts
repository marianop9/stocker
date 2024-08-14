import type {
  IProductCreateDto,
  IProductDto,
  IProductView,
} from "@/models/products";
import { pbClient } from "./pocketbase";
import type { ListResult } from "pocketbase";

export type ServiceResponse<T> = ServiceSuccess<T> | ServiceError;

class ServiceSuccess<T> {
  success: true;
  data: T;

  constructor(data: T) {
    this.success = true;
    this.data = data;
  }
}
class ServiceError {
  success: false;
  error: ClientResponseError;

  constructor(error: ClientResponseError) {
    this.success = false;
    this.error = error;
  }
}

type ClientResponseError = {
  url: string; // requested url
  status: number; // response status code
  response: PocketBaseError; // the API JSON error response
  isAbort: boolean; // is abort/cancellation error
  originalError: Error | null; // the original non-normalized error
};

function isClientResponseError(err: unknown): err is ClientResponseError {
  const error = err as ClientResponseError;

  return (
    error &&
    typeof error.isAbort === "boolean" &&
    typeof error.originalError === "object"
  );
}

async function executeService<T>(
  promise: Promise<T>
): Promise<ServiceResponse<T>> {
  try {
    const result = await promise;

    return new ServiceSuccess(result);
  } catch (error) {
    if (isClientResponseError(error)) {
      const resp = new ServiceError(error);
      console.error(resp);
      return resp;
    } else {
      throw error;
    }
  }
}

type PocketBaseError = {
  code: number;
  message: string;
  data: unknown;
};

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
