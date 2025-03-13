<script lang="ts" generics="T extends any">
	import type { Snippet } from 'svelte';

	interface Props {
		filter: string;
		filterFn(filter: string, item: T): boolean;
		data: T[];
		renderBody: Snippet<[T[]]>;
	}

	let { filter, filterFn, data, renderBody }: Props = $props();

	let filteredData = $derived(data.filter((row) => filter === '' || filterFn(filter, row)));
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
			{@render renderBody(filteredData)}
			<!-- {#each data ?? [] as row, index}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                </tr>
            {/each} -->
		</tbody>
	</table>
</div>
