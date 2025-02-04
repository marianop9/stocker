export interface IProductView {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    categoryName: string;
    providerId: string;
    providerName: string;
    unitCost: number;
    totalCost: number;
    cashPrice: number;
    retailPrice: number;
    materialId: string;
    materialName: string;
    clothingTypeId: string;
    clothingTypeName: string;
    sku: string;
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
    sizeName: string;
    quantity: number;
}

export interface IProductUnitDto {
    id: string;
    productId: string;
    colorId: string;
    sizeId: string;
    quantity: number;
}
