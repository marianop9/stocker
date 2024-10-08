import { AppDataTable } from "@/components/AppDataTable";
import {
    AppDialog,
    AppDialogContent,
    AppDialogFooter,
} from "@/components/AppDialog";
import AppFormEntry, {
    AppFormValidationMessage,
} from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { IProductUnitView, IProductView } from "@/models/products";
import { productUnitService } from "@/service/productService";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

interface Props {
    open: boolean;
    onOpenChange(open: boolean): void;
    product: IProductView | null;
}

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
    },
    {
        accessorKey: "sizeAlias",
        header: "Talle",
    },
];

function StockEntryAddProductsDialog({ open, onOpenChange, product }: Props) {
    if (!product) return <></>;

    const { data: productUnits = [] } = useQuery({
        queryKey: ["product-units", product.id],
        queryFn: () => productUnitService.list(product.id),
    });

    const [quantity, setQuantity] = useState("");
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [quantityValidation, setQuantityValidation] = useState("");
    const [selectedRowsValidation, setSelectedRowsValidation] = useState("");

    function handleSave() {
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
    }

    return (
        <AppDialog open={open} onOpenChange={onOpenChange}>
            <AppDialogContent title="Agregar productos">
                <div className="mb-4">
                    <span>
                        {product.categoryName} / {product.providerName}
                    </span>
                    <div>{product.name}</div>
                </div>
                <div className="flex justify-between">
                    <AppFormEntry label="Precio" name="price" className="w-1/3">
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
                    getRowId={(row) => row.id}
                    columns={columns}
                    data={productUnits}
                    rowSelection={selectedRows}
                    onRowSelectionChange={setSelectedRows}
                />
                <AppFormValidationMessage message={selectedRowsValidation} />
                <AppDialogFooter className="flex justify-end">
                    <Button onClick={handleSave}>Agregar</Button>
                </AppDialogFooter>
            </AppDialogContent>
        </AppDialog>
    );
}

export default StockEntryAddProductsDialog;
