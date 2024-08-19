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
