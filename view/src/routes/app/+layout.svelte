<script lang="ts">
	import { Home, Icon, Shirt } from 'lucide-svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import '../app.css';
	import { page } from '$app/state';
	import { type Component } from 'svelte';
	let { children } = $props();

	let routes = [
		{
			id: '/',
			label: 'Inicio',
			title: 'Stocker',
			icon: Home
		},
		{
			id: '/products',
			label: 'Productos',
			title: 'Productos',
			icon: Shirt
		}
	];
</script>

{#if page.route.id !== '/login'}
	<div class="grid grid-cols-[auto_1fr]">
		<!-- Sidebar -->
		<aside class="sticky top-0 col-span-1 h-screen bg-yellow-500 p-4">
			{#each routes as route}
				<a
					href={route.id}
					class="my-1 flex gap-2 p-2 hover:bg-amber-300"
					class:bg-amber-100={page.route.id === route.id}
				>
					<route.icon />
					<span class="hidden md:block">{route.label}</span>ppack
				</a>
			{/each}
		</aside>
		<!-- Main -->
		<main class="col-span-1 space-y-4 bg-green-500 p-4">
			<AppBar>
				{#snippet headline()}
					<h2 class="text-lg">
						{routes.find((r) => r.id === page.route.id)?.title ?? 'title missing'}
					</h2>
				{/snippet}
			</AppBar>
			{@render children()}
		</main>
	</div>
{:else}
	{@render children()}
{/if}
