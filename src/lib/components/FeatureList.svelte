<script lang="ts">
	import { cn } from '$lib/ui/cn';

	type Size = 'sm' | 'md' | 'lg';
	type IconType = 'check' | 'arrow' | 'dot';

	type Props = {
		items: string[];
		icon?: IconType;
		size?: Size;
		class?: string;
	};

	let { items, icon = 'check', size = 'md', class: className }: Props = $props();

	const sizes: Record<Size, { text: string; icon: string; gap: string }> = {
		sm: { text: 'text-sm', icon: 'h-4 w-4', gap: 'gap-2' },
		md: { text: 'text-base', icon: 'h-5 w-5', gap: 'gap-3' },
		lg: { text: 'text-lg', icon: 'h-6 w-6', gap: 'gap-3' }
	};

	const iconColors: Record<IconType, string> = {
		check: 'text-sage-600',
		arrow: 'text-primary-600',
		dot: 'text-neutral-400'
	};

	let listClasses = $derived(cn('grid gap-3', className));
	let itemClasses = $derived(cn('flex items-start', sizes[size].gap));
	let iconClasses = $derived(cn('shrink-0 mt-0.5', sizes[size].icon, iconColors[icon]));
	let textClasses = $derived(cn(sizes[size].text, 'text-neutral-700 leading-relaxed'));
</script>

<ul class={listClasses}>
	{#each items as item (item)}
		<li class={itemClasses}>
			{#if icon === 'check'}
				<svg
					class={iconClasses}
					aria-hidden="true"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			{:else if icon === 'arrow'}
				<svg
					class={iconClasses}
					aria-hidden="true"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			{:else}
				<span class={cn(iconClasses, 'flex items-center justify-center')} aria-hidden="true">
					<span class="h-1.5 w-1.5 rounded-full bg-current"></span>
				</span>
			{/if}
			<span class={textClasses}>{item}</span>
		</li>
	{/each}
</ul>
