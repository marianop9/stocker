<script lang="ts">
	import AppInputWrapper from '$lib/components/AppInputWrapper.svelte';
	import AppLoadingIndicator from '$lib/components/AppLoadingIndicator.svelte';
	import AppModal from '$lib/components/AppModal.svelte';
	import { Category } from '$lib/models/attributes.model.js';
	import CategoriesForm from './CategoriesForm.svelte';

	let { data } = $props();

	let filter = $state('');
	let showEditModal = $state(false);

	function filteredList(row: Category) {
		return row.name.toLowerCase().includes(filter.toLowerCase());
	}

    function handleFormSubmission(c: Category) {
        console.log(c)
        showEditModal = false;
    }
</script>

<AppModal bind:showModal={showEditModal} title="Agregar categoria">
	<CategoriesForm
		onCancel={() => (showEditModal = false)}
		onSubmitted={handleFormSubmission}
	/>
</AppModal>

<div class="card preset-tonal my-2 flex justify-between p-2">
	<div class="input-group grid-cols-[auto_1fr]">
		<div class="ig-cell preset-tonal-secondary">
			<i class="ri-search-line"></i>
		</div>
		<input class="ig-input" type="search" placeholder="Buscar..." bind:value={filter} />
	</div>

	<button class="btn preset-tonal-primary" onclick={() => (showEditModal = true)}>Agregar</button>
</div>

{#await data.categories}
	<AppLoadingIndicator />
{:then list}
	<div class="table-wrap">
		<table class="table table-auto caption-bottom">
			<thead>
				<tr>
					<th>Id</th>
					<th>Nombre</th>
				</tr>
			</thead>
			<tbody class="[&>tr]:hover:preset-tonal-primary">
				{#each list.filter(filteredList) as row}
					<tr>
						<td>{row.id}</td>
						<td>{row.name}</td>
						<td>
							<button class="btn-icon preset-tonal-error" aria-labelledby="delete">
								<i class="ri-delete-bin-line ri-sm"></i>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/await}
