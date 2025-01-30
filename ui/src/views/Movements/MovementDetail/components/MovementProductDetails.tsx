import { IMovementDto } from "@/models/movements";
import { useMovementDetailContext } from "../movementDetailContext";
import ProductDetailList from "./ProductDetailsList";

interface StockEntryProductDetailsProps {
    movement: IMovementDto;
}

export default function MovementProductDetails({ movement }: StockEntryProductDetailsProps) {
    const { movementProducts, deleteStockMovementMutation } = useMovementDetailContext();

    async function handleDelete(productId: string, movementDetailId: string) {
        deleteStockMovementMutation.mutate(
            { productId, movementDetailId },
            {
                onError(error) {
                    console.error("stock entry product deletion failed (NO HANDLER!)", error);
                },
            },
        );
    }

    return (
        <>
            {movementProducts.entries.length > 0 && (
                <>
                    <h2 className="text-lg font-medium mb-2">Entradas</h2>
                    <ProductDetailList
                        movementProducts={movementProducts.entries}
                        movementType={movement.type}
                        onDelete={handleDelete}
                    />
                </>
            )}

            {movementProducts.exits.length > 0 && (
                <>
                    <h2 className="text-lg font-medium mt-6 mb-2">Salidas</h2>
                    <ProductDetailList
                        movementProducts={movementProducts.exits}
                        movementType={movement.type}
                        onDelete={handleDelete}
                    />
                </>
            )}
        </>
    );
}
