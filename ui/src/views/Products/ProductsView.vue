<script lang="ts" setup>
import { productService } from '@/service/productService'
import { useService } from '@/service/useService'
import { ref } from 'vue'
import ProductDialog from './ProductDialog.vue'
import type { IProductView } from '@/models/products'
import AppButton from '@/components/AppButton.vue'

const { loading, data } = useService(productService.list)

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
</script>

<template>
    <table class="w-full">
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
                <td></td>
            </tr>
        </tbody>
    </table>

    <ProductDialog />
</template>
