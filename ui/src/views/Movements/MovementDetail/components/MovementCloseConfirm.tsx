import AppConfirm from "@/components/AppConfirm";
import { IMovementDetailProductsView, IMovementDto } from "@/models/movements";
import { useMovementDetailContext } from "../movementDetailContext";

export default function MovementCloseConfirm({ movement }: { movement: IMovementDto }) {
    const { movementProducts } = useMovementDetailContext();

    function closeMovement() {}

    return (
        <AppConfirm
            onConfirm={closeMovement}
            title="Cerrar movimiento"
            triggerLabel="Cerrar movimiento"
            triggerDisabled={movement.state !== "OPEN" || movementProducts.length === 0}
        >
            <p>
                Productos:{" "}
                {movementProducts
                    .flatMap((p) => p.units)
                    .reduce((totalQty, unit) => totalQty + unit.quantity, 0)}
            </p>
            <p>
                Total:{" "}
                {movementProducts
                    .map((p) =>
                        p.units.reduce((prodTotal, unit) => prodTotal + unit.quantity * p.cost, 0),
                    )
                    .reduce((total, prodTotal) => total + prodTotal, 0)}
            </p>
        </AppConfirm>
    );
}
