<script lang="ts">
	let { message }: { message: string } = $props();
</script>

<div class="bg-error-500 rounded-md py-1 px-2 text-sm">
	<span class="text-error-contrast-500">{message}</span>
</div>