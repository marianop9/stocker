<script lang="ts">
	import AppInputWrapper from '$lib/components/AppInputWrapper.svelte';
	import {
		CategoriesService,
		MaterialsService,
		ProvidersService,
	} from '$lib/service/attributes.service';
	import { onMount } from 'svelte';
	import AsyncComboBox from './AsyncComboBox.svelte';
	import { type ProductDTO } from '$lib/models/product.model';
	import AppErrorCard from '$lib/components/AppErrorCard.svelte';
	import { productsService } from '$lib/service/products.service';
	import { decodeServiceException } from '$lib/pocketbase';
	import AppButton from '$lib/components/AppButton.svelte';

	interface Props {
		onCancel(): void;
		onSubmitted(): void;
	}

	let { onCancel, onSubmitted }: Props = $props();

	const categoriesService = new CategoriesService();
	const providersService = new ProvidersService();
	const materialsService = new MaterialsService();

	let selectedCategoryId: string[] = $state([]);
	let selectedProviderId: string[] = $state([]);
	let selectedMaterialId: string[] = $state([]);

	let loading = $state(false);
	let serverError = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		// const data = Object.fromEntries(formData.entries());
		// console.log(data);

		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		const categoryId = selectedCategoryId[0];
		const providerId = selectedProviderId[0];
		const materialId = selectedMaterialId[0];

		const unitCost = parseFloat(formData.get('unitCost') as string);
		const totalCost = parseFloat(formData.get('totalCost') as string);
		const cashPrice = parseFloat(formData.get('cashPrice') as string);
		const retailPrice = parseFloat(formData.get('retailPrice') as string);

		const dto: ProductDTO = {
			id: '',
			name,
			description,
			categoryId,
			providerId,
			materialId,
			unitCost,
			totalCost,
			cashPrice,
			retailPrice,
            sku: 'sku-todo'
		};

		try {
			const result = await productsService.create(dto);

			onSubmitted();
			form.reset();
		} catch (e) {
			serverError = decodeServiceException(e);
		}
		loading = false;
	}
</script>

<form class="flex flex-col gap-2" onsubmit={handleSubmit}>
	<AppInputWrapper label="Nombre">
		<input
			class="input"
			type="text"
			name="name"
			minlength="3"
			maxlength="100"
			required
		/>
	</AppInputWrapper>

	<AppInputWrapper label="Descripción">
		<textarea name="description" class="textarea" rows="3" maxlength="200"
		></textarea>
	</AppInputWrapper>

	<AsyncComboBox
		label="Categoria"
		name="category"
		service={categoriesService}
		bind:value={selectedCategoryId}
	/>
	<AsyncComboBox
		label="Proveedor"
		name="provider"
		service={providersService}
		bind:value={selectedProviderId}
	/>
	<AsyncComboBox
		label="Material"
		name="material"
		service={materialsService}
		bind:value={selectedMaterialId}
	/>

	<div class="grid grid-cols-2 gap-x-4">
		<AppInputWrapper label="Costo unitario">
			{@render moneyInput('unitCost')}
		</AppInputWrapper>
		<AppInputWrapper label="Costo total">
			{@render moneyInput('totalCost')}
		</AppInputWrapper>
	</div>

	<div class="grid grid-cols-2 gap-x-4">
		<AppInputWrapper label="Precio contado">
			{@render moneyInput('cashPrice')}
		</AppInputWrapper>
		<AppInputWrapper label="Precio lista">
			{@render moneyInput('retailPrice')}
		</AppInputWrapper>
	</div>

	{#if serverError}
		<AppErrorCard message={serverError} />
	{/if}

	<div class="flex justify-end gap-x-1">
		<button type="button" class="btn preset-tonal-surfaces" onclick={onCancel}
			>Cancelar</button
		>
		<AppButton type="submit" {loading} label="Guardar" />
	</div>
</form>

{#snippet moneyInput(name: string)}
	<div class="input-group grid-cols-[auto_1fr]">
		<div class="ig-cell preset-tonal">
			<i class="ri-money-dollar-circle-line"></i>
		</div>
		<input class="ig-input" type="number" {name} required min="0" step=".01" />
	</div>
{/snippet}
