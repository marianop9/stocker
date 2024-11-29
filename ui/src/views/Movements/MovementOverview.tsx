import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import { IMovementDto } from "@/models/movements";

function MovementOverview({ movement }: { movement: IMovementDto }) {
    return (
        <>
            <div className="flex justify-between">
                <AppFormEntry label="Tipo" name="type">
                    <Input type="type" disabled value={movement.type} />
                </AppFormEntry>
                <AppFormEntry label="Estado" name="state">
                    <Input type="state" disabled value={movement.state} />
                </AppFormEntry>
            </div>
            <AppFormEntry label="Fecha" name="date">
                <Input
                    type="date"
                    readOnly
                    value={movement.date.split(" ")[0]}
                />
            </AppFormEntry>
            <AppFormEntry label="Referencia" name="reference">
                <Input disabled value={movement.reference} />
            </AppFormEntry>
        </>
    );
}

export default MovementOverview;
