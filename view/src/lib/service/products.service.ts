import type { ProductDTO, ProductModel } from '$lib/models/product.model';
import { _pbService, executeService } from '$lib/pocketbase';
import { ResultErr, ResultOk, type Result } from '$lib/utils/result';
import type { ListResult } from 'pocketbase';

interface IProductService {
	create(p: ProductDTO): Promise<ProductDTO>;
	update(p: ProductDTO): Promise<ProductDTO>;
	delete(id: string): Promise<void>;

	get(id: string): Promise<ProductModel>;
	list(
		filter: string,
		page: number,
		perPage: number
	): Promise<ListResult<ProductModel>>;
}

export const productsService: IProductService = {
	create: function (p: ProductDTO): Promise<ProductDTO> {
		return _pbService.products.create(p);
	},
	update: function (p: ProductDTO): Promise<ProductDTO> {
		throw new Error('Function not implemented.');
	},
	delete: function (id: string): Promise<void> {
		throw new Error('Function not implemented.');
	},
	get: function (id: string): Promise<ProductModel> {
		throw new Error('Function not implemented.');
	},
	list: async function (
		filter: string,
		page: number,
		perPage: number
	): Promise<ListResult<ProductModel>> {
		const resp = await _pbService.productsView.getList(page, perPage, {
			filter: `name ~ '${filter}'`,
		});

		return resp;
	},
};
