<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		filter: string; // debounced
		actions: Snippet;
	}

	let { filter = $bindable(''), actions }: Props = $props();
</script>

<div class="card preset-tonal my-2 flex justify-between p-2">
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

	{@render actions()}
</div>
