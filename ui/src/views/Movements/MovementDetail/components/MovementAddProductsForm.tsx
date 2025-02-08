import { AppDataTable } from "@/components/AppDataTable";
import { AppDialogFooter } from "@/components/AppDialog";
import AppFormEntry, { AppFormValidationMessage } from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useProductUnitsListService } from "@/lib/hooks/useProductUnitsService";
import { IMovementDto, IStockMovementDto } from "@/models/movements";
import { IProductUnitView, IProductView } from "@/models/products";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useMovementDetailContext } from "../movementDetailContext";
import AppAlert from "@/components/AppAlert";
import { Label } from "@/components/ui/label";
import AppColorDisplay from "@/components/AppColorDisplay";
import { formatCurrency } from "@/lib/formatters";
import AppLabel from "@/components/AppLabel";
import { Eye, EyeOff } from "lucide-react";

interface MovementAddProductsFormProps {
    movement: IMovementDto;
    product: IProductView | null;
    onProductAdded: () => void;
}

export default function MovementAddProductsForm({
    movement,
    product,
    onProductAdded,
}: MovementAddProductsFormProps) {
    const isExchange = movement.type === "EXCHANGE";
    const isEntry = movement.type === "IN";
    const isExit = movement.type === "OUT";

    const [isReturn, setIsReturn] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [quantityValidation, setQuantityValidation] = useState("");

    const [showCost, setShowCost] = useState(() => isEntry);

    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [selectedRowsValidation, setSelectedRowsValidation] = useState("");

    const [serverError, setServerError] = useState("");

    const { data: productUnits = [] } = useProductUnitsListService(product?.id ?? "");

    const { movementProducts, createStockMovementMutation } = useMovementDetailContext();
    const selectedMovementProduct = useMemo(() => {
        if (movement.type === "IN") {
            return movementProducts.entries.find((p) => p.productId === product?.id);
        } else if (movement.type === "OUT") {
            return movementProducts.exits.find((p) => p.productId === product?.id);
        } else {
            return (
                movementProducts.entries.find((p) => p.productId === product?.id) ??
                movementProducts.exits.find((p) => p.productId === product?.id)
            );
        }
    }, [movement.type, product, product?.id]);

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

        // validar que la cantidad de salida no supere la cantidad disponible
        if (isExit || (isExchange && !isReturn))
            for (const unitId of selectedUnitIds) {
                const unit = productUnits.find((u) => u.id === unitId)!;

                if (unit.quantity < qty) {
                    setSelectedRowsValidation(
                        `Una de las unidades seleccionadas no tiene cantidad disponible suficiente (${unit.quantity}).`,
                    );
                    return;
                }
            }

        const stockMovements: IStockMovementDto = {
            id: "",
            movementId: movement.id,
            isReturn,
            units: selectedUnitIds.map((prodUnitId) => ({
                productUnitId: prodUnitId,
                quantity: qty,
            })),
        };

        createStockMovementMutation.mutate(stockMovements, {
            onSuccess() {
                onProductAdded();
            },
            onError(error) {
                console.log(error.response);
                setServerError(error.response.message);
            },
        });
    }

    const columns: ColumnDef<IProductUnitView>[] = useMemo(
        () =>
            [
                {
                    id: "select-col",
                    header: ({ table }) => (
                        <Checkbox
                            checked={
                                table.getIsAllRowsSelected() ||
                                (table.getIsSomeRowsSelected() && "indeterminate")
                            }
                            onCheckedChange={(checked) =>
                                table.toggleAllPageRowsSelected(!!checked)
                            }
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
                        <AppColorDisplay
                            name={row.original.colorName}
                            hexcode={row.original.colorHexcode}
                        />
                    ),
                    enableColumnFilter: false,
                },
                {
                    accessorKey: "sizeName",
                    header: "Talle",
                    enableColumnFilter: false,
                },
                {
                    id: "stockEntryQty",
                    header: "Cant. movimiento",
                    enableColumnFilter: false,
                    cell: ({ row }) => (
                        <span>
                            {selectedMovementProduct?.units.find(
                                (x) => x.productUnitId === row.getValue("id"),
                            )?.quantity ?? "-"}
                        </span>
                    ),
                    footer: () => <Button>Agregar variantes</Button>,
                },
                {
                    header: "Cant. disponible",
                    accessorKey: "quantity",
                    enableColumnFilter: false,
                },
            ] as ColumnDef<IProductUnitView>[],
        [productUnits, selectedMovementProduct],
    );

    return (
        product && (
            <>
                {/* Se podria hacer sticky envolviendo los datos de producto con el sig. div
                    <div className="p-4 top-0 sticky bg-background z-10">
                    </div> 
                */}
                <div className="flex justify-between mb-4"></div>
                <div className="grid grid-cols-2 gap-2">
                    <AppLabel label="Producto">
                        <Label>{product.name.toUpperCase()}</Label>
                    </AppLabel>
                    <AppLabel label="Categoria">
                        <Label>{product.categoryName}</Label>
                    </AppLabel>
                    <AppLabel label="Proveedor">
                        <Label>{product.providerName}</Label>
                    </AppLabel>

                    <AppLabel label="Tipo de prenda">
                        <Label>{product.clothingTypeName}</Label>
                    </AppLabel>
                    <AppLabel label="Material">
                        <Label>{product.materialName}</Label>
                    </AppLabel>

                    <AppLabel label="Costo">
                        <div className="flex items-center">
                            <Label className="mr-2">
                                {showCost
                                    ? formatCurrency(product.totalCost)
                                    : redact(product.totalCost)}
                            </Label>
                            {!isEntry && (
                                <Button
                                    variant="ghost"
                                    className="p-0 h-4"
                                    onClick={() => setShowCost(!showCost)}
                                >
                                    {showCost ? <EyeOff size="1em" /> : <Eye size="1em" />}
                                </Button>
                            )}
                        </div>
                    </AppLabel>

                    <AppLabel label="Precio contado">
                        <Label>{formatCurrency(product.cashPrice)}</Label>
                    </AppLabel>
                    <AppLabel label="Precio lista">
                        <Label>{formatCurrency(product.retailPrice)}</Label>
                    </AppLabel>

                    <div className="flex items-center space-x-1">
                        {isExchange && (
                            <>
                                <Checkbox
                                    name="isReturn"
                                    checked={isReturn}
                                    onCheckedChange={(c) => setIsReturn(!!c)}
                                />
                                <Label htmlFor="isReturn">Es devolución</Label>
                            </>
                        )}
                    </div>

                    <AppFormEntry label="Cantidad" name="qty" errors={quantityValidation}>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </AppFormEntry>
                </div>
                {serverError && (
                    <AppAlert variant="error" title="Ocurrió un error" className="mb-2">
                        <p>{serverError}</p>
                    </AppAlert>
                )}
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

function redact(x: Object) {
    return "*".repeat(x.toString().length);
}
