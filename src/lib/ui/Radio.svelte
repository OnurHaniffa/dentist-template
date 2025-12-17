<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/ui/cn';

	type Props = {
		id?: string;
		name: string;
		value: string;
		checked?: boolean;
		required?: boolean;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
		onchange?: (value: string) => void;
	};

	let {
		id,
		name,
		value,
		checked = $bindable(false),
		required = false,
		disabled = false,
		class: className,
		children,
		onchange
	}: Props = $props();

	// Generate unique ID if not provided
	let radioId = $derived(id ?? `radio-${Math.random().toString(36).slice(2, 9)}`);

	const radioBase =
		'h-5 w-5 shrink-0 rounded-full border bg-white ' +
		'transition-colors duration-fast ' +
		'checked:border-primary-600 checked:border-[6px] ' +
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

	const states = {
		default: 'border-neutral-300',
		disabled: 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
	};

	let radioClasses = $derived(cn(radioBase, disabled ? states.disabled : states.default));

	let labelClasses = $derived(
		cn(
			'flex items-start gap-3 cursor-pointer',
			disabled && 'cursor-not-allowed opacity-60',
			className
		)
	);

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		if (target.checked) {
			checked = true;
			onchange?.(value);
		}
	}
</script>

<label class={labelClasses}>
	<input
		type="radio"
		id={radioId}
		{name}
		{value}
		{checked}
		{required}
		{disabled}
		class={radioClasses}
		onchange={handleChange}
	/>
	<span class="pt-0.5 text-sm leading-tight text-neutral-700">
		{@render children?.()}
	</span>
</label>
