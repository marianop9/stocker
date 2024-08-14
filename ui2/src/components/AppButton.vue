<script setup lang="ts">
import { computed } from 'vue'

defineEmits<{
    click: []
}>()

const { type = 'button', variant = 'primary' } = defineProps<{
    type?: 'submit' | 'reset' | 'button'
    variant?: 'primary' | 'secondary'
}>()

const variantClass = computed(() => {
    let exhaustiveCheck: never

    switch (variant) {
        case 'primary':
            return 'bg-slate-600 text-white'
        case 'secondary':
            return 'bg-gray-200 text-slate-800'
        default:
            exhaustiveCheck = variant
            return exhaustiveCheck
    }
})
</script>

<template>
    <button :type @click="$emit('click')" class="rounded p-2 align-middle" :class="variantClass">
        <slot></slot>
    </button>
</template>
