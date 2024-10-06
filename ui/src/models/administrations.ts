export interface IDescribable {
    id: string;
    name: string;
    description: string;
    code: string;
}

export interface ICategory extends IDescribable {}

export interface IProvider extends IDescribable {}

export interface IColor {
    id: string;
    name: string;
    hexcode: string;
    code: string;
}

export interface ISize {
    id: string;
    alias: string;
    code: string;
}
    