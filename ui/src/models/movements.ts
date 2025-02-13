export const movementTypes = ["IN", "OUT", "EXCHANGE"] as const;
export type MovementType = (typeof movementTypes)[number];

export const movementTypeNames: Record<MovementType, string> = {
    IN: "Compra",
    OUT: "Venta",
    EXCHANGE: "Cambio",
};

export const movementStates = ["OPEN", "CLOSED", "ANNULLED"] as const;
export type MovementState = (typeof movementStates)[number];

export type PaymentType = "CASH" | "CARD" | "PROMO";
export function getPaymentType(pt: PaymentType) {
    switch (pt) {
        case "CASH":
            return "Contado";
        case "PROMO":
            return "Promoción";
        case "CARD":
            return "Tarjeta";
    }
}

export interface IMovementDto {
    id: string;
    date: string;
    type: MovementType;
    state: MovementState;
    reference: string;
    paymentType: PaymentType;
    discount: number;
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
