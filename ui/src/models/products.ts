export interface IProductView {
    id: string
    name: string
    description: string
    categoryId: string
    categoryName: string
    providerId: string
    providerName: string
}

export interface IProductDto {
    id: string
    name: string
    description: string
    categoryId: string
    providerId: string
}

export type IProductCreateDto = Omit<IProductDto, 'id'>

export interface IProductDetailView {
    id: string
    productId: string
    colorId: string
    colorHexcode: string
    colorName: string
    sizeId: string
    sizeAlias: string
}

export interface IProductDetailDto {
    id: string
    productId: string
    colorId: string
    sizeId: string
}

