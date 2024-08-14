export interface IProductView {
    id: string
    name: string
    description: string
    categoryId: string
    categoryName: string
    providerId: string
    providerName: string
}

export type IProductDto = {
    id: string
    name: string
    description: string
    categoryId: string
    providerId: string
}

export type IProductCreateDto = Omit<IProductDto, 'id'>
