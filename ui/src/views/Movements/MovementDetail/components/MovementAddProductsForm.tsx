import { AppDataTable } from "@/components/AppDataTable";
import { AppDialogFooter } from "@/components/AppDialog";
import AppFormEntry, { AppFormValidationMessage } from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useProductUnitsListService } from "@/lib/hooks/useProductUnitsService";
import {
    IMovementDto,
    IStockEntryDto,
    IStockEntryProductView,
    IStockMovementDto,
} from "@/models/movements";
import { IProductUnitView, IProductView } from "@/models/products";
import { stockEntryService } from "@/service/movementService";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useMovementDetailContext } from "../movementDetailContext";
import AppAlert from "@/components/AppAlert";

interface MovementAddProductsFormProps {
    movement: IMovementDto;
    product: IProductView | null;
    // stockEntryProduct: IStockEntryProductView | null;
    onProductAdded: () => void;
}

export default function MovementAddProductsForm({
    movement,
    product,
    onProductAdded,
}: MovementAddProductsFormProps) {
    const [quantity, setQuantity] = useState("");
    const [quantityValidation, setQuantityValidation] = useState("");

    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [selectedRowsValidation, setSelectedRowsValidation] = useState("");

    const [serverError, setServerError] = useState("");

    const { data: productUnits = [] } = useProductUnitsListService(product?.id ?? "");

    const { movementProducts, createStockMovementMutation } = useMovementDetailContext();
    const selectedMovementProduct = movementProducts.find((p) => p.productId === product?.id);

    async function handleSave() {
        setQuantityValidation("");
        const qty = parseInt(quantity);
        if (isNaN(qty) || qty <= 0) {
            setQuantityValidation("Ingrese un número mayor a 0.");
            return;
        }

        setSelectedRowsValidation("");
        const selectedUnitIds = Object.keys(selectedRows);
        console.log(selectedUnitIds);
        if (selectedUnitIds.length === 0) {
            setSelectedRowsValidation("Seleccione al menos una unidad.");
            return;
        }

        const stockMovements: IStockMovementDto = {
            id: "",
            movementId: movement.id,
            units: selectedUnitIds.map((prodUnitId) => ({
                productUnitId: prodUnitId,
                quantity: qty,
            })),
        };

        createStockMovementMutation.mutate(stockMovements, {
            onSuccess(data, variables, context) {
                onProductAdded();
            },
            onError(error, variables, context) {
                console.log(error.response);
                setServerError(error.response.message);
            },
        });
    }

    const columns: ColumnDef<IProductUnitView>[] = useMemo(
        () => [
            {
                id: "select-col",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllRowsSelected() ||
                            (table.getIsSomeRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={row.getToggleSelectedHandler()}
                        disabled={
                            selectedMovementProduct?.units.find(
                                (x) => x.productUnitId === row.getValue("id"),
                            ) !== undefined
                        }
                    />
                ),
            },
            {
                accessorKey: "id",
            },
            {
                accessorKey: "colorName",
                header: "Color",
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <span>{row.original.colorName}</span>
                        <div
                            className="h-4 w-4 rounded-sm border-primary border"
                            style={{ backgroundColor: row.original.colorHexcode }}
                        ></div>
                    </div>
                ),
            },
            {
                id: "stockEntryQty",
                header: "Cantidad",
                cell: ({ row }) => (
                    <span>
                        {selectedMovementProduct?.units.find(
                            (x) => x.productUnitId === row.getValue("id"),
                        )?.quantity ?? "-"}
                    </span>
                ),
                meta: {
                    align: "right",
                },
            },
            {
                accessorKey: "sizeAlias",
                header: "Talle",
            },
        ],
        [productUnits, selectedMovementProduct],
    );

    return (
        product && (
            <>
                {/* Se podria hacer sticky envolviendo los datos de producto con el sig. div
                    <div className="p-4 top-0 sticky bg-background z-10">
                    </div> 
                */}
                <div className="flex justify-between mb-4">
                    <AppFormEntry label="Producto" name="" readonly>
                        <div>{product.name}</div>
                    </AppFormEntry>
                    <AppFormEntry label="Categoria / Proveedor" name="" readonly>
                        {product.categoryName} / {product.providerName}
                    </AppFormEntry>
                </div>
                <div className="flex justify-between">
                    <AppFormEntry label="Precio" name="price" className="w-1/3" readonly>
                        {product.price}
                    </AppFormEntry>
                    <AppFormEntry
                        label="Cantidad"
                        name="qty"
                        className="w-1/3"
                        errors={quantityValidation}
                    >
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </AppFormEntry>
                </div>
                <AppAlert variant="error" message={serverError} />
                <AppDataTable
                    columns={columns}
                    data={productUnits}
                    getRowId={(row) => row.id}
                    rowSelection={selectedRows}
                    onRowSelectionChange={setSelectedRows}
                />
                <AppFormValidationMessage message={selectedRowsValidation} />
                <AppDialogFooter className="flex justify-end">
                    <Button onClick={handleSave}>Agregar</Button>
                </AppDialogFooter>
            </>
        )
    );
}
