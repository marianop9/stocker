export const attributeCollectionNames = ['categories', 'providers'] as const;

export abstract class ProductAttribute {
	readonly id: string;
	readonly name: string;
	readonly description?: string;

	constructor(id: string, name: string, description: string) {
		this.id = id;
		this.name = name;
		this.description = description;
	}
}

export class Category extends ProductAttribute {
	constructor(id: string, name: string, description: string) {
		super(id, name, description);
	}

	static new(name: string, description: string) {
		return new Category('', name, description);
	}
}

export class Provider extends ProductAttribute {
	constructor(id: string, name: string, description: string) {
		super(id, name, description);
	}

}
