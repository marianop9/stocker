<script lang="ts">
	import { page } from '$app/state';
	import { attributeCollectionNames } from '$lib/models/attributes.model';

	let { children } = $props();

	type Tab = {
		id: string;
		title: string;
		// Content: Component;
	};
	const tabs: Tab[] = [
		{
			id: 'categories',
			title: 'Categorias',
		},
		{
			id: 'providers',
			title: 'Proveedores',
		},
	];

	// active tab (last path segment)
	let activeTabId = $derived(
		page.url.pathname.slice(page.url.pathname.lastIndexOf('/') + 1)
	);
</script>

<nav class="btn-group preset-outlined-surface-200-800 flex justify-center mb-8">
	{#each tabs as tab}
		<a
			href={tab.id}
			class="btn hover:preset-tonal"
			class:preset-filled={activeTabId === tab.id}
		>
			{tab.title}
		</a>
	{/each}
</nav>

{#if attributeCollectionNames.some((attr) => attr === activeTabId)}
	<div class="mx-auto w-2/3">
		{@render children()}
	</div>
{:else}
	atributo desconocido
{/if}
