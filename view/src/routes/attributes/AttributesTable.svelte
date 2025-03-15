<script lang="ts" generics="T extends ProductAttribute">
	import AppLoadingIndicator from '$lib/components/AppLoadingIndicator.svelte';
	import { ProductAttribute } from '$lib/models/attributes.model';
	import type { Snippet } from 'svelte';

	interface Props {
		data: Array<T>;
		onRowClick(row: T): void;
		onDelete(row: T): Promise<void>;
		extraColumns?: Snippet<[T]>;
	}

	let {
		data,
		onRowClick,
		onDelete,
		extraColumns,
	}: Props = $props();

	let deletingId = $state('');

	async function handleDelete(e: MouseEvent, row: T) {
		// prevent click from bubbling to the row click handler
		e.stopPropagation();

		deletingId = row.id;
		await onDelete(row);
		deletingId = '';
	}
</script>

<div class="table-wrap">
	<table class="table table-auto caption-bottom">
		<thead>
			<tr>
				<th>Id</th>
				<th>Nombre</th>
			</tr>
		</thead>
		<tbody class="[&>tr]:hover:preset-tonal-primary">
			{#each data as row}
				<tr class="cursor-pointer" onclick={() => onRowClick(row)}>
					<td>{row.id}</td>
					<td>{row.name}</td>
					{#if extraColumns}
						{@render extraColumns(row)}
					{/if}
					<td>
						<button
							class="btn-icon preset-tonal-error"
							aria-labelledby="delete"
							onclick={(e) => handleDelete(e, row)}
						>
							{#if deletingId && deletingId === row.id}
								<AppLoadingIndicator label="" />
							{:else}
								<i class="ri-delete-bin-line ri-sm"></i>
							{/if}
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
