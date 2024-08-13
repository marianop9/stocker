<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
            <!-- optionally define the triger or toggle manually with v-model:open -->
            <slot name="trigger"></slot>
        </DialogTrigger>
        <DialogContent
            class="sm:max-w-[700px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[80dvh]"
        >
            <DialogHeader class="p-6 pb-0">
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription v-if="description">{{ description }}</DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 px-6 overflow-y-auto">
                <slot name="content"> </slot>
            </div>
            <DialogFooter class="p-6 pt-0"> <slot name="footer" /> </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

const open = defineModel<boolean>('open')

defineProps<{
    title: string
    description?: string
}>()
</script>
