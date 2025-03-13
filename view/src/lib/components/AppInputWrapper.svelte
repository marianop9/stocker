<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label,
		error,
		children
	}: {
		label: string;
		error?: string;
		children: Snippet;
	} = $props();
</script>

<label class="label">
	<span class="label-text">{label}</span>
	{@render children()}
	{#if error}
		<span class="text-error-500 ml-1 text-xs font-normal">Mensaje de error</span>
	{/if}
</label>
