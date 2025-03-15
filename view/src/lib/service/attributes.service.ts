import type {
	Category,
	Color,
	ProductAttribute,
	Provider,
    Size,
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

export class MaterialsService extends ProductAttributeService<Provider> {
	readonly collectionName = 'materials';
}

export class ColorsService extends ProductAttributeService<Color> {
	readonly collectionName = 'colors';
}

export class SizesService extends ProductAttributeService<Size> {
	readonly collectionName = 'sizes';
}
