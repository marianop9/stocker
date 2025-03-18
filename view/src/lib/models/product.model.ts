type Id = string;

export interface ProductModel {
	readonly id: Id;
	readonly name: string;
	readonly description: string;
	readonly categoryId: string;
	readonly categoryName: string;
	readonly providerId: string;
	readonly providerName: string;
	readonly materialId: string;
	readonly materialName: string;
	// readonly clothingTypeId: string;
	// readonly clothingTypeName: string;
	readonly unitCost: number;
	readonly cashPrice: number;
	readonly totalCost: number;
	readonly retailPrice: number;
}

export interface ProductDTO {
	readonly id: Id;
	readonly name: string;
	readonly description: string;
	readonly categoryId: string;
	readonly providerId: string;
	readonly materialId: string;
	readonly unitCost: number;
	readonly cashPrice: number;
	readonly totalCost: number;
	readonly retailPrice: number;
	readonly sku: string;
}
