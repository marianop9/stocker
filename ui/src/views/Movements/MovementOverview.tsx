import AppFormEntry from "@/components/AppFormEntry";
import { getPaymentType, IMovementDto, movementTypeNames } from "@/models/movements";
import { formatDate, formatPercent, getMovementState } from "@/lib/formatters";
import AppLabel from "@/components/AppLabel";

function MovementOverview({ movement }: { movement: IMovementDto }) {
    return (
        <div className="grid grid-cols-2">
            <AppFormEntry label="Tipo" name="type" className="mr-4" readonly>
                {movementTypeNames[movement.type]}
            </AppFormEntry>
            <AppFormEntry label="Estado" name="state" readonly>
                {getMovementState(movement.state)}
            </AppFormEntry>
            <AppFormEntry label="Fecha" name="date" readonly>
                {formatDate(movement.date)}
            </AppFormEntry>
            <AppLabel label="Tipo de venta">{getPaymentType(movement.paymentType)}</AppLabel>
            <AppFormEntry label="Referencia" name="reference" readonly>
                <p>{movement.reference}</p>
            </AppFormEntry>
            {movement.paymentType === "PROMO" && (
                <AppLabel label="Descuento">{formatPercent(movement.discount)}</AppLabel>
            )}
        </div>
    );
}

export default MovementOverview;
