<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/service/auth.service';

	let form = $state({
		email: '',
		password: ''
	});

	let loading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;

		const success = await authService.login(form.email, form.password);
		if (success) {
			goto('/app');
		}
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
		<div class="flex justify-end">
			<button class="btn preset-filled" type="submit"> Ingresar </button>
		</div>
	</form>
</div>
