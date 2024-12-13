import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { MovementState, MovementType } from "@/models/movements";

dayjs.extend(utc);

export const getMovementType = (t: MovementType) => (t === "IN" ? "Entrada" : "Salida");
export const getMovementState = (s: MovementState) => (s === "OPEN" ? "Abierto" : "Cerrado");

export const formatDate = (d: string) => {
    return dayjs.utc(d).format("DD/MM/YY");
};

export const formatCurrency = (p: number) =>
    Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(p);