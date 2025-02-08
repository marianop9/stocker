export type MovementType = "IN" | "OUT" | "EXCHANGE";
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
    isReturn?: boolean;
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
    sizeName: string;
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
        sizeName: string;
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
    unitCost: number;
    totalCost: number;
    cashPrice: number;
    retailPrice: number;
    colorName: string;
    colorHexcode?: string;
    sizeName: string;
}

export interface IMovementDetailProductsView {
    movementId: string;
    movementType: MovementType;
    productId: string;
    name: string;
    unitCost: number;
    totalCost: number;
    cashPrice: number;
    retailPrice: number;
    units: {
        movementDetailId: string; // stock entry/exit
        quantity: number;
        productUnitId: string;
        colorName: string;
        colorHexcode?: string;
        sizeName: string;
    }[];
}
