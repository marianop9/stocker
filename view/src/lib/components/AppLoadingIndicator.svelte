<script lang="ts">
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	let { label = 'Cargando...' }: { label?: string } = $props();
</script>

<div class="flex items-center gap-x-2">
	<ProgressRing value={null} size={'size-4'} />
	{label}
</div>
