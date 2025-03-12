import PocketBase, { ClientResponseError } from 'pocketbase';
import { ProductDTO, ProductModel } from './models/product.model';
import { ResultErr, ResultOk, type Result } from './utils/result';
import { goto } from '$app/navigation';

class PocketBaseService {
	#pb: PocketBase;

	constructor(baseUrl: string) {
		this.#pb = new PocketBase(baseUrl);
		this.#pb.afterSend = (resp, data) => {
			console.log(resp.status);

			if (resp.status === 401) {
				goto('/login');
			}

			return data;
		};

		this.#pb.beforeSend = async (url, options) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		};
	}

	get products() {
		return this.#pb.collection<ProductDTO>('products');
	}
	get productsView() {
		return this.#pb.collection<ProductModel>('products_view');
	}

	get users() {
		return this.#pb.collection('users');
	}

	get authStore() {
		return this.#pb.authStore;
	}

	test() {
		this.products.getList();
	}
}

export const _pbService = new PocketBaseService('http://127.0.0.1:8090');

export async function executeService<T>(service: () => Promise<T>): Promise<Result<T>> {
	try {
		let resp = await service();
		return new ResultOk(resp);
	} catch (e) {
		console.error('error during service execution');

		if (e instanceof ClientResponseError) {
			return new ResultErr(e.response['message']);
		}
		if (e instanceof Error) {
			return new ResultErr('service threw error: ' + e.message);
		}

		return new ResultErr('unknown error type: ' + e);
	}
}

export function decodeServiceException(e: unknown): string {
	if (e instanceof ClientResponseError) {
		return e.response['message'];
	}
	if (e instanceof Error) {
		return 'service threw error: ' + e.message;
	}

	return 'unknown error type: ' + e;
}
