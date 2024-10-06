import { AppDialogFooter } from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ISize } from "@/models/administrations";
import { sizeService } from "@/service/administrationsService";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    formEntity: ISize | null;
    onSuccess(c: ISize, wasUpdate: boolean): void;
}

type SizeFormType = Omit<ISize, "id">

function SizesForm({ formEntity, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SizeFormType>({
        defaultValues: formEntity ?? undefined,
    });

    const submitHandler: SubmitHandler<SizeFormType> = async (data) => {
        const result = await sizeService.createUpdate({
            id: formEntity?.id ?? "",
            ...data,
        });

        if (result.success) {
            onSuccess(result.data, formEntity !== null);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <AppFormEntry
                label="Alias"
                name="alias"
                errors={errors.alias?.message}
            >
                <Input
                    type="text"
                    {...register("alias", {
                        required: "Ingrese un alias.",
                        maxLength: {
                            value: 10,
                            message: "Ingrese no más de 10 caracteres.",
                        },
                    })}
                />
            </AppFormEntry>
            <AppFormEntry
                label="Código"
                name="code"
                errors={errors.code?.message}
            >
                <Input
                    type="text"
                    {...register("code", {
                        required: "Ingrese un código.",
                        maxLength: {
                            value: 5,
                            message: "Ingrese no más de 5 caracteres.",
                        },
                    })}
                />
            </AppFormEntry>

            <AppDialogFooter>
                <Button type="submit">Guardar</Button>
            </AppDialogFooter>
        </form>
    );
}

export default SizesForm;
