export type MovementType = "IN" | "OUT";
export type MovementState = "OPEN" | "CLOSED" | "ANNULLED";

export interface IMovementDto {
    id: string;
    date: string;
    type: MovementType;
    state: MovementState;
    reference: string;
}

export interface IStockMovementDto {
    id: string;
    movementId: string;
    units: {
        productUnitId: string;
        quantity: number;
    }[];
}

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
    colorHexcode: string;
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
        colorHexcode: string;
        sizeAlias: string;
    }[];
}

// pocketbase view collection
export interface IMovementDetailProductsDto {
    stockEntryId: string;
    stockExitId: string;
    movementId: string;
    productUnitId: string;
    quantity: number;
    productId: string;
    name: string;
    cost: number;
    price: number;
    colorName: string;
    colorHexcode: string;
    sizeAlias: string;
}

export interface IMovementDetailProductsView {
    movementId: string;
    movementType: MovementType;
    productId: string;
    name: string;
    cost: number;
    price: number;
    units: {
        movementDetailId: string; // stock entry/exit
        quantity: number;
        productUnitId: string;
        colorName: string;
        colorHexcode: string;
        sizeAlias: string;
    }[];
}
