<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/service/auth.service';
	import { onMount } from 'svelte';
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	onMount(() => {
		if (authService.isAuth()) {
			goto('/');
		}
	});

	let form = $state({
		email: '',
		password: ''
	});

	let loading = $state(false);
	let failed = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;

		const success = await authService.login(form.email, form.password);
		if (success) {
			await goto('/');
			return;
		}

		loading = false;
		failed = true;
	}
</script>

<div class="flex h-screen items-center justify-center">
	<form class="mx-auto w-full max-w-md space-y-4" onsubmit={handleSubmit}>
		<label class="label">
			<span class="label-text">Usuario</span>
			<input class="input" type="email" bind:value={form.email} />
		</label>
		<label class="label">
			<span class="label-text">Contraseña</span>
			<input class="input" type="password" bind:value={form.password} />
		</label>
		{#if failed}
			<div class="bg-error-200 rounded-lg py-1 text-center">
				<span class="text-error-contrast-200">Usuario o contraseña invalida.</span>
			</div>
		{/if}

		<div class="flex justify-end">
			<button class="btn preset-filled" type="submit" disabled={loading}>
				{#if loading}
					<ProgressRing value={null} size="size-4" />
				{/if}
				Ingresar
			</button>
		</div>
	</form>
</div>
