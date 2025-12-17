<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/ui/cn';

	type Props = {
		id?: string;
		name?: string;
		label: string;
		value?: string;
		required?: boolean;
		disabled?: boolean;
		error?: string;
		hint?: string;
		class?: string;
		children?: Snippet;
		onchange?: (value: string) => void;
	};

	let {
		id,
		name,
		label,
		value = $bindable(''),
		required = false,
		disabled = false,
		error,
		hint,
		class: className,
		children,
		onchange
	}: Props = $props();

	// Generate unique ID if not provided
	let selectId = $derived(id ?? `select-${Math.random().toString(36).slice(2, 9)}`);
	let errorId = $derived(error ? `${selectId}-error` : undefined);
	let hintId = $derived(hint && !error ? `${selectId}-hint` : undefined);
	let describedBy = $derived([errorId, hintId].filter(Boolean).join(' ') || undefined);

	const base =
		'w-full h-11 rounded-xl border bg-white px-3 text-sm outline-none ' +
		'transition-colors duration-fast appearance-none ' +
		"bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] " +
		'bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10 ' +
		'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1';

	const states = {
		default: 'border-neutral-200 text-neutral-900',
		error: 'border-red-300 text-neutral-900 focus-visible:ring-red-500',
		disabled: 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed'
	};

	let selectClasses = $derived(
		cn(base, disabled ? states.disabled : error ? states.error : states.default, className)
	);

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLSelectElement;
		value = target.value;
		onchange?.(target.value);
	}
</script>

<div class="grid gap-1.5">
	<label class="text-sm font-medium text-neutral-900" for={selectId}>
		{label}
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</label>

	<select
		id={selectId}
		{name}
		{value}
		{required}
		{disabled}
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={describedBy}
		class={selectClasses}
		onchange={handleChange}
	>
		{@render children?.()}
	</select>

	{#if error}
		<p id={errorId} class="text-sm text-red-600">{error}</p>
	{:else if hint}
		<p id={hintId} class="text-sm text-neutral-500">{hint}</p>
	{/if}
</div>
