import AppFormEntry from "@/components/AppFormEntry";
import { IMovementDto } from "@/models/movements";
import { formatDate, getMovementState, getMovementType } from "@/lib/formatters";

function MovementOverview({ movement }: { movement: IMovementDto }) {
    return (
        <div className="grid grid-cols-2">
            <AppFormEntry label="Tipo" name="type" className="mr-4" readonly>
                {getMovementType(movement.type)}
            </AppFormEntry>
            <AppFormEntry label="Estado" name="state" readonly>
                {getMovementState(movement.state)}
            </AppFormEntry>
            <AppFormEntry label="Fecha" name="date" readonly className="col-span-2">
                {formatDate(movement.date)}
            </AppFormEntry>
            <AppFormEntry label="Referencia" name="reference" readonly className="col-span-2">
                <p>{movement.reference}</p>
            </AppFormEntry>
        </div>
    );
}

export default MovementOverview;
