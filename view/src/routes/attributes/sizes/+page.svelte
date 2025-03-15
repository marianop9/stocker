<script lang="ts">
	import AppLoadingIndicator from '$lib/components/AppLoadingIndicator.svelte';
	import AppModal from '$lib/components/AppModal.svelte';
	import { Size } from '$lib/models/attributes.model.js';
	import { SizesService } from '$lib/service/attributes.service';
	import { getContext, onMount } from 'svelte';
	import AttributesTable from '../AttributesTable.svelte';
	import AttributeSearchBox from '../AttributeSearchBox.svelte';
	import AttributeUpsertForm from '../AttributeUpsertForm.svelte';
	import {
		getAttributesContext,
		setServerError,
	} from '../attributesContext.svelte';
	import { decodeServiceException } from '$lib/pocketbase';

	const sizesService = new SizesService();

	let data: Size[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		data = await sizesService.list();
		loading = false;
	});

	let filter = $state('');
	let showEditModal = $state(false);
	let selected: Size | null = $state(null);

	let filteredList = $derived(
		data.filter((row) => row.name.toLowerCase().includes(filter.toLowerCase()))
	);

	function handleFormSubmission(c: Size) {
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

	function handleRowClick(c: Size) {
		selected = c;
		showEditModal = true;
	}

	async function handleDelete(c: Size) {
		try {
			await sizesService.delete(c.id);
			const idx = data.indexOf(c);
			data.splice(idx, 1);
		} catch (ex) {
			setServerError(ex);
		}
	}
</script>

<AppModal
	bind:showModal={showEditModal}
	title="Agregar color"
	dismissable={false}
>
	<AttributeUpsertForm
		attribute={selected}
		buildAttribute={({ id, name, description }, _) =>
			new Size(id, name, description)}
		attributeService={sizesService}
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
	>
		<!-- {#snippet extraColumns(row)}
			<td>#{row.hexcode}</td>
		{/snippet} -->
	</AttributesTable>
{/if}
