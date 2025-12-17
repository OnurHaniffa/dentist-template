<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/ui/cn';

	type Props = {
		id?: string;
		name?: string;
		checked?: boolean;
		required?: boolean;
		disabled?: boolean;
		error?: string;
		class?: string;
		children?: Snippet;
		onchange?: (checked: boolean) => void;
	};

	let {
		id,
		name,
		checked = $bindable(false),
		required = false,
		disabled = false,
		error,
		class: className,
		children,
		onchange
	}: Props = $props();

	// Generate unique ID if not provided
	let checkboxId = $derived(id ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`);
	let errorId = $derived(error ? `${checkboxId}-error` : undefined);

	const checkboxBase =
		'h-5 w-5 shrink-0 rounded border bg-white ' +
		'transition-colors duration-fast ' +
		'checked:bg-primary-600 checked:border-primary-600 ' +
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';

	const states = {
		default: 'border-neutral-300 accent-primary-600',
		error: 'border-red-300',
		disabled: 'border-neutral-200 bg-neutral-50 cursor-not-allowed'
	};

	let checkboxClasses = $derived(
		cn(checkboxBase, disabled ? states.disabled : error ? states.error : states.default)
	);

	let labelClasses = $derived(
		cn(
			'flex items-start gap-3 cursor-pointer',
			disabled && 'cursor-not-allowed opacity-60',
			className
		)
	);

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		checked = target.checked;
		onchange?.(target.checked);
	}
</script>

<div class="grid gap-1.5">
	<label class={labelClasses}>
		<input
			type="checkbox"
			id={checkboxId}
			{name}
			{checked}
			{required}
			{disabled}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={errorId}
			class={checkboxClasses}
			onchange={handleChange}
		/>
		<span class="pt-0.5 text-sm leading-tight text-neutral-700">
			{@render children?.()}
		</span>
	</label>

	{#if error}
		<p id={errorId} class="ml-8 text-sm text-red-600">{error}</p>
	{/if}
</div>
