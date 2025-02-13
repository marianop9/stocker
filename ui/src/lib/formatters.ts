import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { MovementState, MovementType } from "@/models/movements";

dayjs.extend(utc);

export const getMovementType = (t: MovementType) => {
    switch (t) {
        case "IN":
            return "Compra";
        case "OUT":
            return "Venta";
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

export const extractHTMLDate = (d: string | Dayjs) => {
    if (typeof d === "string") {
        return dayjs.utc(d).format("YYYY-MM-DD");
    }

    return d.format("YYYY-MM-DD");
};

export const formatDate = (d: string) => {
    return dayjs.utc(d).format("DD/MM/YY");
};

export const formatDateTime = (d: string) => dayjs.utc(d).format("DD/MM/YY HH:mm");

export const formatCurrency = (p: number) =>
    Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(p);

export const formatPercent = (n: number, digits = 1) =>
    Intl.NumberFormat("es-AR", {
        style: "percent",
        minimumFractionDigits: digits,
    }).format(n / 100);
