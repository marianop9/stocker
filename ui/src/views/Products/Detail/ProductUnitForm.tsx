import AppFormEntry from "@/components/AppFormEntry";
import AppSelect from "@/components/AppSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { IProductUnitDto, IProductUnitView } from "@/models/products";
import { colorService, sizeService } from "@/service/administrationsService";
import { productUnitService } from "@/service/productService";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useMemo, useState } from "react";

interface Props {
    productId: string;
    details: IProductUnitView[];
}

function ProductUnitForm({ productId, details }: Props) {
    const [selectedColor, setSelectedColor] = useState<string>("");

    const { data: colors } = useQuery({
        queryKey: ["colors"],
        queryFn: colorService.list,
    });

    const { data: sizes } = useQuery({
        queryKey: ["sizes"],
        queryFn: sizeService.list,
    });

    const sizesByColor = useMemo(() => {
        if (!sizes || selectedColor === "") return [];

        const detailSizesByColor = details
            .filter((det) => det.colorId === selectedColor)
            .map((det) => det.sizeId);

        return sizes.map((size) => ({
            ...size,
            checked: detailSizesByColor.includes(size.id),
        }));
    }, [sizes, details, selectedColor]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const dtos: IProductUnitDto[] = [];

        for (let sizeId of formData.getAll("sizeId")) {
            dtos.push({
                id: "",
                productId: productId,
                colorId: selectedColor,
                sizeId: sizeId.toString(),
            });
        }

        console.log(dtos);

        console.log(await productUnitService.createBatch(dtos));
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

            <div className="p-2 border rounded">
                <h4>Talles</h4>
                <div className="flex justify-evenly">
                    {sizesByColor.map((size) => (
                        <div
                            key={size.id + selectedColor}
                            className="flex items-top space-x-2"
                        >
                            <Checkbox
                                defaultChecked={!!size.checked}
                                name="sizeId"
                                value={size.id}
                            />
                            <Label>{size.alias}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <DialogFooter className="mt-2">
                <Button type="submit">Guardar</Button>
            </DialogFooter>
        </form>
    );
}

export default ProductUnitForm;
