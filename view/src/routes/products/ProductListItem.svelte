<script lang="ts">
	import type { ProductModel } from '$lib/models/product.model';

	const {
		product
	}: {
		product: ProductModel;
	} = $props();
</script>

<div class="card preset-tonal flex gap-x-2 p-2">
	<div class="bg-surface-600 my-auto rounded-full p-1">
		<i class="ri-box-3-line"></i>
	</div>
	<div class="grid grow grid-cols-3">
		<div class="text-lg">
			{product.name}
		</div>
		<div class="flex flex-col items-start text-end text-sm">
			<div>
				<span class="text-xs">Categoria: </span>
				{product.categoryName}
			</div>
			<div>
				<span class="text-xs">Proveedor: </span>
				{product.providerName}
			</div>
		</div>
		<div></div>
	</div>
</div>
