import AppFormEntry from "@/components/AppFormEntry";
import AppSelect from "@/components/AppSelect";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useColors, useSizes } from "@/lib/hooks/useAdministrations";
import { useState } from "react";
import {
    useForm,
    useFieldArray,
    SubmitHandler,
    Controller,
} from "react-hook-form";

interface Props {
    productId: string;
}

type FormType = {
    units: {
        colorId: string;
        sizeIds: string[];
    }[];
};

function StockEntryProductUnitForm() {
    // const [selectedColor, setSelectedColor] = useState("");
    const [selectedColorIds, setSelectedColorIds] = useState<string[]>([""]);

    const { register, control, handleSubmit } = useForm<FormType>({
        defaultValues: {
            units: [
                {
                    colorId: "",
                    sizeIds: [],
                },
            ],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: "units",
    });

    function updateSelectedColors(value: string, index: number) {
        // setSelectedColorIds((colors) =>
        //     colors.map((c, i) => {
        //         if (i === index) {
        //             return value;
        //         }
        //         return c;
        //     }),
        // );
        setSelectedColorIds(
            selectedColorIds?.map((c, i) => {
                if (i === index) {
                    return value;
                }
                return c;
            }) ?? [],
        );
    }

    const { data: colors } = useColors();
    function availableColors(index: number) {
        if (!colors) return [];

        const selectedId = selectedColorIds[index];

        const available = colors.filter(
            (c) => !selectedColorIds.includes(c.id) || c.id === selectedId,
        );

        return available;
    }

    const { data: sizes } = useSizes();

    const submitHandler: SubmitHandler<FormType> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="">
            {fields.map((field, index) => (
                <fieldset
                    key={field.id}
                    className="border-2 border-gray-100 rounded p-2 mb-2"
                >
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => fields.length > 1 && remove(index)}
                        >
                            x
                        </Button>
                    </div>
                    <Controller
                        name={`units.${index}.colorId`}
                        control={control}
                        render={({ field: { onChange, ...field } }) => (
                            <AppFormEntry
                                name={`colorId.${index}`}
                                label="Color"
                            >
                                <AppSelect
                                    options={
                                        availableColors(index)?.map((c) => ({
                                            label: c.name,
                                            value: c.id,
                                        })) ?? []
                                    }
                                    placeholder="Seleccione un color..."
                                    {...field}
                                    // onValueChange={(value) =>
                                    //     updateSelectedColors(value, index)
                                    // }
                                    onValueChange={onChange}
                                />
                            </AppFormEntry>
                        )}
                    />

                    <div className="p-2 border rounded mb-2">
                        <h4>Talles</h4>
                        <div className="flex justify-evenly">
                            {sizes?.map((size, sizeIdx) => (
                                <div
                                    key={index + size.id}
                                    className="flex items-top space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        {...register(`units.${index}.sizeIds`)}
                                        value={size.id}
                                    />
                                    <Label>{size.alias}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </fieldset>
            ))}

            <div className="flex justify-center">
                <Button
                    type="button"
                    onClick={() => {
                        append({
                            colorId: "",
                            sizeIds: [],
                        });
                    }}
                >
                    Agregar
                </Button>
            </div>
            <DialogFooter>
                <Button type="submit">Guardar</Button>
            </DialogFooter>
        </form>
    );
}

export default StockEntryProductUnitForm;

// interface FieldGroupProps {
//     register: UseFormRegister<FormType>;
//     index: number;
//     availableColors: IColor[];
//     sizes: ISize[];
// }
// function FieldGroup({
//     register,
//     index,
//     availableColors,
//     sizes,
// }: FieldGroupProps) {
//     const [selectedColor, setSelectedColor] = useState("");

//     return (
//         <fieldset className="border-2 border-gray-100 rounded p-2 mb-2">
//             <AppFormEntry name="color" label="Color">
//                 <AppSelect
//                     // {...register(`units.${index}.colorId`)}
//                     name="colors"
//                     options={
//                         availableColors?.map((c) => ({
//                             label: c.name,
//                             value: c.id,
//                         })) ?? []
//                     }
//                     placeholder="Seleccione un color..."
//                     defaultValue={selectedColor}
//                     value={selectedColor}
//                     onValueChange={setSelectedColor}
//                 />
//             </AppFormEntry>

//             <div className="p-2 border rounded mb-2">
//                 <h4>Talles</h4>
//                 <div className="flex justify-evenly">
//                     {sizes.map((size) => (
//                         <div
//                             key={size.id + selectedColor}
//                             className="flex items-top space-x-2"
//                         >
//                             <Checkbox
//                                 // defaultChecked={!!size.checked}
//                                 defaultChecked={false}
//                                 name="sizeId"
//                                 value={size.id}
//                             />
//                             <Label>{size.alias}</Label>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </fieldset>
//     );
// }
