import AppConfirm from "@/components/AppConfirm";
import { IMovementDto } from "@/models/movements";
import { useMovementDetailContext } from "../movementDetailContext";

export default function MovementCloseConfirm({
    movement,
    onConfirm,
}: {
    movement: IMovementDto;
    onConfirm: () => void;
}) {
    const { movementProducts } = useMovementDetailContext();

    return (
        <AppConfirm
            onConfirm={onConfirm}
            title="Cerrar movimiento"
            triggerLabel="Cerrar movimiento"
            triggerDisabled={movement.state !== "OPEN" || movementProducts.entries.length === 0}
        >
            <div className="flex justify-evenly">
                <div>
                    <h2 className="text-center text-lg font-medium mb-2">Entradas</h2>
                    <p>
                        Productos:{" "}
                        {movementProducts.entries
                            .flatMap((p) => p.units)
                            .reduce((totalQty, unit) => totalQty + unit.quantity, 0)}
                    </p>
                    <p>
                        Total:{" "}
                        {movementProducts.entries
                            .map((p) =>
                                p.units.reduce(
                                    (prodTotal, unit) => prodTotal + unit.quantity * p.cost,
                                    0,
                                ),
                            )
                            .reduce((total, prodTotal) => total + prodTotal, 0)}
                    </p>
                </div>
                <div>
                    <h2 className="text-center text-lg font-medium mb-2">Salidas</h2>
                    <p>
                        Productos:{" "}
                        {movementProducts.exits
                            .flatMap((p) => p.units)
                            .reduce((totalQty, unit) => totalQty + unit.quantity, 0)}
                    </p>
                    <p>
                        Total:{" "}
                        {movementProducts.exits
                            .map((p) =>
                                p.units.reduce(
                                    (prodTotal, unit) => prodTotal + unit.quantity * p.cost,
                                    0,
                                ),
                            )
                            .reduce((total, prodTotal) => total + prodTotal, 0)}
                    </p>
                </div>
            </div>
        </AppConfirm>
    );
}
