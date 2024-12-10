import { AppDataTable } from "@/components/AppDataTable";
import { AppDialogFooter } from "@/components/AppDialog";
import AppFormEntry, {
    AppFormValidationMessage,
} from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useProductUnitsListService } from "@/lib/hooks/useProductUnitsService";
import { IMovementDto, IStockEntryDto } from "@/models/movements";
import { IProductUnitView, IProductView } from "@/models/products";
import { stockEntryService } from "@/service/movementService";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

const columns: ColumnDef<IProductUnitView>[] = [
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
            />
        ),
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
        accessorKey: "sizeAlias",
        header: "Talle",
    },
];

interface Props {
    movement: IMovementDto;
    product: IProductView | null;
    onProductAdded: () => void;
}

function StockEntryAddProductsForm({
    movement,
    product,
    onProductAdded,
}: Props) {
    if (!product) return <></>;

    const { data: productUnits = [] } = useProductUnitsListService(product.id);

    const [quantity, setQuantity] = useState("");
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [quantityValidation, setQuantityValidation] = useState("");
    const [selectedRowsValidation, setSelectedRowsValidation] = useState("");

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

        const stockEntries: IStockEntryDto[] = selectedUnitIds.map(
            (prodUnitId) => ({
                id: "",
                movementId: movement.id,
                productUnitId: prodUnitId,
                quantity: qty,
            }),
        );

        const response = await stockEntryService.create(stockEntries);

        if (!response.success) {
            console.error(response.error);
        } else {
            onProductAdded();
        }
    }

    return (
        <>
            <div className="mb-4">
                <span>
                    {product.categoryName} / {product.providerName}
                </span>
                <div>{product.name}</div>
            </div>
            <div className="flex justify-between">
                <AppFormEntry
                    label="Precio"
                    name="price"
                    className="w-1/3"
                    disabled
                >
                    <Input
                        type="number"
                        defaultValue={product.price}
                        disabled
                    />
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
    );
}

export default StockEntryAddProductsForm;
