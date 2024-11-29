export type MovementType = "IN" | "OUT";
export type MovementState = "OPEN" | "CLOSED";

export interface IMovementDto {
    id: string;
    date: string;
    type: MovementType;
    state: MovementState;
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
    productUnitId: string;
    quantity: number;
    productId: string;
    name: string;
    cost: number;
    price: number;
    colorName: string;
    sizeAlias: string;
}

// derived from IStockEntryProductDto
export interface IStockEntryProductView {
    productId: string;
    name: string;
    cost: number;
    price: number;
    movementId: string;
    units: {
        stockEntryId: string;
        quantity: number;
        productUnitId: string;
        colorName: string;
        sizeAlias: string;
    }[];
}
