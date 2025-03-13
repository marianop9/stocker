<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		showModal = $bindable(false),
		title,
		children,
		dismissable = true
	}: {
		showModal: boolean;
		title: string;
		children: Snippet;
		dismissable?: boolean;
	} = $props();

	let dialog: HTMLDialogElement | undefined = $state(undefined);

	$effect(() => {
        if (!dialog) return;

		if (showModal) {
			dialog.showModal();
		} else if (dialog.open) {
            dialog.close()
        }
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		// close when clicking outside the inner div
		if (dismissable && e.target === dialog) {
			dialog.close();
		}
	}}
>
	<div>
		<div class="flex items-center justify-between pb-1">
            <span class="h4">{title}</span>
			{#if dismissable}
				<button class="btn-icon" aria-label="close-dialog" onclick={() => dialog?.close()}>
					<i class="ri-close-large-line"></i>
				</button>
			{/if}
		</div>
		<hr />
		<div class="pt-4 text-base">
			{@render children?.()}
		</div>
	</div>
</dialog>

<style>
	dialog {
		position: absolute;
		max-width: 60%;
		min-width: 40%;
		border-radius: 0.1rem;
		border: none;
		padding: 0;
		font-size: large;
		margin: 10rem auto 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
