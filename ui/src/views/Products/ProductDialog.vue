<script setup lang="ts">
import AppDialog from '@/components/AppDialog.vue'
import AppSelect, { type IOption } from '@/components/AppSelect.vue'
import FormEntry from '@/components/FormEntry.vue'
import type { IDescribable } from '@/models/administrations'
import type { IProductDto } from '@/models/products'
import { categoryService, providerService } from '@/service/adminService.ts'
import { useService } from '@/service/useService'
import { computed, ref, watch } from 'vue'
import { z, type ZodFormattedError } from 'zod'
import { ProductFormSchema } from './productSchemas'
import { productService, type ServiceResponse } from '@/service/productService'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{
    product?: IProductDto
}>()

const emit = defineEmits<{
    success: [p: IProductDto]
}>()

const isUpdate = computed(() => !!props.product?.id)

const isOpen = ref(false)
watch(isOpen, (open) => {
    if (!open) {
        errors.value = null
        serviceError.value = ''
    }
})

type ProductFormSchemaType = z.infer<typeof ProductFormSchema>
const errors = ref<ZodFormattedError<ProductFormSchemaType> | null>(null)
const serviceError = ref('')

const { data: categories } = useService(categoryService.list)
const { data: providers } = useService(providerService.list)

const handleSubmit = async (e: Event) => {
    const form = new FormData(e.target as HTMLFormElement)

    const formObject = Object.fromEntries(form)

    const { success, data, error } = ProductFormSchema.safeParse(formObject)

    if (!success) {
        errors.value = error.format()
        return
    }

    let response: ServiceResponse<IProductDto>

    console.log('updating', isUpdate)
    if (isUpdate.value) {
        response = await productService.update({
            id: props.product!.id,
            ...data,
        })
    } else {
        response = await productService.create({
            ...data,
        })
    }

    if (!response.success) {
        serviceError.value = response.error.response.message
        return
    }

    emit('success', response.data)
    isOpen.value = false
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
        :title="product ? 'Modificar producto' : 'Agregar producto'"
        description="prueba de descripcion"
        v-model:open="isOpen"
    >
        <template #trigger>
            <Button>
                {{ product ? 'Modificar' : 'Agregar producto' }}
            </Button>
        </template>
        <template #content>
            <div v-if="serviceError" class="text-red-600">
                <p>Ocurrió un error al ejecutar el servicio:</p>
                <p>{{ serviceError }}</p>
            </div>
            <form @submit.prevent="handleSubmit" id="productForm">
                <FormEntry name="name" label="Nombre" class="mt-2" :errors="errors?.name?._errors">
                    <input
                        name="name"
                        :value="product?.name"
                        class="border-black border p-1 bg-gray-100 rounded-md"
                    />
                </FormEntry>
                <FormEntry
                    name="description"
                    label="Descripción"
                    class="mt-2"
                    :errors="errors?.description?._errors"
                >
                    <textarea
                        name="description"
                        :value="product?.description"
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
                        :defaultValue="product?.categoryId"
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
                        :defaultValue="product?.providerId"
                        name="providerId"
                    />
                </FormEntry>
            </form>
        </template>
        <template v-slot:footer>
            <div class="mt-4 flex justify-end">
                <!-- <DialogClose asChild>
                    <AppButton class="mr-2" type="button" variant="secondary"
                        >Cancelar</AppButton
                    >
                </DialogClose> -->
                <Button type="submit" form="productForm">Guardar</Button>
            </div>
        </template>
    </AppDialog>
</template>
