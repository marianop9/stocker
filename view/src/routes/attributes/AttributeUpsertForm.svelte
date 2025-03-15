<script
	lang="ts"
	generics="T extends ProductAttribute, S extends ProductAttributeService<T>"
>
	import AppButton from '$lib/components/AppButton.svelte';
	import AppErrorCard from '$lib/components/AppErrorCard.svelte';
	import AppInputWrapper from '$lib/components/AppInputWrapper.svelte';
	import { ProductAttribute } from '$lib/models/attributes.model';
	import { decodeServiceException } from '$lib/pocketbase';
	import {
		CategoriesService,
		ProductAttributeService,
	} from '$lib/service/attributes.service';
	import type { Snippet } from 'svelte';

	interface Props {
		attribute: T | null;
		buildAttribute(
			attribute: {
				id: string;
				name: string;
				description: string;
			},
			form: HTMLFormElement
		): T;
		attributeService: S;
		onCancel(): void;
		onSubmitted(c: T): void;
		extraFields?: Snippet;
	}

	let {
		attribute,
		buildAttribute,
		attributeService,
		onCancel,
		onSubmitted,
		extraFields,
	}: Props = $props();

	let loading = $state(false);
	let serverError = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const id = attribute?.id ?? '';
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		const newData = buildAttribute({ id, name, description }, form);

		try {
			const result =
				attribute !== null
					? await attributeService.update(attribute.id, newData)
					: await attributeService.create(newData);

			onSubmitted(result);
			form.reset();
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
		<input
			class="input"
			type="text"
			name="name"
			required
			minlength="3"
			defaultValue={attribute?.name ?? ''}
		/>
	</AppInputWrapper>
	<AppInputWrapper label="Descripción">
		<textarea
			name="description"
			class="textarea"
			rows="3"
			defaultValue={attribute?.description ?? ''}
		></textarea>
	</AppInputWrapper>

	{@render extraFields?.()}

	<div class="mt-4 flex justify-end gap-x-1">
		<button type="button" class="btn" onclick={onCancel}>Cancelar</button>
		<AppButton type="submit" label="Guardar" {loading} />
	</div>
</form>
