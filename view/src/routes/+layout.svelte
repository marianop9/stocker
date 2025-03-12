<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { page } from '$app/state';

	import 'remixicon/fonts/remixicon.css';
	import '../app.css';
	import Modal from '$lib/components/Modal.svelte';
	import { goto } from '$app/navigation';
	import { authService } from '$lib/service/auth.service';

	let { children } = $props();

	const loginPage = '/login';

	let isAuth = $derived(authService.isAuth() || page.route.id === loginPage);

	function onSessionExpired() {
		goto(loginPage);
	}
	function logout() {
		authService.logout();
		onSessionExpired();
	}

	$effect(() => {
		console.log('authState: ' + isAuth);
	});
	$effect(() => {
		console.log('route is: ' + page.route.id);
	});

	let routes = [
		{
			id: '/',
			label: 'Inicio',
			title: 'Stocker',
			icon: 'ri-home-4-line'
		},
		{
			id: '/products',
			label: 'Productos',
			title: 'Productos',
			icon: 'ri-shirt-line'
		}
	];
</script>

<Modal showModal={!isAuth} dismissable={false}>
	{#snippet header()}
		<span class="text-xl">La sesión ha expirado</span>
	{/snippet}
	<p>Vuelva a iniciar sesión.</p>

	<div class="flex justify-end">
		<button class="btn preset-filled" onclick={onSessionExpired}>Continuar</button>
	</div>
</Modal>

{#if page.route.id === loginPage}
	{@render children()}
{:else}
	<div class="grid grid-cols-[auto_1fr]">
		<!-- Sidebar -->
		<aside class="sticky top-0 col-span-1 h-screen p-4">
			<div class="flex h-full flex-col justify-between">
				<div>
					{#each routes as route}
						<a
							href={route.id}
							class="hover:bg-surface-600 my-1 flex gap-2 rounded p-2"
							class:bg-surface-900={page.route.id === route.id}
						>
							<i class={route.icon}></i>
							<span class="hidden md:block">{route.label}</span>
						</a>
					{/each}
				</div>
				<!-- <button class="btn preset-filled-surface-500 mb-5"> -->
				<button class="hover:bg-surface-600 my-1 flex gap-2 rounded p-2" onclick={logout}>
					<i class="ri-logout-box-line"></i>
					<span class="hidden md:block">Salir</span>
				</button>
			</div>
		</aside>
		<!-- Main -->
		<main class="col-span-1 space-y-4 p-4">
			<AppBar>
				{#snippet headline()}
					<h1 class="h1">
						{routes.find((r) => r.id === page.route.id)?.title ?? 'title missing'}
					</h1>
				{/snippet}
			</AppBar>
			<!-- <button onclick={() => ()}>shomodal</button> -->

			{@render children()}
		</main>
	</div>
{/if}
