<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Container from '$lib/components/Container.svelte';
	import { cn } from '$lib/ui/cn';

	type Tone = 'surface' | 'muted' | 'primary' | 'dark';
	type Spacing = 'none' | 'compact' | 'default' | 'spacious';
	type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	type Props = HTMLAttributes<HTMLElement> & {
		tone?: Tone;
		spacing?: Spacing;
		container?: ContainerSize;
		class?: string;
		children?: Snippet;
	};

	let {
		tone = 'surface',
		spacing = 'default',
		container = 'lg',
		class: className,
		children,
		...rest
	}: Props = $props();

	const tones: Record<Tone, string> = {
		surface: 'bg-white',
		muted: 'bg-neutral-50',
		primary: 'bg-primary-50',
		dark: 'bg-neutral-900 text-white'
	};

	const spacings: Record<Spacing, string> = {
		none: '',
		compact: 'py-8 sm:py-12',
		default: 'py-14 sm:py-20',
		spacious: 'py-20 sm:py-28'
	};

	const sectionClasses = $derived(cn(tones[tone], className));
	const containerClasses = $derived(spacings[spacing]);
</script>

<section class={sectionClasses} {...rest}>
	<Container size={container} class={containerClasses}>
		{@render children?.()}
	</Container>
</section>
