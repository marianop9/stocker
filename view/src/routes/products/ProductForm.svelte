<script lang="ts">
	import AppInputWrapper from '$lib/components/AppInputWrapper.svelte';

	interface Props {}

	let {}: Props = $props();
</script>

<div class="flex flex-col gap-2">
	<AppInputWrapper label="Nombre">
		<input class="input" type="text" placeholder="Input" />
	</AppInputWrapper>
	<AppInputWrapper label="Precio">
		<input class="input" type="text" placeholder="Input" />
	</AppInputWrapper>

	<div class="flex justify-end gap-x-1">
		<button class="btn preset-tonal-surfaces">Cancelar</button>
		<button class="btn preset-filled">Guardar</button>
	</div>
</div>
