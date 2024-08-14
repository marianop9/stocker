import { z } from 'zod'

const required = (field: string, fem?: boolean) => {
    if (fem || field.endsWith('a')) {
        return `La ${field} es obligatoria.`
    }

    return `El ${field} es obligatorio.`
}
const minLength = (n: number) => `Ingrese al menos ${n} caracteres.`
const maxLength = (n: number) => `El máximo permitido es de ${n} caracteres.`

const moreThan = (n: number) => `Ingrese un valor mayor a ${n}.`
const lessThan = (n: number) => `Ingrese un valor menor a ${n}.`

export const ProductFormSchema = z.object({
    id: z.string().optional(),
    name: z
        .string({ required_error: required('nombre') })
        .min(3, minLength(3))
        .max(50, maxLength(50)),
    description: z.string().max(150, maxLength(150)).optional().default(''),
    categoryId: z.string({ required_error: required('categoria') }),
    providerId: z.string({ required_error: required('proveedor') }),
})
