<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/ui/cn';

	type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	type Props = {
		size?: Size;
		class?: string;
		children?: Snippet;
	};

	let { size = 'lg', class: className, children }: Props = $props();

	const sizes: Record<Size, string> = {
		sm: 'max-w-3xl', // 768px - narrow content
		md: 'max-w-5xl', // 1024px - medium content
		lg: 'max-w-6xl', // 1152px - default
		xl: 'max-w-7xl', // 1280px - wide content
		full: 'max-w-none' // full width
	};

	const classes = $derived(cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className));
</script>

<div class={classes}>
	{@render children?.()}
</div>
