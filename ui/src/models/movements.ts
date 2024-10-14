export interface IStockEntryProductDto {
    id?: string;
    stockEntryId: string;
    productId: string;
    unitPrice: number;
}

type MovementType = "IN" | "OUT";

// export interface IMovementView {
//     id: string;
//     date: string;
//     type: MovementType;
//     reference: string;
// }

export interface IMovementDto {
    id: string;
    date: string;
    type: MovementType;
    reference: string;
}

interface IStockMovement {
    id: string;
    movementId: string;
    productUnitId: string;
    quantity: number;
}

export interface IStockEntryDto extends IStockMovement {}

// pocketbase view collection
export interface IStockEntryProductDto {
    stockEntryId: string;
    movementId: string;
    quantity: number;
    productId: string;
    name: string;
    productUnitId: string;
    colorName: string;
    sizeAlias: string;
}

// derived from IStockEntryProductDto
export interface IStockEntryProductView {
    productId: string;
    name: string;
    movementId: string;
    units: {
        stockEntryId: string;
        quantity: number;
        productUnitId: string;
        colorName: string;
        sizeAlias: string;
    }[];
}
