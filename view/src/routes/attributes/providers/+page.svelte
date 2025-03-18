<script lang="ts">
	import AppLoadingIndicator from '$lib/components/AppLoadingIndicator.svelte';
	import AppModal from '$lib/components/AppModal.svelte';
	import { Provider } from '$lib/models/attributes.model.js';
	import { ProvidersService } from '$lib/service/attributes.service';
	import { onMount } from 'svelte';
	import AttributesTable from '../AttributesTable.svelte';
	import AttributeSearchBox from '../AttributeSearchBox.svelte';
	import AttributeUpsertForm from '../AttributeUpsertForm.svelte';
	import { setServerError } from '../attributesContext.svelte';

	const providersService = new ProvidersService();

	let data: Provider[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		data = await providersService.list();
		loading = false;
	});

	let filter = $state('');
	let showEditModal = $state(false);
	let selected: Provider | null = $state(null);

	let filteredList = $derived(
		data.filter((row) => row.name.toLowerCase().includes(filter.toLowerCase()))
	);

	function handleFormSubmission(c: Provider) {
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

	function handleRowClick(c: Provider) {
		selected = c;
		showEditModal = true;
	}

	async function handleDelete(c: Provider) {
		try {
			await providersService.delete(c.id);
			const idx = data.indexOf(c);
			data.splice(idx, 1);
		} catch (ex) {
			setServerError(ex);
		}
	}
</script>

<AppModal
	bind:showModal={showEditModal}
	title="Agregar proveedor"
	nonDismissable
>
	<AttributeUpsertForm
		attribute={selected}
		attributeService={providersService}
		buildAttribute={({ id, name, description }) =>
			new Provider(id, name, description)}
		onSubmitted={handleFormSubmission}
		onCancel={handleFormClose}
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
