import { AppDialogFooter } from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IColor } from "@/models/administrations";
import { colorService } from "@/service/administrationsService";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    formEntity: IColor | null;
    onSuccess(c: IColor, wasUpdate: boolean): void;
}

type ColorFormType = Omit<IColor, "id">;

function ColorsForm({ formEntity, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ColorFormType>({
        defaultValues: formEntity ?? undefined,
    });

    const submitHandler: SubmitHandler<ColorFormType> = async (data) => {
        const result = await colorService.createUpdate({
            id: formEntity?.id ?? "",
            ...data,
        });

        if (result.success) {
            onSuccess(result.data, formEntity !== null);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <AppFormEntry label="Nombre" name="name" errors={errors.name?.message}>
                <Input
                    type="text"
                    {...register("name", {
                        required: "Ingrese un nombre.",
                        maxLength: {
                            value: 30,
                            message: "Ingrese no más de 30 caracteres.",
                        },
                    })}
                />
            </AppFormEntry>
            <div className="flex justify-between">
                <AppFormEntry label="Color" name="hexcode" className="w-20">
                    <Input
                        type="color"
                        {...register("hexcode", {
                            required: "Ingrese un color.",
                        })}
                    />
                </AppFormEntry>
                <AppFormEntry label="Código" name="code" errors={errors.code?.message}>
                    <Input
                        type="text"
                        {...register("code", {
                            required: "Ingrese un código.",
                            maxLength: {
                                value: 5,
                                message: "Ingrese no más de 5 caracteres.",
                            },
                        })}
                        autoComplete="off"
                    />
                </AppFormEntry>
            </div>

            <AppDialogFooter>
                <Button type="submit">Guardar</Button>
            </AppDialogFooter>
        </form>
    );
}

export default ColorsForm;
