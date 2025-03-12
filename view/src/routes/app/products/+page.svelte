<script lang="ts">
	import { decodeServiceException } from '$lib/pocketbase';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Pagina de productos</h1>
{#await data.products}
	Loading...
{:then products}
	{#each products as p}
		<div>
			{p.name}
		</div>
	{/each}
{:catch ex}
    {decodeServiceException(ex)}
{/await}

