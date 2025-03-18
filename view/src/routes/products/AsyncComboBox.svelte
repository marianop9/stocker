<script lang="ts" generics="T extends ProductAttribute">
	import AppCombobox from '$lib/components/AppCombobox.svelte';
	import { ProductAttribute } from '$lib/models/attributes.model';
	import type { ProductAttributeService } from '$lib/service/attributes.service';
	import { onMount } from 'svelte';
	import { AttributeFetcher } from './attributeFetcher.svelte';

	let {
		label,
		name,
		service,
        value = $bindable()
	}: {
		label: string;
		name: string;
		service: ProductAttributeService<T>;
        value: string[];
	} = $props();

	const fetcher = new AttributeFetcher(service);

	onMount(() => {
		fetcher.fetchData();
	});
</script>

<AppCombobox
	{label}
	{name}
	options={fetcher.data.map(({ id, name }) => ({
		value: id,
		label: name,
	}))}
	loading={fetcher.loading}
    bind:value={value}
    required
/>
