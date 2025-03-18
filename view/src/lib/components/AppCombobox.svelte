<script lang="ts">
	import AppLoadingIndicator from './AppLoadingIndicator.svelte';
	import { Combobox } from '@skeletonlabs/skeleton-svelte';

	type Option = {
		value: string;
		label: string;
	};

	interface Props {
		label: string;
		name: string;
		options: Option[];
		value?: string[];
		onValueChange?(selected: Option[]): void;
		loading?: boolean;
		required?: boolean;
	}

	let {
		label,
		name,
		options,
		value = $bindable([]),
		onValueChange,
		loading = false,
		required = false,
	}: Props = $props();

</script>

<Combobox
	data={options}
	{label}
	{name}
	{value}
	onValueChange={({ items, value: v }) => {
		value = v;
        if (onValueChange) onValueChange(items)
	}}
    {required}
>
	{#snippet arrow()}
		{#if loading}
			<AppLoadingIndicator label="" />
		{:else}
			<i class="ri-arrow-down-s-line"></i>
		{/if}
	{/snippet}
</Combobox>
