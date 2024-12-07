import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import { IMovementDto } from "@/models/movements";

function MovementOverview({ movement }: { movement: IMovementDto }) {
    return (
        <>
            <div className="flex">
                <AppFormEntry label="Tipo" name="type" className="mr-4">
                    <Input type="type" disabled value={movement.type} />
                </AppFormEntry>
                <AppFormEntry label="Estado" name="state">
                    <Input type="state" disabled value={movement.state} />
                </AppFormEntry>
            </div>
            <AppFormEntry label="Fecha" name="date">
                <Input
                    type="date"
                    disabled
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
