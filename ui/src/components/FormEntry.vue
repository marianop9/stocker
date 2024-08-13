<template>
    <div class="flex flex-col gap-2">
        <Label :for="name">{{ label }}</Label>
        <slot></slot>
        <small v-if="helperText">{{ helperText }}</small>
        <small v-if="errors && errors?.length > 0" class="text-red-600">{{
            Array.isArray(errors) ? errors.join('. ') : errors
        }}</small>
    </div>
</template>

<script setup lang="ts">
import { Label } from 'radix-vue'

const { name, label, helperText } = defineProps<{
    name: string
    label: string
    helperText?: string
    errors?: string | string[]
}>()
</script>
