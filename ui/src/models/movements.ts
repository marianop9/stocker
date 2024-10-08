export interface IStockEntryDto {
    id?: string;
    reference: string;
    date: string;
}

export interface IStockEntryProductDto {
    id?: string;
    stockEntryId: string;
    productId: string;
    unitPrice: number;
}

export interface IStockEntryProductView {
    id: string;
    stockEntryId: string;
    unitPrice: number;
    productId: string;
    productName: string;
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

export interface IStockEntry extends IStockMovement {}
