<script lang="ts">
	import { page } from '$app/state';
	import { setContext } from 'svelte';
	import { createAttributesContext } from './attributesContext.svelte';

	let { children } = $props();

	type Tab = {
		id: string;
		title: string;
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
		{
			id: 'materials',
			title: 'Materiales',
		},
		{
			id: 'colors',
			title: 'Colores',
		},
		{
			id: 'sizes',
			title: 'Talles',
		},
	];

	// active tab (last path segment)
	let activeTabId = $derived(
		page.url.pathname.slice(page.url.pathname.lastIndexOf('/') + 1)
	);

	let attributesContext = createAttributesContext();

	$effect(() => {
		if (attributesContext.serverError) {
			window.scroll({ top: 0, behavior: 'smooth' });
		}
	});

	function dismissServerError() {
		attributesContext.serverError = '';
	}
</script>

<div
	class="border-surface-200-800 mb-4 flex justify-center gap-2 border-b-[1px]"
>
	{#each tabs as tab}
		<a
			href={tab.id}
			class="translate-y-[1px] border-b-[1px] border-transparent pb-2 opacity-100"
			class:border-b-surface-950-50={activeTabId === tab.id}
		>
			<div class="btn hover:preset-tonal">
				{tab.title}
			</div>
		</a>
	{/each}
</div>

<!-- <Tabs
	value={group}
	onValueChange={(e) => (group = e.value)}
	listJustify="justify-center"
	activationMode="manual"
>
	{#snippet list()}
		{#each tabs as tab}
			<Tabs.Control value={tab.id}>{tab.title}</Tabs.Control>
		{/each}
	{/snippet}
	{#snippet content()}
		<div class="mx-auto w-full lg:w-2/3">
			<Tabs.Panel value="categories">
				<CategoriesTab isActiveTab={tabs[0].id === group} />
			</Tabs.Panel>

			<Tabs.Panel value="providers">
				<ProvidersTab isActiveTab={tabs[1].id === group} />
			</Tabs.Panel>
		</div>
	{/snippet}
</Tabs> -->

{#if tabs.some((t) => t.id === activeTabId)}
	<div class="mx-auto max-w-full lg:max-w-2/3">
		{#if attributesContext.serverError}
			<div
				class="card preset-tonal-error flex items-center justify-between p-2"
			>
				<div class="w-2/3">
					{attributesContext.serverError}
				</div>
				<button
					class="btn-icon"
					aria-label="dimiss-error"
					onclick={dismissServerError}
				>
					<i class="ri-close-large-line"></i>
				</button>
			</div>
		{/if}
		{@render children()}
	</div>
{:else}
	atributo desconocido
{/if}
