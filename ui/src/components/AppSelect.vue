<template>
    <SelectRoot :name="name" :required="required ?? false" class="">
        <SelectTrigger
            class="inline-flex min-w-[160px] items-center justify-between rounded px-[15px] h-[35px] gap-[5px] bg-gray-100 outline-none border-black border"
        >
            <SelectValue :placeholder />
            <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
        </SelectTrigger>

        <SelectPortal>
            <SelectContent
                class="min-w-[160px] bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                :side-offset="5"
            >
                <SelectViewport class="p-[5px]">
                    <SelectItem
                        v-for="option in options"
                        :key="option.value"
                        class="rounded-[3px] flex items-center h-[25px] py-3 pr-[35px] pl-[25px] data-[state=checked]:bg-gray-200 hover:bg-gray-200 cursor-pointer"
                        :value="option.value"
                    >
                        <SelectItemText>
                            {{ option.label }}
                        </SelectItemText>
                    </SelectItem>
                </SelectViewport>
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
    SelectContent,
    SelectItem,
    SelectItemText,
    SelectPortal,
    SelectRoot,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from 'radix-vue'

export interface IOption {
    label: string
    value: string
}

defineProps<{
    options: IOption[]
    name: string
    placeholder?: string
    required?: boolean
}>()
</script>
