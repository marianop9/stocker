export type ProductSpreadsheetProcessState =
    | "PARSED"
    | "RUNNING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELED";

export function formatProductSpreadsheetProcessState(s: ProductSpreadsheetProcessState) {
    switch (s) {
        case "PARSED":
            return "Procesado";
        case "RUNNING":
            return "Ejecutando";
        case "COMPLETED":
            return "Completado";
        case "FAILED":
            return "Error";
        case "CANCELED":
            return "Cancelado";
    }
}

export interface IProductSpreadsheetProcessDto {
    id: string;
    description: string;
    state: ProductSpreadsheetProcessState;
    executed: string; // (date)
    error: string;
}
