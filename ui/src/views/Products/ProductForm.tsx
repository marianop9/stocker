import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import AppSelect from "@/components/AppSelect";
import { useService } from "@/service/useService";
import {
    categoryService,
    providerService,
} from "@/service/administrationsService";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z, ZodFormattedError } from "zod";
import { ProductFormSchema } from "./productSchemas";
import { useState } from "react";
import { productService } from "@/service/productService";
import { IProductDto, IProductView } from "@/models/products";
import { ServiceResponse } from "@/service/serviceResponse";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;

interface Props {
    product?: IProductView;
    afterSubmit: (p: IProductDto) => void;
}

function ProductForm({ product, afterSubmit }: Props) {
    const isUpdate = !!(product && product.id);

    const { register, control, handleSubmit, getValues } =
        useForm<ProductFormSchemaType>({
            defaultValues: product,
        });

    const { data: categories } = useService(categoryService.list);
    const { data: providers } = useService(providerService.list);

    const [serverError, setServerError] = useState("");
    const [errors, setErrors] =
        useState<ZodFormattedError<ProductFormSchemaType> | null>(null);

    const [margin, setMargin] = useState(() => {
        if (!product || product.cost * product.price <= 0) {
            return "";
        }

        const margin = product.price / product.cost - 1;
        if (isNaN(margin)) return "";

        return Intl.NumberFormat("es-AR", {
            style: "percent",
            minimumFractionDigits: 1,
        }).format(margin);
    });

    function updateMargin(cost: number, price: number) {
        if (cost * price <= 0) {
            setMargin("");
            return;
        }

        const margin = price / cost - 1;
        if (!isNaN(margin)) {
            setMargin(
                Intl.NumberFormat("es-AR", {
                    style: "percent",
                    minimumFractionDigits: 1,
                }).format(margin),
            );
        }
    }

    const submitHandler: SubmitHandler<ProductFormSchemaType> = async (
        form,
    ) => {
        const { success, data, error } = ProductFormSchema.safeParse(form);
        if (!success) {
            const err = error.format();
            setErrors(err);
            console.log("validation errors", err);
            return;
        }

        // build sku
        const category = categories?.find((c) => c.id === data.categoryId);
        const provider = providers?.find((c) => c.id === data.providerId);

        let sku = "";
        if (category && provider) sku = category?.code + provider?.code;

        let response: ServiceResponse<IProductDto>;
        if (isUpdate) {
            response = await productService.update({
                id: product.id,
                ...data,
                sku,
            });
        } else {
            response = await productService.create({
                ...data,
                sku,
            });
        }

        if (response.success) {
            afterSubmit(response.data);
        } else {
            // unexpected server error (client side validations should catch invalid data)
            setServerError(response.error.response.message);
            console.error("server returned error:", response.error.response);
        }
    };

    return (
        <form method="post" onSubmit={handleSubmit(submitHandler)}>
            <div className="my-4 bg-red-300 text-red-500">{serverError}</div>
            <AppFormEntry
                label="Nombre"
                name="name"
                errors={errors?.name?._errors}
            >
                {/* <Input type="text" name="name" defaultValue={product?.name} /> */}
                <Input type="text" {...register("name")} />
            </AppFormEntry>
            <AppFormEntry
                label="Descripción"
                name="description"
                errors={errors?.description?._errors}
            >
                {/* <textarea
                    name="description"
                    defaultValue={product?.description}
                    rows={3}
                    className="p-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground"
                ></textarea> */}
                <Textarea {...register("description")} />
            </AppFormEntry>
            <AppFormEntry
                label="Categoria"
                name="categoryId"
                errors={errors?.categoryId?._errors}
            >
                <Controller
                    control={control}
                    name="categoryId"
                    render={({ field: { onChange, ...field } }) => (
                        <AppSelect
                            options={
                                categories?.map((it) => ({
                                    label: it.name,
                                    value: it.id,
                                })) ?? []
                            }
                            {...field}
                            onValueChange={onChange}
                        />
                    )}
                />
            </AppFormEntry>
            <AppFormEntry
                label="Proveedor"
                name="providerId"
                errors={errors?.providerId?._errors}
            >
                <Controller
                    control={control}
                    name="providerId"
                    render={({ field: { onChange, ...field } }) => (
                        <AppSelect
                            options={
                                providers?.map((it) => ({
                                    label: it.name,
                                    value: it.id,
                                })) ?? []
                            }
                            {...field}
                            onValueChange={onChange}
                        />
                    )}
                />
            </AppFormEntry>
            <AppFormEntry
                label="Costo"
                name="cost"
                errors={errors?.cost?._errors}
                helperText="Costo del producto (opcional)."
            >
                <Input
                    type="number"
                    {...register("cost", {
                        onChange(event) {
                            updateMargin(
                                event.target.value,
                                getValues("price"),
                            );
                        },
                        valueAsNumber: true,
                    })}
                    step=".01"
                />
            </AppFormEntry>
            <div className="flex justify-between">
                <AppFormEntry
                    label="Precio"
                    name="price"
                    errors={errors?.price?._errors}
                >
                    <Input
                        type="number"
                        {...register("price", {
                            onChange(event) {
                                updateMargin(
                                    getValues("cost"),
                                    event.target.value,
                                );
                            },
                            valueAsNumber: true,
                        })}
                        step=".01"
                    />
                </AppFormEntry>
                <AppFormEntry label="Margen" name="margin">
                    <Input name="margin" value={margin} disabled />
                </AppFormEntry>
            </div>
            <DialogFooter>
                <Button type="submit">Guardar</Button>
            </DialogFooter>
        </form>
    );
}

export default ProductForm;
