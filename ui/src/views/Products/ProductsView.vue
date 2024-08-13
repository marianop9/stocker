<script lang="ts" setup>
import { productService } from '@/service/productService'
import { useService } from '@/service/useService'
import ProductDialog from './ProductDialog.vue'
import type { IProductDto, IProductView } from '@/models/products'
import AppButton from '@/components/AppButton.vue'
import { useRouter } from 'vue-router'

const { loading, data } = useService(productService.list)

const router = useRouter()
type Column = {
    label: string
    field: keyof IProductView
}

const cols: Column[] = [
    { label: 'Id', field: 'id' },
    { label: 'Nombre', field: 'name' },
    { label: 'Proveedor', field: 'providerName' },
    { label: 'Categoria', field: 'categoryName' },
]

const onSuccessfulCreate = (p: IProductDto) => {
    router.push('/products/' + p.id)
}
</script>

<template>
    <table class="w-2/3 border-2">
        <thead class="text-left">
            <tr>
                <th v-for="col in cols" :key="col.field">{{ col.label }}</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="loading"> loading... </template>
            <tr v-for="item in data?.items ?? []" :key="item.id">
                <td v-for="col in cols" :key="col.field">
                    {{ item[col.field] }}
                </td>
                <!-- columna de acciones -->
                <td>
                    <AppButton>
                        <RouterLink :to="'products/' + item.id">Ver</RouterLink>
                    </AppButton>
                </td>
            </tr>
        </tbody>
    </table>

    <ProductDialog @success="onSuccessfulCreate" />
</template>
