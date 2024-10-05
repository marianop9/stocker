export interface IProductView {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    categoryName: string;
    providerId: string;
    providerName: string;
    cost: number;
    price: number;
}

export interface IProductDto {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    providerId: string;
    sku: string;
    cost: number;
    price: number;
}

export type IProductCreateDto = Omit<IProductDto, "id">;

export interface IProductUnitView {
    id: string;
    productId: string;
    colorId: string;
    colorHexcode: string;
    colorName: string;
    sizeId: string;
    sizeAlias: string;
    quantity: number;
}

export interface IProductUnitDto {
    id: string;
    productId: string;
    colorId: string;
    sizeId: string;
    quantity: number;
}
