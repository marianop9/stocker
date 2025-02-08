import AppConfirm from "@/components/AppConfirm";
import { IMovementDetailProductsView, IMovementDto, MovementType } from "@/models/movements";
import { MovementProductsType, useMovementDetailContext } from "../movementDetailContext";
import { formatCurrency } from "@/lib/formatters";

export default function MovementCloseConfirm({
    movement,
    onConfirm,
}: {
    movement: IMovementDto;
    onConfirm: () => void;
}) {
    const { movementProducts } = useMovementDetailContext();

    function canCloseMovement(movementType: MovementType, movementProducts: MovementProductsType) {
        switch (movementType) {
            case "IN":
                return movementProducts.entries.length > 0;
            case "OUT":
                return movementProducts.exits.length > 0;
            case "EXCHANGE":
                return movementProducts.entries.length > 0 && movementProducts.exits.length > 0;
        }
    }

    function getTotal(isEntry: boolean, movementProducts: IMovementDetailProductsView[]) {
        const key: keyof IMovementDetailProductsView = isEntry ? "totalCost" : "retailPrice";

        const total = movementProducts
            .map((p) => p.units.reduce((prodTotal, unit) => prodTotal + unit.quantity * p[key], 0))
            .reduce((total, prodTotal) => total + prodTotal, 0);

        return formatCurrency(total);
    }

    return (
        <AppConfirm
            onConfirm={onConfirm}
            title="Cerrar movimiento"
            triggerLabel="Cerrar movimiento"
            triggerDisabled={
                movement.state !== "OPEN" || !canCloseMovement(movement.type, movementProducts)
            }
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
                    <p>Total: {getTotal(true, movementProducts.entries)}</p>
                </div>
                <div>
                    <h2 className="text-center text-lg font-medium mb-2">Salidas</h2>
                    <p>
                        Productos:{" "}
                        {movementProducts.exits
                            .flatMap((p) => p.units)
                            .reduce((totalQty, unit) => totalQty + unit.quantity, 0)}
                    </p>
                    <p>Total: {getTotal(false, movementProducts.exits)}</p>
                </div>
            </div>
        </AppConfirm>
    );
}
