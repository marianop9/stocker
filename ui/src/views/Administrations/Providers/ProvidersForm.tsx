import { AppDialogFooter } from "@/components/AppDialog";
import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IProvider } from "@/models/administrations";
import { providerService } from "@/service/administrationsService";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    formEntity: IProvider | null;
    onSuccess(c: IProvider, wasUpdate: boolean): void;
}

type ProviderFormType = {
    name: string;
    description: string;
    code: string;
};

function ProvidersForm({ formEntity, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProviderFormType>({
        defaultValues: formEntity ?? undefined,
    });

    const submitHandler: SubmitHandler<ProviderFormType> = async (data) => {
        const result = await providerService.createUpdate({
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

export default ProvidersForm;
