import type {
	Category,
	ProductAttribute,
	Provider,
} from '$lib/models/attributes.model';
import { _pbService } from '$lib/pocketbase';

export abstract class ProductAttributeService<T extends ProductAttribute> {
	abstract readonly collectionName: string;

	async list(): Promise<T[]> {
		return await _pbService.collection<T>(this.collectionName).getFullList();
	}

	async create(attr: T): Promise<T> {
		return await _pbService.collection(this.collectionName).create(attr);
	}

	async update(id: string, attr: T): Promise<T> {
		return await _pbService
			.collection(this.collectionName)
			.update(id, attr);
	}

	async delete(id: string): Promise<void> {
		await _pbService.collection(this.collectionName).delete(id);
	}
}

// interface IAttributeService<T extends ProductAttribute> {
// 	readonly collectionName: string;
// 	list(): Promise<T[]>;
// }

export class CategoriesService extends ProductAttributeService<Category> {
	readonly collectionName = 'categories';
}

export class ProvidersService extends ProductAttributeService<Provider> {
	readonly collectionName = 'providers';
}
