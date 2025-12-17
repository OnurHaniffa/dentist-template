<script lang="ts">
	import type { Snippet } from 'svelte';

	type Breadcrumb = { label: string; href?: string };

	let { title, subtitle, breadcrumbs, children } = $props<{
		title: string;
		subtitle?: string;
		breadcrumbs?: Breadcrumb[];
		children?: Snippet;
	}>();
</script>

<header class="grid gap-4">
	{#if breadcrumbs && breadcrumbs.length > 0}
		<nav aria-label="Breadcrumb">
			<ol class="flex items-center gap-2 text-sm">
				<li>
					<a href="/" class="text-neutral-500 transition-colors hover:text-neutral-700">Home</a>
				</li>
				{#each breadcrumbs as crumb, i (crumb.label)}
					<li class="flex items-center gap-2">
						<svg
							class="h-4 w-4 text-neutral-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
						{#if crumb.href && i < breadcrumbs.length - 1}
							<a href={crumb.href} class="text-neutral-500 transition-colors hover:text-neutral-700"
								>{crumb.label}</a
							>
						{:else}
							<span class="font-medium text-neutral-900" aria-current="page">{crumb.label}</span>
						{/if}
					</li>
				{/each}
			</ol>
		</nav>
	{/if}

	<h1 class="font-display text-3xl tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
		{title}
	</h1>

	{#if subtitle}
		<p class="max-w-2xl text-lg leading-relaxed text-neutral-600">
			{subtitle}
		</p>
	{/if}

	{#if children}
		<div class="pt-2">
			{@render children?.()}
		</div>
	{/if}
</header>
