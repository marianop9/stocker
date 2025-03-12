<script lang="ts">
	import { decodeServiceException } from '$lib/pocketbase';
	import { Pagination, ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { productService } from '$lib/service/products.service';
	import type { ProductModel } from '$lib/models/product.model';

	let data: ReturnType<typeof productService.list> | undefined = $state();

	let prevFilter = '';
	let filter = $state('');

	const perPage = 10;
	let pageNumber = $state(1);
	let totalCount = $state(0);
	// no idea why navigation widget requires a data array, so pass empty array
	// let products = $state.raw([] as ProductModel[]);
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
			data = productService.list(filter, page, perPage).then((list) => {
				totalCount = list.totalItems;
				// products = list.items;

				return list;
			});

			prevFilter = filter;
		};

		// debounce filter (if any and only if it changed)
		if (filter !== '' && filter !== prevFilter) {
			const timeoutId = setTimeout(fetchFn, 800);

			return () => {
				clearTimeout(timeoutId);
			};
		} else {
			fetchFn();
		}
	});
</script>

<div class="card preset-tonal-primary text-primary-contrast-500 p-2">
	<div class="input-group grid-cols-[auto_1fr]">
		<div class="ig-cell preset-tonal-secondary">
			<i class="ri-search-line"></i>
		</div>
		<input class="ig-input" type="search" placeholder="Buscar..." bind:value={filter} />
	</div>
</div>

{#await data}
	<div class="flex items-center gap-x-2">
		<ProgressRing value={null} size={'size-4'} />
		Loading...
	</div>
{:then prods}
	<div class="space-y-2">
		{#each prods?.items ?? [] as p}
			<div class="card preset-tonal flex gap-x-2 p-2">
				<div class="bg-surface-600 my-auto rounded-full p-1">
					<i class="ri-box-3-line"></i>
				</div>
				<div class="grid grow grid-cols-3">
					<div class="text-lg">
						{p.name}
					</div>
					<div class="flex flex-col items-start text-end text-sm">
						<div>
							<span class="text-xs">Categoria: </span>
							{p.categoryName}
						</div>
						<div>
							<span class="text-xs">Proveedor: </span>
							{p.providerName}
						</div>
					</div>
					<div></div>
				</div>
			</div>
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
