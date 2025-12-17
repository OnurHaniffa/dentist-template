<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/ui/cn';

	type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'info';
	type Size = 'sm' | 'md' | 'lg';

	type Props = {
		tone?: Tone;
		size?: Size;
		class?: string;
		children?: Snippet;
	};

	let { tone = 'neutral', size = 'md', class: className, children }: Props = $props();

	const tones: Record<Tone, string> = {
		neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
		primary: 'bg-primary-50 text-primary-800 border border-primary-200',
		success: 'bg-sage-50 text-sage-800 border border-sage-200',
		warning: 'bg-amber-50 text-amber-800 border border-amber-200',
		info: 'bg-sky-50 text-sky-800 border border-sky-200'
	};

	const sizes: Record<Size, string> = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-xs',
		lg: 'px-4 py-1.5 text-sm'
	};

	const base = 'inline-flex items-center gap-1.5 rounded-full font-medium';

	let classes = $derived(cn(base, tones[tone], sizes[size], className));
</script>

<span class={classes}>
	{@render children?.()}
</span>
