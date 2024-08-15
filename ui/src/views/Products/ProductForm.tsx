import AppFormEntry from "@/components/AppFormEntry";
import { Input } from "@/components/ui/input";
import AppSelect from "@/components/AppSelect";
import { useService } from "@/service/useService";
import { categoryService, providerService } from "@/service/adminService.ts";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z, ZodFormattedError } from "zod";
import { ProductFormSchema } from "./productSchemas";
import { FormEvent, useState } from "react";
import { productService, ServiceResponse } from "@/service/productService";
import { IProductDto, IProductView } from "@/models/products";

type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;

interface Props {
    product?: IProductView;
    afterSubmit: (p: IProductDto) => void;
}

function ProductForm({ product, afterSubmit }: Props) {
    const isUpdate = !!(product && product.id);

    const { data: categories } = useService(categoryService.list);
    const { data: providers } = useService(providerService.list);

    const [serverError, setServerError] = useState("");
    const [errors, setErrors] =
        useState<ZodFormattedError<ProductFormSchemaType> | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const obj = Object.fromEntries(formData);

        const {
            success,
            data,
            error,
        } = ProductFormSchema.safeParse(obj);

        // if validation fails, cancel and set error object
        if (!success) {
            const err = error.format();
            setErrors(err);
            console.log("validation errors", err);
            return;
        }

        let response: ServiceResponse<IProductDto>;
        if (isUpdate) {
            response = await productService.update({
                id: product.id,
                ...data,
            });
        } else {
            response = await productService.create({
                ...data,
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
        <form method="post" onSubmit={handleSubmit}>
            <div className="my-4 bg-red-300 text-red-500">{serverError}</div>
            <AppFormEntry
                label="Nombre"
                name="name"
                errors={errors?.name?._errors}
            >
                <Input type="text" name="name" defaultValue={product?.name} />
            </AppFormEntry>
            <AppFormEntry
                label="Descripción"
                name="description"
                errors={errors?.description?._errors}
            >
                <textarea
                    name="description"
                    defaultValue={product?.description}
                    rows={3}
                    className="p-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground"
                ></textarea>
            </AppFormEntry>
            <AppFormEntry
                label="Categoria"
                name="categoryId"
                errors={errors?.categoryId?._errors}
            >
                <AppSelect
                    name="categoryId"
                    options={
                        categories?.items.map((it) => ({
                            label: it.name,
                            value: it.id,
                        })) ?? []
                    }
                    defaultValue={product?.categoryId}
                />
            </AppFormEntry>
            <AppFormEntry
                label="Proveedor"
                name="providerId"
                helperText="El proveedor del producto"
                errors={errors?.providerId?._errors}
            >
                <AppSelect
                    name="providerId"
                    options={
                        providers?.items.map((it) => ({
                            label: it.name,
                            value: it.id,
                        })) ?? []
                    }
                    defaultValue={product?.providerId}
                />
            </AppFormEntry>
            <DialogFooter>
                <Button type="submit">Guardar</Button>
            </DialogFooter>
        </form>
    );
}

export default ProductForm;
