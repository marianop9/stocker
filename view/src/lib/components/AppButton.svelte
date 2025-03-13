<script lang="ts">
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	interface Props {
        label: string;
		loading?: boolean;
		type?: 'submit' | 'reset' | 'button';
	}

	let { label, loading = false, type = 'button' }: Props = $props();
</script>

<button class="btn preset-filled" {type} disabled={loading}>
	{#if loading}
		<ProgressRing value={null} size="size-4" />
	{/if}
	{label}
</button>
