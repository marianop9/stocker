<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export interface IOption {
    label: string
    value: string
}

defineProps<{
    options: IOption[]
    name: string
    label: string
    placeholder?: string
    required?: boolean
    defaultValue?: string
}>()
</script>

<template>
    <Select :name="name" :required="required ?? false" :defaultValue>
        <SelectTrigger>
            <SelectValue :placeholder />
        </SelectTrigger>

        <SelectContent>
            <SelectGroup>
                <SelectLabel>{{ label }}</SelectLabel>

                <SelectItem v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>
