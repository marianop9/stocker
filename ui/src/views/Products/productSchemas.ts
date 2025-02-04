import { z } from "zod";

const required = (field: string, fem?: boolean) => {
    if (fem || field.endsWith("a")) {
        return `La ${field} es obligatoria.`;
    }

    return `El ${field} es obligatorio.`;
};
const minLength = (n: number) => `Ingrese al menos ${n} caracteres.`;
const maxLength = (n: number) => `El máximo permitido es de ${n} caracteres.`;

const moreThan = (n: number) => `Ingrese un valor mayor a ${n}.`;
const lessThan = (n: number) => `Ingrese un valor menor a ${n}.`;

const maxPrice = 999999;

export const ProductFormSchema = z.object({
    id: z.string().optional(),
    name: z
        .string({ required_error: required("nombre") })
        .min(3, minLength(3))
        .max(50, maxLength(50)),
    description: z.string().max(150, maxLength(150)).optional().default(""),
    categoryId: z.string({ required_error: required("categoria") }).min(1, required("categoria")),
    providerId: z.string({ required_error: required("proveedor") }).min(1, required("proveedor")),
    materialId: z.string({ required_error: required("material") }).min(1, required("material")),
    clothingTypeId: z.string({ required_error: required("prenda") }).min(1, required("prenda")),
    unitCost: z
        .number({
            required_error: required("costo"),
            invalid_type_error: required("costo"),
        })
        .min(0, "Ingrese un valor mayor o igual a 0.")
        .max(maxPrice, lessThan(maxPrice)),
    totalCost: z
        .number({
            required_error: required("costo"),
            invalid_type_error: required("costo"),
        })
        .min(0, "Ingrese un valor mayor o igual a 0.")
        .max(maxPrice, lessThan(maxPrice)),
    cashPrice: z
        .number({
            required_error: required("precio"),
            invalid_type_error: required("precio"),
        })
        .positive(moreThan(0))
        .max(maxPrice, lessThan(maxPrice)),
    retailPrice: z
        .number({
            required_error: required("precio"),
            invalid_type_error: required("precio"),
        })
        .positive(moreThan(0))
        .max(maxPrice, lessThan(maxPrice)),
    sku: z.string(),
});
