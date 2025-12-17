<script lang="ts">
	import { browser } from '$app/environment';
	import PageShell from '$lib/components/PageShell.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/ui/Button.svelte';

	// Scroll animation observer
	$effect(() => {
		if (!browser) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		document.querySelectorAll('.scroll-fade-in').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});

	const pricing = [
		{
			item: 'New patient exam + x-ray consult',
			price: '₺3,500',
			note: 'Includes full exam and digital x-rays'
		},
		{ item: 'Check-up & cleaning', price: '₺3,500+', note: 'Routine preventive care' },
		{ item: 'Teeth whitening', price: '₺8,500+', note: 'Professional in-office treatment' },
		{ item: 'Filling (composite)', price: '₺3,000+', note: 'Natural-looking tooth-colored' },
		{ item: 'Invisalign consult', price: '₺2,500', note: 'Scan + treatment preview' },
		{ item: 'Emergency consult', price: '₺2,500+', note: 'Same-day when possible' }
	];

	const paymentFeatures = [
		{ icon: 'receipt', text: 'Itemized invoices available' },
		{ icon: 'card', text: 'Card / bank transfer accepted' },
		{ icon: 'calendar', text: 'Payment plans (case-based)' },
		{ icon: 'shield', text: 'Insurance documentation provided' }
	];

	// Treatment comparison data
	const comparisons = [
		{
			title: 'Teeth Straightening Options',
			options: [
				{
					name: 'Invisalign',
					price: '₺95,000+',
					pros: ['Nearly invisible', 'Removable for eating', 'Comfortable'],
					cons: ['Requires discipline', 'Not for severe cases'],
					best: 'Adults who want discreet treatment'
				},
				{
					name: 'Traditional Braces',
					price: '₺55,000+',
					pros: ['Effective for complex cases', 'No compliance needed', 'Lower cost'],
					cons: ['Visible metal', 'Food restrictions'],
					best: 'Complex alignment issues'
				}
			]
		},
		{
			title: 'Whitening Options',
			options: [
				{
					name: 'In-Office Whitening',
					price: '₺8,500+',
					pros: ['Immediate results', 'Professional strength', 'Single visit'],
					cons: ['Higher cost', 'May cause sensitivity'],
					best: 'Quick, dramatic results'
				},
				{
					name: 'Take-Home Kit',
					price: '₺4,500+',
					pros: ['Gradual results', 'Use at your pace', 'Touch-ups easy'],
					cons: ['Takes 1-2 weeks', 'Requires daily use'],
					best: 'Budget-conscious, gradual improvement'
				}
			]
		}
	];
</script>

<svelte:head>
	<title>Pricing — Pearl Dental Studio</title>
	<meta
		name="description"
		content="Transparent pricing guidance, insurance information, and payment options for common dental treatments."
	/>
</svelte:head>

<PageShell>
	<!-- Header Section -->
	<Section tone="muted" spacing="default">
		<PageHeader
			title="Pricing"
			subtitle="Transparent guidance. Final pricing depends on your exam and treatment plan — no surprises."
			breadcrumbs={[{ label: 'Pricing' }]}
		>
			<div class="mt-2 flex flex-wrap gap-3">
				<Button href="/book" variant="primary" size="lg">Book consultation</Button>
				<Button href="/services" variant="outline" size="lg">View services</Button>
			</div>
		</PageHeader>
	</Section>

	<!-- Pricing Table -->
	<Section tone="surface" spacing="spacious" class="scroll-fade-in">
		<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<p class="mb-2 text-sm font-medium uppercase tracking-wider text-primary-600">
					Treatment Costs
				</p>
				<h2 class="font-display text-2xl tracking-tight text-neutral-900 sm:text-3xl">
					Common treatments
				</h2>
			</div>
			<p class="max-w-md text-neutral-600">
				Prices shown are starting estimates. We'll confirm everything before any treatment begins.
			</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-3">
			<!-- Pricing List -->
			<div
				class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 lg:col-span-2 sm:p-8"
			>
				<div class="divide-y divide-neutral-100">
					{#each pricing as row (row.item)}
						<div
							class="flex flex-col gap-1 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
						>
							<div>
								<div class="font-medium text-neutral-900">{row.item}</div>
								<div class="text-sm text-neutral-500">{row.note}</div>
							</div>
							<div class="text-lg font-semibold text-neutral-900 sm:text-right">{row.price}</div>
						</div>
					{/each}
				</div>

				<p class="mt-6 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600">
					<strong class="text-neutral-900">Note:</strong> These are starting prices. We'll provide a
					detailed quote after your consultation with all options explained.
				</p>
			</div>

			<!-- Sidebar -->
			<aside class="space-y-6">
				<!-- Payment Options -->
				<div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5">
					<h3 class="font-semibold text-neutral-900">Payment options</h3>
					<ul class="mt-4 space-y-3">
						{#each paymentFeatures as f (f.text)}
							<li class="flex items-center gap-3 text-sm text-neutral-600">
								<div
									class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sage-100 text-sage-600"
								>
									<svg
										class="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								{f.text}
							</li>
						{/each}
					</ul>
				</div>

				<!-- CTA Card -->
				<div class="rounded-2xl bg-primary-50 p-6 ring-1 ring-primary-100">
					<h3 class="font-semibold text-neutral-900">Want an estimate?</h3>
					<p class="mt-2 text-sm text-neutral-600">
						Book a consultation and we'll give you clear options with pros/cons before any
						treatment.
					</p>
					<div class="mt-4">
						<Button href="/book" variant="primary">Book consultation</Button>
					</div>
				</div>
			</aside>
		</div>
	</Section>

	<!-- Treatment Comparison Section -->
	<Section tone="muted" spacing="default" class="scroll-fade-in">
		<div class="text-center mb-10">
			<p class="mb-2 text-sm font-medium uppercase tracking-wider text-primary-600">
				Compare Options
			</p>
			<h2 class="font-display text-2xl tracking-tight text-neutral-900 sm:text-3xl">
				Treatment comparisons
			</h2>
			<p class="mt-2 mx-auto max-w-2xl text-neutral-600">
				Not sure which option is right for you? Here's a side-by-side comparison to help you decide.
			</p>
		</div>

		<div class="space-y-8">
			{#each comparisons as comparison (comparison.title)}
				<div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 sm:p-8">
					<h3 class="mb-6 text-lg font-semibold text-neutral-900">{comparison.title}</h3>
					<div class="grid gap-6 md:grid-cols-2">
						{#each comparison.options as opt (opt.name)}
							<div class="rounded-xl bg-neutral-50 p-5">
								<div class="flex items-center justify-between mb-4">
									<h4 class="font-semibold text-neutral-900">{opt.name}</h4>
									<span class="text-lg font-bold text-primary-600">{opt.price}</span>
								</div>

								<!-- Pros -->
								<div class="mb-3">
									<p class="text-xs font-medium uppercase tracking-wider text-sage-600 mb-2">Pros</p>
									<ul class="space-y-1">
										{#each opt.pros as pro (pro)}
											<li class="flex items-center gap-2 text-sm text-neutral-600">
												<svg class="h-4 w-4 text-sage-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
													<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
												</svg>
												{pro}
											</li>
										{/each}
									</ul>
								</div>

								<!-- Cons -->
								<div class="mb-4">
									<p class="text-xs font-medium uppercase tracking-wider text-red-500 mb-2">Cons</p>
									<ul class="space-y-1">
										{#each opt.cons as con (con)}
											<li class="flex items-center gap-2 text-sm text-neutral-600">
												<svg class="h-4 w-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
													<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
												</svg>
												{con}
											</li>
										{/each}
									</ul>
								</div>

								<!-- Best for -->
								<div class="pt-3 border-t border-neutral-200">
									<p class="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">Best for</p>
									<p class="text-sm font-medium text-neutral-900">{opt.best}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<p class="text-sm text-neutral-500 mb-4">Still unsure? We'll help you choose during your consultation.</p>
			<Button href="/book" variant="primary">Book free consultation</Button>
		</div>
	</Section>

	<!-- FAQ Section -->
	<Section tone="surface" spacing="default" class="scroll-fade-in">
		<div
			class="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 sm:p-8 md:flex-row md:items-center md:justify-between"
		>
			<div class="flex items-start gap-4">
				<div
					class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-100 text-primary-600"
				>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
						/>
					</svg>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-neutral-900">Have questions about pricing?</h3>
					<p class="mt-1 text-neutral-600">
						We're happy to explain costs, payment options, or insurance documentation.
					</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-3">
				<Button href="/contact" variant="primary">Contact us</Button>
				<Button href="tel:+905551234567" variant="ghost">Call now</Button>
			</div>
		</div>
	</Section>

	<!-- CTA Banner -->
	<section class="scroll-fade-in relative overflow-hidden">
		<div class="absolute inset-0">
			<img
				src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&h=600&fit=crop&q=80"
				alt=""
				class="h-full w-full object-cover"
				loading="lazy"
			/>
			<div class="absolute inset-0 bg-neutral-900/80"></div>
		</div>

		<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
					Ready to get started?
				</h2>
				<p class="mt-4 text-lg text-neutral-300">
					Book a consultation and we'll create a personalized treatment plan with clear pricing.
				</p>
				<div class="mt-8 flex flex-wrap justify-center gap-4">
					<a
						href="/book"
						class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-neutral-900 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
					>
						Book appointment
						<svg
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/></svg
						>
					</a>
					<a
						href="tel:+905551234567"
						class="inline-flex items-center gap-2 rounded-full px-6 py-4 font-medium text-white ring-1 ring-white/30 transition-colors hover:bg-white/10"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
							/></svg
						>
						Call +90 555 123 4567
					</a>
				</div>
			</div>
		</div>
	</section>
</PageShell>
