export interface IDescribable {
    id: string
    name: string
    description: string
}

export interface ICategory extends IDescribable {}

export interface Provider extends IDescribable {}
