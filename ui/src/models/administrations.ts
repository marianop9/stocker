interface INamed {
    id: string;
    name: string;
}

export interface IDescribable extends INamed {
    description: string;
    code: string;
}

export interface ICategory extends IDescribable {}

export interface IProvider extends IDescribable {}

export interface IMaterial extends INamed {}

export interface IClothingType extends INamed {
    categoryId: string;
}

export interface IColor {
    id: string;
    name: string;
    hexcode: string;
    code: string;
}

export interface ISize {
    id: string;
    name: string;
    code: string;
}
