<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Container from '$lib/components/Container.svelte';
	import { site } from '$lib/content/site';
	import { cn } from '$lib/ui/cn';

	let open = $state(false);
	let scrolled = $state(false);

	function close() {
		open = false;
	}

	// Track scroll position for transparent → solid behavior
	$effect(() => {
		if (!browser) return;

		const onScroll = () => {
			scrolled = window.scrollY > 20;
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});

	// Mobile menu effects
	$effect(() => {
		if (!browser) return;

		document.documentElement.style.overflow = open ? 'hidden' : '';

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};

		if (open) window.addEventListener('keydown', onKeyDown);

		return () => {
			document.documentElement.style.overflow = '';
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	// Check if link is active
	function isActive(href: string): boolean {
		const currentPath = page.url.pathname;
		if (href === '/') return currentPath === '/';
		return currentPath.startsWith(href);
	}
</script>

<!-- Skip to content link (accessibility) -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:outline-none"
>
	Skip to content
</a>

<header
	class={cn(
		'sticky top-0 z-40 transition-all duration-300 ease-out',
		scrolled
			? 'bg-white/95 shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_4px_12px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md'
			: 'bg-white/0'
	)}
>
	<Container class="flex h-[72px] items-center justify-between">
		<!-- Logo / Brand -->
		<a href="/" class="group flex items-center gap-3">
			<!-- Pearl dental logo mark -->
			<div
				class="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg shadow-neutral-900/20 transition-all duration-300 ease-out group-hover:scale-[1.05]"
			>
				<!-- Pearl/tooth icon -->
				<svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<!-- Stylized tooth/pearl shape -->
					<path
						d="M12 3C8.5 3 6 5.5 6 8.5c0 2 .8 3.5 1.5 5 .7 1.5 1.5 3 1.5 5.5 0 1.5.5 2 1 2s1-.5 1.2-1.5c.2-1 .5-1.5.8-1.5s.6.5.8 1.5c.2 1 .7 1.5 1.2 1.5s1-.5 1-2c0-2.5.8-4 1.5-5.5.7-1.5 1.5-3 1.5-5C18 5.5 15.5 3 12 3z"
						fill="currentColor"
					/>
					<!-- Pearl shine highlight -->
					<ellipse cx="9.5" cy="7" rx="1.5" ry="2" fill="white" opacity="0.3" />
				</svg>
				<!-- Subtle shine effect on hover -->
				<div
					class="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
			</div>
			<!-- Brand name in display font -->
			<div class="flex flex-col">
				<span class="font-display text-lg leading-tight tracking-tight text-neutral-900">
					Pearl Dental
				</span>
				<span
					class="hidden text-[11px] font-medium tracking-wide text-neutral-500 uppercase sm:block"
				>
					Studio
				</span>
			</div>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
			{#each site.nav as item (item.href)}
				<a
					class={cn(
						'relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200',
						'after:absolute after:right-4 after:bottom-1 after:left-4 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-neutral-900 after:transition-transform after:duration-300 after:ease-out',
						isActive(item.href)
							? 'text-neutral-900 after:scale-x-100'
							: 'text-neutral-600 hover:text-neutral-900 hover:after:scale-x-100'
					)}
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Desktop CTA area -->
		<div class="hidden items-center gap-5 lg:flex">
			<!-- Phone with icon -->
			<a
				class="flex items-center gap-2 text-[13px] text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
				href={'tel:' + site.phone}
			>
				<svg
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1.5"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
					/>
				</svg>
				<span class="font-medium">{site.phone}</span>
			</a>

			<!-- Separator -->
			<div class="h-5 w-px bg-neutral-200" aria-hidden="true"></div>

			<!-- Primary CTA - Dark & Bold -->
			<a
				class="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 ease-out
               hover:-translate-y-[1px] hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20
               focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:outline-none"
				href={site.cta.href}
			>
				<span>{site.cta.label}</span>
				<svg
					class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
					/>
				</svg>
			</a>
		</div>

		<!-- Mobile menu button -->
		<button
			class={cn(
				'inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 lg:hidden',
				open ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
			)}
			aria-label={open ? 'Close menu' : 'Open menu'}
			aria-expanded={open}
			aria-controls="mobile-menu"
			onclick={() => (open = !open)}
		>
			{#if open}
				<svg
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1.5"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
				</svg>
			{/if}
		</button>
	</Container>

	<!-- Mobile menu -->
	{#if open}
		<div
			class="fixed inset-0 z-50 lg:hidden"
			id="mobile-menu"
			role="dialog"
			aria-modal="true"
			aria-label="Mobile navigation menu"
		>
			<button
				type="button"
				class="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
				aria-label="Close menu"
				onclick={close}
				in:fade={{ duration: 200 }}
				out:fade={{ duration: 150 }}
			></button>

			<aside
				class="absolute top-0 right-0 flex h-full w-[85%] max-w-sm flex-col bg-white p-6 shadow-2xl"
				in:fly={{ x: 100, duration: 250, opacity: 1 }}
				out:fly={{ x: 100, duration: 200, opacity: 1 }}
			>
				<!-- Mobile header -->
				<div class="flex items-center justify-between border-b border-neutral-100 pb-6">
					<div class="flex items-center gap-2">
						<div
							class="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900"
						>
							<svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path
									d="M12 3C8.5 3 6 5.5 6 8.5c0 2 .8 3.5 1.5 5 .7 1.5 1.5 3 1.5 5.5 0 1.5.5 2 1 2s1-.5 1.2-1.5c.2-1 .5-1.5.8-1.5s.6.5.8 1.5c.2 1 .7 1.5 1.2 1.5s1-.5 1-2c0-2.5.8-4 1.5-5.5.7-1.5 1.5-3 1.5-5C18 5.5 15.5 3 12 3z"
									fill="currentColor"
								/>
								<ellipse cx="9.5" cy="7" rx="1.5" ry="2" fill="white" opacity="0.3" />
							</svg>
						</div>
						<span class="font-display text-base text-neutral-900">Pearl Dental</span>
					</div>
					<button
						class="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200"
						aria-label="Close menu"
						onclick={close}
					>
						<svg
							class="h-5 w-5 text-neutral-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Mobile nav -->
				<nav class="mt-6 flex-1" aria-label="Mobile navigation">
					<div class="grid gap-1">
						{#each site.nav as item (item.href)}
							<a
								class={cn(
									'flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200',
									isActive(item.href)
										? 'bg-neutral-900 text-white'
										: 'text-neutral-700 hover:bg-neutral-100'
								)}
								href={item.href}
								onclick={close}
								aria-current={isActive(item.href) ? 'page' : undefined}
							>
								<span>{item.label}</span>
								{#if isActive(item.href)}
									<svg
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
									</svg>
								{/if}
							</a>
						{/each}
					</div>
				</nav>

				<!-- Mobile footer -->
				<div class="grid gap-4 border-t border-neutral-100 pt-6">
					<a
						class="flex items-center gap-3 text-neutral-700 transition-colors hover:text-neutral-900"
						href={'tel:' + site.phone}
					>
						<div class="grid h-10 w-10 place-items-center rounded-full bg-neutral-100">
							<svg
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1.5"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
								/>
							</svg>
						</div>
						<span class="font-medium">{site.phone}</span>
					</a>

					<a
						class="flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-neutral-800"
						href={site.cta.href}
						onclick={close}
					>
						<span>{site.cta.label}</span>
						<svg
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/>
						</svg>
					</a>
				</div>
			</aside>
		</div>
	{/if}
</header>
