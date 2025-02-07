import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { MovementState, MovementType } from "@/models/movements";

dayjs.extend(utc);

export const getMovementType = (t: MovementType) => {
    switch (t) {
        case "IN":
            return "Entrada";
        case "OUT":
            return "Salida";
        case "EXCHANGE":
            return "Cambio";
    }
};

export const getMovementState = (s: MovementState) => {
    if (s === "OPEN") {
        return "Abierto";
    } else if (s === "CLOSED") {
        return "Cerrado";
    } else {
        return "Anulado";
    }
};

export const formatDate = (d: string) => {
    return dayjs.utc(d).format("DD/MM/YY");
};

export const formatDateTime = (d: string) => dayjs.utc(d).format("DD/MM/YY HH:mm");

export const formatCurrency = (p: number) =>
    Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(p);
