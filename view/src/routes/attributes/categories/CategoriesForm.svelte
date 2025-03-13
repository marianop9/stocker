<script lang="ts">
	import AppButton from '$lib/components/AppButton.svelte';
	import AppErrorCard from '$lib/components/AppErrorCard.svelte';
	import AppInputWrapper from '$lib/components/AppInputWrapper.svelte';
	import { Category } from '$lib/models/attributes.model';
	import { decodeServiceException } from '$lib/pocketbase';
	import { CategoriesService } from '$lib/service/attributes.service';

	interface Props {
		onCancel(): void;
		onSubmitted(c: Category): void;
	}

	let { onCancel, onSubmitted }: Props = $props();

	let loading = $state(false);
	let serverError = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;

		const formData = new FormData(e.target as HTMLFormElement);

		const cat = Category.new(formData.get('name') as string, formData.get('description') as string);

		try {
			const result = await new CategoriesService().create(cat);
			onSubmitted(result);
		} catch (e) {
			serverError = decodeServiceException(e);
		}
		loading = false;
	}
</script>

<form class="flex flex-col gap-2" onsubmit={handleSubmit}>
	{#if serverError}
		<AppErrorCard message={'Ocurrió un error: ' + serverError} />
	{/if}

	<AppInputWrapper label="Nombre">
		<input class="input" type="text" name="name" required />
	</AppInputWrapper>
	<AppInputWrapper label="Descripción">
		<textarea name="description" class="textarea" rows="3"></textarea>
	</AppInputWrapper>

	<div class="mt-4 flex justify-end gap-x-1">
		<button class="btn" onclick={onCancel}>Cancelar</button>
		<AppButton label="Guardar" {loading} type="submit" />
	</div>
</form>
