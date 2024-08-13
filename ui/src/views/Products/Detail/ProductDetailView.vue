<script lang="ts" setup>
import type { IProductDto, IProductView } from '@/models/products'
import { productService } from '@/service/productService'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductDialog from '../ProductDialog.vue'

const route = useRoute()

const product = ref<IProductView | null>(null)

watch(() => route.params.id, getProductDetails, { immediate: true })

async function getProductDetails(id: string | string[]) {
    if (Array.isArray(id)) {
        id = id[0]
    }
    product.value = await productService.get(id)
}

const onUpdateSucess = (p: IProductDto) => {
    getProductDetails(p.id)
}
</script>

<template>
    <div class="flex">
        <div class="h-[250px] w-[200px] bg-gray-400 mr-4"></div>
        <div>
            <h2 class="text-xl font-semibold mb-2">{{ product?.name }}</h2>
            <p>{{ product?.description }}</p>
            <div>
                <span>{{ product?.categoryName }} / {{ product?.providerName }}</span>
            </div>
            <ProductDialog :product="product ?? undefined" @success="onUpdateSucess" />
        </div>
    </div>
</template>
