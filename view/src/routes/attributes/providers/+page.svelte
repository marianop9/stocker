<!-- <script lang="ts">
	import AppLoadingIndicator from '$lib/components/AppLoadingIndicator.svelte';
	import AppModal from '$lib/components/AppModal.svelte';
	import { Category } from '$lib/models/attributes.model.js';
	import { CategoriesService } from '$lib/service/attributes.service';
	import { onMount } from 'svelte';
	import CategoriesForm from './CategoriesForm.svelte';
	import AttributesTable from '../AttributesTable.svelte';
	import AttributeSearchBox from '../AttributeSearchBox.svelte';

	const categoriesService = new CategoriesService();

	let data: Category[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		data = await categoriesService.list();
		loading = false;
	});

	let filter = $state('');
	let showEditModal = $state(false);
	let selected: Category | null = $state(null);

	let filteredList = $derived(
		data.filter((row) => row.name.toLowerCase().includes(filter.toLowerCase()))
	);

	function handleFormSubmission(c: Category) {
		if (selected) {
			const idx = data.indexOf(selected);
			data[idx] = c;
		} else {
			data.push(c);
		}
		showEditModal = false;
	}

	function handleFormClose() {
		showEditModal = false;
		selected = null;
	}

	function handleRowClick(c: Category) {
		selected = c;
		showEditModal = true;
	}

	async function handleDelete(c: Category) {
		await categoriesService.delete(c.id);

		const idx = data.indexOf(c);
		data.splice(idx, 1);
	}
</script>

<AppModal
	bind:showModal={showEditModal}
	title="Agregar categoria"
	dismissable={false}
>
	<CategoriesForm
		category={selected}
		onCancel={handleFormClose}
		onSubmitted={handleFormSubmission}
	/>
</AppModal>

<AttributeSearchBox bind:filter>
	{#snippet actions()}
		<button
			class="btn preset-tonal-primary"
			onclick={() => (showEditModal = true)}>Agregar</button
		>
	{/snippet}
</AttributeSearchBox>

{#if loading}
	<AppLoadingIndicator />
{:else}
	<AttributesTable
		data={filteredList}
		onRowClick={handleRowClick}
		onDelete={handleDelete}
	/>
{/if} -->
