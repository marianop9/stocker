import type { ProductDTO, ProductModel } from '$lib/models/product.model';
import { _pbService, executeService } from '$lib/pocketbase';
import { ResultErr, ResultOk, type Result } from '$lib/utils/result';

interface IProductService {
	create(p: ProductDTO): Promise<ProductDTO>;
	update(p: ProductDTO): Promise<ProductDTO>;
	delete(id: string): Promise<void>;

	get(id: string): Promise<ProductModel>;
	list(fetchFn: typeof fetch): Promise<ProductModel[]>;
}

export const productService: IProductService = {
	create: function (p: ProductDTO): Promise<ProductDTO> {
		throw new Error('Function not implemented.');
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
	list: async function (fetchFn: typeof fetch): Promise<ProductModel[]> {
		// const resp = await executeService(() =>
		// 	_pbService.products.getList(1, 30, {
		// 		// fetch: fetchFn
		// 	})
		// );

        const resp = await _pbService.productsView.getList(1, 30);

        return resp.items;
    }
};
