type Id = string;

export class ProductModel {
	readonly id: Id;
	readonly name: string;
	readonly description: string;
	readonly categoryId: string;
	readonly categoryName: string;
	readonly providerId: string;
	readonly providerName: string;
	readonly materialId: string;
	readonly materialName: string;
	readonly clothingTypeId: string;
	readonly clothingTypeName: string;
	readonly unitCost: number;
	readonly cashPrice: number;
	readonly totalCost: number;
	readonly retailPrice: number;

	constructor(
		id: Id,
		name: string,
		description: string,
		categoryId: string,
		categoryName: string,
		providerId: string,
		providerName: string,
		materialId: string,
		materialName: string,
		clothingTypeId: string,
		clothingTypeName: string,
		unitCost: number,
		cashPrice: number,
		totalCost: number,
		retailPrice: number
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.providerId = providerId;
		this.providerName = providerName;
		this.materialId = materialId;
		this.materialName = materialName;
		this.clothingTypeId = clothingTypeId;
		this.clothingTypeName = clothingTypeName;
		this.unitCost = unitCost;
		this.cashPrice = cashPrice;
		this.totalCost = totalCost;
		this.retailPrice = retailPrice;
	}
}

export class ProductDTO {
	readonly id: Id;
	readonly name: string;
	readonly description: string;
	readonly categoryId: string;
	readonly providerId: string;
	readonly materialId: string;
	readonly clothingTypeId: string;
	readonly unitCost: number;
	readonly cashPrice: number;
	readonly totalCost: number;
	readonly retailPrice: number;

	constructor(
		id: Id,
		name: string,
		description: string,
		categoryId: string,
		providerId: string,
		materialId: string,
		clothingTypeId: string,
		unitCost: number,
		cashPrice: number,
		totalCost: number,
		retailPrice: number
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.categoryId = categoryId;
		this.providerId = providerId;
		this.materialId = materialId;
		this.clothingTypeId = clothingTypeId;
		this.unitCost = unitCost;
		this.cashPrice = cashPrice;
		this.totalCost = totalCost;
		this.retailPrice = retailPrice;
	}
}
