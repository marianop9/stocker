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

	const perPage = 10;
	let pageNumber = $state(1);
	let totalCount = $state(0);
	// no idea why navigation widget requires a data array, so pass empty array
	// let products = $stproductsServiceProductModel[]);
	let products = [] as ProductModel[];

	/** An effect only depends on the values that it read the last time it ran.
	 * https://svelte.dev/docs/svelte/$effect#Understanding-dependencies
	 */
	$effect(() => {
		// reset pageNumber on filter change
		if (prevFilter !== filter) {
			pageNumber = 1;
		}
		const page = pageNumber;

		const fetchFn = () => {
			data = productsService.list(filter, page, perPage).then((list) => {
				totalCount = list.totalItems;
				// products = list.items;

				return list;
			});

			prevFilter = filter;
		};
        
        // debounce filter (if any and only if it changed)
		if (filter !== '' && filter !== prevFilter) {
			const timeoutId = setTimeout(fetchFn, 1000);

			return () => {
				clearTimeout(timeoutId);
			};
		} else {
			fetchFn();
		}
	});
</script>

<AppModal bind:showModal={showEditModal} title="Agregar producto">
	<ProductForm />
</AppModal>

<div class="card preset-tonal-primary text-primary-contrast-500 flex justify-between p-2">
	<div class="input-group grid-cols-[auto_1fr]">
		<div class="ig-cell preset-tonal-secondary">
			<i class="ri-search-line"></i>
		</div>
		<input class="ig-input" type="search" placeholder="Buscar..." bind:value={filter} />
	</div>

	<button class="btn preset-filled" onclick={() => (showEditModal = true)}>Agregar</button>
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
/>
