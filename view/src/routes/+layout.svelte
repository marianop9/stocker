<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { page } from '$app/state';

	import 'remixicon/fonts/remixicon.css';
	import '../app.css';
	import AppModal from '$lib/components/AppModal.svelte';
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

	type Route = {
		id: string;
		title: string;
		label?: string;
		icon?: string;
		children?: Route[];
	};
	let routes: Route[] = [
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
		},
		{
			id: '/attributes',
			label: 'Atributos',
			title: 'Administrar Atributos',
			icon: 'ri-tools-line',
			children: [
				{
					id: '/categories',
					title: 'Categorias'
				},
				{
					id: '/providers',
					title: 'Proveedores'
				}
			]
		}
	];

	function findNestedRouteTitle(currentRoute: string) {
		const routesWithChildren = routes.filter((r) => r.children?.length);

		for (const parent of routesWithChildren) {
			const match = parent.children!.find((child) => currentRoute === `${parent.id}${child.id}`);
			if (match) {
				return parent.title;
			}
		}
	}
</script>

<AppModal showModal={!isAuth} dismissable={false} title="La sesión ha expirado">
	<p>Vuelva a iniciar sesión.</p>

	<div class="flex justify-end">
		<button class="btn preset-filled" onclick={onSessionExpired}>Continuar</button>
	</div>
</AppModal>

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
							href={route.children?.length ? route.id.concat(route.children[0].id) : route.id}
							class="hover:bg-surface-600 my-1 flex gap-2 rounded p-2"
							class:bg-surface-900={page.route.id === route.id}
						>
							<i class={route.icon}></i>
							<span class="hidden md:block">{route.label}</span>
						</a>
					{/each}
				</div>

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
						{routes.find((r) => r.id === page.route.id)?.title ??
							findNestedRouteTitle(page.url.pathname) ??
							'title missing'}
					</h1>
				{/snippet}
			</AppBar>

			{@render children()}
		</main>
	</div>
{/if}
