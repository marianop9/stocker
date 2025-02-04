import AppFormEntry from "@/components/AppFormEntry";
import AppSelect from "@/components/AppSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProductUnitDto, IProductUnitView } from "@/models/products";
import { colorService, sizeService } from "@/service/administrationsService";
import { productUnitService } from "@/service/productService";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useMemo, useState } from "react";

interface Props {
    productId: string;
    details: IProductUnitView[];
    onSubmitted(): void;
}

function ProductUnitForm({ productId, details, onSubmitted }: Props) {
    const [selectedColor, setSelectedColor] = useState<string>("");

    const [hasInitialQty, setHasInitialQty] = useState(false);
    const [quantity, setQuantity] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const { data: colors } = useQuery({
        queryKey: ["colors"],
        queryFn: colorService.list,
    });

    const { data: sizes } = useQuery({
        queryKey: ["sizes"],
        queryFn: sizeService.list,
    });

    const newSizesByColor = useMemo(() => {
        if (!sizes || selectedColor === "") return [];

        const existingSizesByColor = details
            .filter((det) => det.colorId === selectedColor)
            .map((det) => det.sizeId);

        return sizes.filter((s) => !existingSizesByColor.includes(s.id));
    }, [sizes, details, selectedColor]);

    useEffect(() => {
        !hasInitialQty && setQuantity("");
    }, [hasInitialQty]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");

        const qty = parseInt(quantity);
        if ((hasInitialQty && isNaN(qty)) || qty < 0) {
            setErrorMsg("Ingrese una cantidad válida.");
            return;
        }

        const formData = new FormData(e.currentTarget);

        const selectedSizeIds = formData.getAll("sizeId");
        if (selectedSizeIds.length === 0) {
            setErrorMsg("Seleccione un color y al menos un talle.");
            return;
        }

        const dtos: IProductUnitDto[] = [];

        for (let sizeId of selectedSizeIds) {
            dtos.push({
                id: "",
                productId: productId,
                colorId: selectedColor,
                sizeId: sizeId.toString(),
                quantity: qty,
            });
        }
        console.log(dtos);

        const response = await productUnitService.createBatch(dtos);
        console.log(response);

        if (!response.success) {
            console.error("ocurrió un error al intentar crear las unidades, implementar...");
        }
        onSubmitted();
    };

    return (
        <form onSubmit={handleSubmit}>
            <AppFormEntry name="color" label="Color">
                <AppSelect
                    name="color"
                    options={
                        colors?.map((c) => ({
                            label: c.name,
                            value: c.id,
                        })) ?? []
                    }
                    placeholder="Seleccione un color..."
                    defaultValue={selectedColor}
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                />
            </AppFormEntry>

            <div className="p-2 border rounded mb-2">
                <h4>Talles</h4>
                <div className="flex justify-evenly">
                    {newSizesByColor.map((size) => (
                        <div key={size.id + selectedColor} className="flex items-top space-x-2">
                            <Checkbox name="sizeId" value={size.id} />
                            <Label>{size.name}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="setInitialQty"
                        checked={hasInitialQty}
                        onCheckedChange={(x) => setHasInitialQty(x !== "indeterminate" && x)}
                    />
                    <Label htmlFor="setInitialQty">Tiene cantidad inicial</Label>
                </div>
                <AppFormEntry name="quantity" label="Cantidad" disabled={!hasInitialQty}>
                    <Input
                        type="number"
                        disabled={!hasInitialQty}
                        value={quantity}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val.length === 0) {
                                setQuantity(val);
                            } else {
                                !isNaN(parseInt(val)) && setQuantity(val);
                            }
                        }}
                        step={1}
                        min={0}
                        max={999999}
                    />
                </AppFormEntry>
            </div>

            <p className="text-xs text-red-600">{errorMsg}</p>
            <DialogFooter className="mt-2">
                <Button type="submit">Guardar</Button>
            </DialogFooter>
        </form>
    );
}

export default ProductUnitForm;
