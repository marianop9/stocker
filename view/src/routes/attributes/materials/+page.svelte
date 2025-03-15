<script lang="ts">
	import AppLoadingIndicator from '$lib/components/AppLoadingIndicator.svelte';
	import AppModal from '$lib/components/AppModal.svelte';
	import { Material } from '$lib/models/attributes.model.js';
	import { MaterialsService } from '$lib/service/attributes.service';
	import { onMount } from 'svelte';
	import AttributesTable from '../AttributesTable.svelte';
	import AttributeSearchBox from '../AttributeSearchBox.svelte';
	import AttributeUpsertForm from '../AttributeUpsertForm.svelte';
	import { setServerError } from '../attributesContext.svelte';

	const materialsService = new MaterialsService();

	let data: Material[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		data = await materialsService.list();
		loading = false;
	});

	let filter = $state('');
	let showEditModal = $state(false);
	let selected: Material | null = $state(null);

	let filteredList = $derived(
		data.filter((row) => row.name.toLowerCase().includes(filter.toLowerCase()))
	);

	function handleFormSubmission(c: Material) {
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

	function handleRowClick(c: Material) {
		selected = c;
		showEditModal = true;
	}

	async function handleDelete(c: Material) {
		try {
			await materialsService.delete(c.id);
			const idx = data.indexOf(c);
			data.splice(idx, 1);
		} catch (ex) {
			setServerError(ex);
		}
	}
</script>

<AppModal
	bind:showModal={showEditModal}
	title="Agregar material"
	dismissable={false}
>
	<AttributeUpsertForm
		attribute={selected}
		buildAttribute={({ id, name, description }, _) =>
			new Material(id, name, description)}
		attributeService={materialsService}
		onCancel={handleFormClose}
		onSubmitted={handleFormSubmission}
	></AttributeUpsertForm>
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
{/if}
