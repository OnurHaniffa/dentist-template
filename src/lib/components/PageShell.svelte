<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/ui/cn';

	type Props = {
		class?: string;
		children?: Snippet;
	};

	let { class: className, children }: Props = $props();

	const classes = $derived(cn('min-h-screen bg-neutral-50', className));
</script>

<div class={classes}>
	<div in:fade={{ duration: 160 }}>
		{@render children?.()}
	</div>
</div>
