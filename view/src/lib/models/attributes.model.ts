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
}

export class Provider extends ProductAttribute {
	constructor(id: string, name: string, description: string) {
		super(id, name, description);
	}
}

export class Material extends ProductAttribute {
	constructor(id: string, name: string, description: string) {
		super(id, name, description);
	}
}

export class Color extends ProductAttribute {
	constructor(id: string, name: string, description: string) {
		super(id, name, description);
	}
}

export class Size extends ProductAttribute {
	constructor(id: string, name: string, description: string) {
		super(id, name, description);
	}
}
