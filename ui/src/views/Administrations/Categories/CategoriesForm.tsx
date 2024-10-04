import { AppDialogFooter } from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/models/administrations";
import { categoryService } from "@/service/administrationsService";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    formEntity: ICategory | null;
    onSuccess(c: ICategory, wasUpdate: boolean): void;
}

type CategoryFormType = {
    name: string;
    description: string;
    code: string;
};

function CategoriesForm({ formEntity, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryFormType>({
        defaultValues: formEntity ?? undefined,
    });

    const submitHandler: SubmitHandler<CategoryFormType> = async (data) => {
        const result = await categoryService.createUpdate({
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
                label="Nombre"
                name="name"
                errors={errors.name?.message}
            >
                <Input
                    type="text"
                    {...register("name", {
                        required: "Ingrese un nombre.",
                        maxLength: {
                            value: 50,
                            message: "Ingrese no más de 50 caracteres.",
                        },
                    })}
                />
            </AppFormEntry>
            <AppFormEntry
                label="Descripción"
                name="description"
                errors={errors.description?.message}
            >
                <Textarea
                    {...register("description", {
                        maxLength: {
                            value: 100,
                            message: "Ingrese no más de 100 caracteres.",
                        },
                    })}
                    placeholder="Ingrese una descripción"
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

export default CategoriesForm;
