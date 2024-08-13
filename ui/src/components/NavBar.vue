<template>
    <nav class="flex justify-between p-2 bg-slate-700 text-white">
        <div class="flex gap-x-4">
            <RouterLink
                v-for="item in items"
                :key="item.url"
                :to="item.url ?? ''"
                class="hover:bg-slate-500 rounded p-2"
                active-class="bg-slate-500"
            >
                {{ item.label }}
            </RouterLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
const items = [
    {
        label: 'Inicio',
        url: '/',
    },
    {
        label: 'Productos',
        url: '/products',
    },
    {
        label: 'Administración',
        url: '/admin',
    },
]
</script>
