import Select from "react-select";
import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z, ZodFormattedError } from "zod";
import { ProductFormSchema } from "./productSchemas";
import { useEffect, useRef, useState } from "react";
import { IProductDto, IProductView } from "@/models/products";
import { ServiceResponse } from "@/service/serviceResponse";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useFetcher } from "react-router-dom";
import AppAlert from "@/components/AppAlert";
import {
    useCategories,
    useClothingTypes,
    useMaterials,
    useProviders,
} from "@/lib/hooks/useAdministrations";
import { INamed } from "@/models/common.model";

type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;

interface Props {
    product?: IProductView;
    afterSubmit: (p: IProductDto) => void;
}

function makeOptions<T extends INamed>(items: T[]) {
    return items.map((it) => ({ label: it.name, value: it.id }));
}

function ProductForm({ product, afterSubmit }: Props) {
    const isUpdate = !!(product && product.id);

    const fetcher = useFetcher();

    const { register, control, handleSubmit, setValue, watch } = useForm<ProductFormSchemaType>({
        defaultValues: product,
    });

    const { data: categories, isLoading: loadingCategories } = useCategories();
    const categoryOpts = makeOptions(categories ?? []);

    const { data: providers, isLoading: loadingProviders } = useProviders();
    const providerOpts = makeOptions(providers ?? []);

    const { data: materials, isLoading: loadingMaterials } = useMaterials();
    const materialOpts = makeOptions(materials ?? []);

    const { data: clothingTypes, isLoading: loadingClothingTypes } = useClothingTypes();
    const clothingTypeOpts = makeOptions(clothingTypes ?? []);

    // TODO! ganancia y recargo (diferencia contado/lista)
    // const [margin, setMargin] = useState(0);
    // const [applyMargin, setApplyMargin] = useState(false);

    const [serverError, setServerError] = useState("");
    const serverErrorRef = useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<ZodFormattedError<ProductFormSchemaType> | null>(null);

    useEffect(() => {
        if (!fetcher.data) {
            return;
        }

        const data = fetcher.data as ServiceResponse<IProductDto>;

        if (data.success) {
            afterSubmit(data.data);
        } else {
            // unexpected server error (client side validations should catch invalid data)
            setServerError(data.error.message);
            console.error("server returned error:", data.error.response);
        }
    }, [fetcher.data, setServerError]);

    useEffect(() => {
        serverErrorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [serverError]);

    const unitCost = watch("unitCost");
    // const [unitCost, totalCost, cashPrice] = watch(["unitCost", 'totalCost', 'cashPrice']);
    useEffect(() => {
        setValue("totalCost", unitCost);
    }, [setValue, unitCost]);

    // const [margin, setMargin] = useState(() => {
    //     if (!product || product.cost * product.price <= 0) {
    //         return "";
    //     }

    //     const margin = product.price / product.cost - 1;
    //     if (isNaN(margin)) return "";

    //     return Intl.NumberFormat("es-AR", {
    //         style: "percent",
    //         minimumFractionDigits: 1,
    //     }).format(margin);
    // });

    // function updateMargin(cost: number, price: number) {
    //     if (cost * price <= 0) {
    //         setMargin("");
    //         return;
    //     }

    //     const margin = price / cost - 1;
    //     if (!isNaN(margin)) {
    //         setMargin(
    //             Intl.NumberFormat("es-AR", {
    //                 style: "percent",
    //                 minimumFractionDigits: 1,
    //             }).format(margin),
    //         );
    //     }
    // }

    // function buildSku(categoryId: string, providerId: string) {
    //     if (!categoryId || !providerId) return;

    //     const category = categories?.find((c) => c.id === categoryId);
    //     const provider = providers?.find((c) => c.id === providerId);

    //     if (category && provider) {
    //         const sku = category?.code + provider?.code;
    //         setValue("sku", sku);
    //     }
    // }

    const submitHandler: SubmitHandler<ProductFormSchemaType> = async (form) => {
        const { success, data, error } = ProductFormSchema.safeParse(form);
        if (!success) {
            const err = error.format();
            setErrors(err);
            console.log("validation errors", err);
            return;
        }

        data.sku = "sku-todo";

        const method = isUpdate ? "PUT" : "POST";
        fetcher.submit(data, { action: "/products", method, encType: "multipart/form-data" });
        /* use router fetcher to automatically revalidate data from loader

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
            reset();
            afterSubmit(response.data);
        } else {
            // unexpected server error (client side validations should catch invalid data)
            setServerError(response.error.response.message);
            console.error("server returned error:", response.error.response);
        } */
    };

    return (
        <form method="post" onSubmit={handleSubmit(submitHandler)}>
            {serverError && (
                <AppAlert
                    variant="error"
                    title="Ocurrió un error"
                    className="mb-4"
                    ref={serverErrorRef}
                >
                    <p>{serverError}</p>
                </AppAlert>
            )}
            <AppFormEntry label="Nombre" name="name" errors={errors?.name?._errors}>
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
            <div className="grid gap-x-2 grid-cols-2">
                <AppFormEntry
                    label="Categoria"
                    name="categoryId"
                    errors={errors?.categoryId?._errors}
                >
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field: { onChange, value, ...field } }) => (
                            <Select
                                options={categoryOpts}
                                onChange={(v) => onChange(v?.value)}
                                value={categoryOpts?.find((x) => x.value === value)}
                                {...field}
                                isClearable
                                isLoading={loadingCategories}
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
                        render={({ field: { onChange, value, ...field } }) => (
                            // <AppSelect
                            //     options={
                            //         providers?.map((it) => ({
                            //             label: it.name,
                            //             value: it.id,
                            //         })) ?? []
                            //     }
                            //     {...field}
                            //     onValueChange={(value) => {
                            //         buildSku(getValues("categoryId"), value);
                            //         onChange(value);
                            //     }}
                            // />
                            <Select
                                options={providerOpts}
                                onChange={(v) => onChange(v?.value)}
                                value={providerOpts.find((x) => x.value === value)}
                                {...field}
                                isClearable
                                isLoading={loadingProviders}
                            />
                        )}
                    />
                </AppFormEntry>

                <AppFormEntry
                    label="Material"
                    name="materialId"
                    errors={errors?.materialId?._errors}
                >
                    <Controller
                        control={control}
                        name="materialId"
                        render={({ field: { onChange, value, ...field } }) => (
                            <Select
                                options={materialOpts}
                                onChange={(v) => onChange(v?.value)}
                                value={materialOpts.find((x) => x.value === value)}
                                {...field}
                                isClearable
                                isLoading={loadingMaterials}
                            />
                        )}
                    />
                </AppFormEntry>
                <AppFormEntry
                    label="Tipo de prenda"
                    name="clothingTypeId"
                    errors={errors?.clothingTypeId?._errors}
                >
                    <Controller
                        control={control}
                        name="clothingTypeId"
                        render={({ field: { onChange, value, ...field } }) => (
                            <Select
                                options={clothingTypeOpts}
                                onChange={(v) => onChange(v?.value)}
                                value={clothingTypeOpts.find((x) => x.value === value)}
                                {...field}
                                isClearable
                                isLoading={loadingClothingTypes}
                            />
                        )}
                    />
                </AppFormEntry>
            </div>

            <div className="grid gap-x-2 grid-cols-2">
                <AppFormEntry
                    label="Costo unitario"
                    name="unitCost"
                    errors={errors?.unitCost?._errors}
                >
                    <Input
                        type="number"
                        {...register("unitCost", {
                            // onChange(event) {
                            //     updateMargin(event.target.value, getValues("retailPrice"));
                            // },
                            valueAsNumber: true,
                        })}
                        step=".01"
                    />
                </AppFormEntry>
                <AppFormEntry
                    label="Costo total"
                    name="totalCost"
                    errors={errors?.totalCost?._errors}
                >
                    <Input
                        type="number"
                        {...register("totalCost", {
                            // onChange(event) {
                            //     updateMargin(event.target.value, getValues("retailPrice"));
                            // },
                            valueAsNumber: true,
                        })}
                        step=".01"
                    />
                </AppFormEntry>

                <AppFormEntry
                    label="Precio contado"
                    name="cashPrice"
                    errors={errors?.cashPrice?._errors}
                >
                    <Input
                        type="number"
                        {...register("cashPrice", {
                            // onChange(event) {
                            //     // updateMargin(getValues("cost"), event.target.value);
                            // },
                            valueAsNumber: true,
                        })}
                        step=".01"
                    />
                </AppFormEntry>
                <AppFormEntry
                    label="Precio lista"
                    name="retailPrice"
                    errors={errors?.retailPrice?._errors}
                >
                    <Input
                        type="number"
                        {...register("retailPrice", {
                            // onChange(event) {
                            //     // updateMargin(getValues("cost"), event.target.value);
                            // },
                            valueAsNumber: true,
                        })}
                        step=".01"
                    />
                </AppFormEntry>

                {/* <AppFormEntry label="Ganancia" name="" readonly={!applyMargin}>
                    <Input
                        type="number"
                        value={margin}
                        onChange={(e) => setMargin(parseFloat(e.target.value))}
                        min={0}
                        step="0.1"
                        readOnly={!applyMargin}
                    />
                </AppFormEntry>
                <div className="flex items-center gap-x-2">
                    <Checkbox checked={applyMargin} onCheckedChange={(e) => setApplyMargin(!!e)} />
                    <Label>Aplicar ganancia</Label>
                </div>
                // TODO! ganancia y recargo (diferencia contado/lista)
                 */}
            </div>
            <div>
                <AppFormEntry label="SKU" name="sku">
                    <Input {...register("sku")} disabled />
                </AppFormEntry>
            </div>
            <DialogFooter>
                <Button type="submit">Guardar</Button>
            </DialogFooter>
        </form>
    );
}

export default ProductForm;
