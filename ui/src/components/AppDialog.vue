<template>
    <DialogRoot v-model:open="open">
        <DialogTrigger as-child>
            <!-- optionally define the triger or toggle manually with v-model:open -->
            <slot name="trigger"></slot>
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay
                class="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
            />
            <DialogContent
                class="data-[state=open]:animate-contentShow overflow-y-auto fixed top-[50%] left-[50%] max-h-[85vh] min-w-[50vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
            >
                <DialogTitle as-child>
                    <div class="flex justify-between items-center text-xl">
                        <h2 class="font-semibold">{{ title }}</h2>
                        <DialogClose class="p-2 hover:bg-gray-200 rounded-full">X</DialogClose>
                    </div>
                </DialogTitle>
                <DialogDescription v-if="description" class="mt-3">{{
                    description
                }}</DialogDescription>
                <div class="p-2">
                    <slot name="content"> </slot>
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'radix-vue'

const open = defineModel<boolean>('open')

defineProps<{
    title: string
    description?: string
}>()
</script>
