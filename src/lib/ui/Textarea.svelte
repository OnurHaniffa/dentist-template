<script lang="ts">
	import { cn } from '$lib/ui/cn';

	type Props = {
		id?: string;
		name?: string;
		label: string;
		placeholder?: string;
		value?: string;
		rows?: number;
		required?: boolean;
		disabled?: boolean;
		error?: string;
		hint?: string;
		class?: string;
		onchange?: (value: string) => void;
		oninput?: (value: string) => void;
	};

	let {
		id,
		name,
		label,
		placeholder,
		value = $bindable(''),
		rows = 4,
		required = false,
		disabled = false,
		error,
		hint,
		class: className,
		onchange,
		oninput
	}: Props = $props();

	// Generate unique ID if not provided
	let textareaId = $derived(id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`);
	let errorId = $derived(error ? `${textareaId}-error` : undefined);
	let hintId = $derived(hint && !error ? `${textareaId}-hint` : undefined);
	let describedBy = $derived([errorId, hintId].filter(Boolean).join(' ') || undefined);

	const base =
		'w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none ' +
		'transition-colors duration-fast resize-y ' +
		'placeholder:text-neutral-400 ' +
		'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1';

	const states = {
		default: 'border-neutral-200 text-neutral-900',
		error: 'border-red-300 text-neutral-900 focus-visible:ring-red-500',
		disabled: 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed resize-none'
	};

	let textareaClasses = $derived(
		cn(base, disabled ? states.disabled : error ? states.error : states.default, className)
	);

	function handleInput(e: Event) {
		const target = e.currentTarget as HTMLTextAreaElement;
		value = target.value;
		oninput?.(target.value);
	}

	function handleChange(e: Event) {
		const target = e.currentTarget as HTMLTextAreaElement;
		onchange?.(target.value);
	}
</script>

<div class="grid gap-1.5">
	<label class="text-sm font-medium text-neutral-900" for={textareaId}>
		{label}
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</label>

	<textarea
		id={textareaId}
		{name}
		{placeholder}
		{rows}
		{required}
		{disabled}
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={describedBy}
		class={textareaClasses}
		oninput={handleInput}
		onchange={handleChange}>{value}</textarea
	>

	{#if error}
		<p id={errorId} class="text-sm text-red-600">{error}</p>
	{:else if hint}
		<p id={hintId} class="text-sm text-neutral-500">{hint}</p>
	{/if}
</div>
