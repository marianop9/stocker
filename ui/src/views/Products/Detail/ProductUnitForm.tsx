import AppFormEntry from "@/components/AppFormEntry";
import AppSelect from "@/components/AppSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { IProductUnitView } from "@/models/products";
import { colorService, sizeService } from "@/service/adminService.ts";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

interface Props {
    details: IProductUnitView[];
}

function ProductUnitForm({ details }: Props) {
    const [selectedColor, setSelectedColor] = useState<string>("");
    const sizesByColor = details
        .filter((det) => det.colorId === selectedColor)
        .map((det) => det.sizeId);

    const { data: colors } = useQuery({
        queryKey: ["colors"],
        queryFn: colorService.list,
    });

    const { data: sizes } = useQuery({
        queryKey: ["sizes"],
        queryFn: sizeService.list,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        console.log(Object.fromEntries(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <AppFormEntry name="color" label="Color">
                <AppSelect
                    name="color"
                    options={
                        colors?.map((c) => ({ label: c.name, value: c.id })) ??
                        []
                    }
                    placeholder="Seleccione un color..."
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                />
            </AppFormEntry>

            <div className="p-2 border rounded">
                <h4>Talles</h4>
                <div className="flex justify-evenly">
                    {sizes?.map((size) => (
                        <div key={size.id} className="flex items-top space-x-2">
                            <Checkbox
                                defaultChecked={sizesByColor.includes(size.id)}
                                name="sizeId[]"
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
