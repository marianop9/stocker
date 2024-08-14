<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
    <header>
        <NavBar />
    </header>

    <div class="p-4">
        <h1 class="text-3xl font-bold mb-4">{{ $route.name }}</h1>
        <RouterView />
    </div>
</template>
