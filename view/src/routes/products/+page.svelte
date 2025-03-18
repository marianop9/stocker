<script lang="ts">
	import { decodeServiceException } from '$lib/pocketbase';
	import { Pagination, ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { productsService } from '$lib/service/products.service';
	import ProductListItem from './ProductListItem.svelte';
	import AppModal from '$lib/components/AppModal.svelte';
	import ProductForm from './ProductForm.svelte';
	import type { ProductModel } from '$lib/models/product.model';

	let showEditModal = $state(false);

	let data: ReturnType<typeof productsService.list> | undefined = $state();

	let prevFilter = '';
	let filter = $state('');
	let pageNumber = $state(1);

	let totalCount = $state(0);
	const perPage = 10;
	// no idea why navigation widget requires a data array, so pass empty array
	// let products = $stproductsServiceProductModel[]);
	let products = [] as ProductModel[];

	function fetchData() {
		data = productsService.list(filter, pageNumber, perPage).then((list) => {
			totalCount = list.totalItems;

			return list;
		});

		prevFilter = filter;
	}
	/** An effect only depends on the values that it read the last time it ran.
	 * https://svelte.dev/docs/svelte/$effect#Understanding-dependencies
	 */
	$effect(() => {
		// reset pageNumber on filter change
		if (pageNumber > 1 && prevFilter !== filter) {
			pageNumber = 1;
		}
		// debounce filter (if any and only if it changed)
		if (filter !== '' && filter !== prevFilter) {
			const timeoutId = setTimeout(fetchData, 1000);

			return () => {
				clearTimeout(timeoutId);
			};
		} else {
			fetchData();
		}
	});
</script>

<AppModal bind:showModal={showEditModal} title="Agregar producto">
	{#if showEditModal}
		<ProductForm
			onCancel={() => (showEditModal = false)}
			onSubmitted={() => {
                fetchData();
                showEditModal = false;
            }}
		/>
	{/if}
</AppModal>

<div class="card preset-tonal my-4 flex justify-between p-2">
	<div class="input-group grid-cols-[auto_1fr]">
		<div class="ig-cell preset-tonal-secondary">
			<i class="ri-search-line"></i>
		</div>
		<input
			class="ig-input"
			type="search"
			placeholder="Buscar..."
			bind:value={filter}
		/>
	</div>

	<button
		class="btn preset-tonal-primary"
		onclick={() => (showEditModal = true)}>Agregar</button
	>
</div>

{#await data}
	<div class="flex items-center gap-x-2">
		<ProgressRing value={null} size={'size-4'} />
		Loading...
	</div>
{:then prods}
	<div class="space-y-2">
		{#each prods?.items ?? [] as p}
			<ProductListItem product={p} />
		{/each}
	</div>
{:catch ex}
	{decodeServiceException(ex)}
{/await}
<Pagination
	data={products}
	count={totalCount}
	pageSize={perPage}
	page={pageNumber}
	alternative
	onPageChange={({ page }) => {
		pageNumber = page;
	}}
	classes="mt-2"
/>
