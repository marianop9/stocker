<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppDialog from '@/components/AppDialog.vue'
import AppSelect, { type IOption } from '@/components/AppSelect.vue'
import FormEntry from '@/components/FormEntry.vue'
import type { IDescribable } from '@/models/administrations'
import type { IProductDto } from '@/models/products'
import { categoryService, providerService } from '@/service/adminService.ts'
import { useService } from '@/service/useService'
import { ref, watch } from 'vue'
import { z, type ZodFormattedError } from 'zod'
import { ProductFormSchema } from './productSchemas'
import { DialogClose } from 'radix-vue'
import { productService } from '@/service/productService'

const { product } = defineProps<{
    product?: IProductDto
}>()

type ProductFormSchemaType = z.infer<typeof ProductFormSchema>
const errors = ref<ZodFormattedError<ProductFormSchemaType> | null>(null)
const serviceError = ref('')

const { data: categories } = useService(categoryService.list)
const { data: providers } = useService(providerService.list)

const onOpenChange = (open: boolean) => {
    if (!open) {
        errors.value = null
        serviceError.value = ''
    }
}

const handleSubmit = async (e: Event) => {
    const form = new FormData(e.target as HTMLFormElement)

    const product = Object.fromEntries(form)

    const { success, data, error } = ProductFormSchema.safeParse(product)

    if (!success) {
        errors.value = error.format()
        return
    }

    const response = await productService.create({
        ...data,
    })

    if (!response.success) {
        serviceError.value = response.error.response.message
    }
}

function selectDescribableMapper(items: IDescribable[]): IOption[] {
    return items.map((it) => ({
        label: it.name,
        value: it.id,
    }))
}
</script>

<template>
    <AppDialog
        title="Agregar Producto"
        description="prueba de descripcion"
        @update:open="onOpenChange"
    >
        <template #trigger>
            <AppButton> Agregar producto </AppButton>
        </template>
        <template #content>
            <div v-if="serviceError" class="text-red-600">
                <p>Ocurrió un error al ejecutar el servicio:</p>
                <p>{{ serviceError }}</p>
            </div>
            <form @submit.prevent="handleSubmit">
                <div style="max-width: 75%">
                    <FormEntry
                        name="name"
                        label="Nombre"
                        class="mt-2"
                        :errors="errors?.name?._errors"
                    >
                        <input name="name" class="border-black border p-1 bg-gray-100 rounded-md" />
                    </FormEntry>
                    <FormEntry
                        name="description"
                        label="Descripción"
                        class="mt-2"
                        :errors="errors?.description?._errors"
                    >
                        <textarea
                            name="description"
                            rows="3"
                            class="border-black border p-1 bg-gray-100 rounded-md"
                        ></textarea>
                    </FormEntry>
                    <FormEntry
                        name="categoryId"
                        label="Categoria"
                        class="mt-2"
                        :errors="errors?.categoryId?._errors"
                    >
                        <AppSelect
                            :options="selectDescribableMapper(categories?.items ?? [])"
                            name="categoryId"
                        />
                    </FormEntry>
                    <FormEntry
                        name="providerId"
                        label="Proveedor"
                        class="mt-2"
                        :errors="errors?.providerId?._errors"
                    >
                        <AppSelect
                            :options="selectDescribableMapper(providers?.items ?? [])"
                            name="providerId"
                        />
                    </FormEntry>
                </div>

                <div class="mt-4 flex justify-end">
                    <DialogClose asChild>
                        <AppButton class="mr-2" type="button" variant="secondary"
                            >Cancelar</AppButton
                        >
                    </DialogClose>
                    <AppButton type="submit">Guardar</AppButton>
                </div>
            </form>
        </template>
    </AppDialog>
</template>
