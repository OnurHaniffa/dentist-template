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

	type ReviewTag = 'Comfort' | 'Results' | 'Service';
	type Review = {
		name: string;
		rating: number;
		text: string;
		tag: ReviewTag;
		date: string;
		avatar?: string;
	};

	const reviews: Review[] = [
		{
			name: 'Ayşe K.',
			rating: 5,
			tag: 'Comfort',
			text: "I've avoided dentists for years due to anxiety. Pearl Dental changed that completely. The team explains everything, never rushes, and genuinely cares about comfort. I actually look forward to my visits now.",
			date: 'November 2024',
			avatar:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face'
		},
		{
			name: 'Mehmet T.',
			rating: 5,
			tag: 'Service',
			text: "Finally, a dentist who doesn't try to upsell. They gave me honest options, explained the trade-offs, and let me decide. My whole family comes here now. Highly recommend.",
			date: 'October 2024',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
		},
		{
			name: 'Elena S.',
			rating: 5,
			tag: 'Results',
			text: 'The modern equipment and digital workflow made my Invisalign treatment seamless. I could see exactly what to expect before starting. Results exceeded my expectations.',
			date: 'September 2024',
			avatar:
				'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
		},
		{
			name: 'Deniz A.',
			rating: 5,
			tag: 'Comfort',
			text: "I'm usually anxious about dental visits, but they were incredibly patient and calm. The whole experience was surprisingly comfortable. Will definitely be coming back.",
			date: 'September 2024',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
		},
		{
			name: 'Selin Y.',
			rating: 5,
			tag: 'Results',
			text: 'Whitening looked completely natural — not overdone at all. Clean, modern clinic and a great team. Very happy with the results.',
			date: 'August 2024',
			avatar:
				'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face'
		},
		{
			name: 'Burak M.',
			rating: 5,
			tag: 'Service',
			text: 'Fast appointment booking, no waiting, and very professional. Felt completely taken care of from start to finish. Transparent pricing too.',
			date: 'August 2024',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face'
		}
	];

	const filterOptions = ['All', 'Comfort', 'Results', 'Service'] as const;
	type Filter = (typeof filterOptions)[number];

	let filter = $state<Filter>('All');

	const filteredReviews = $derived(
		filter === 'All' ? reviews : reviews.filter((r) => r.tag === filter)
	);

	const tagColors: Record<ReviewTag, string> = {
		Comfort: 'bg-sage-100 text-sage-700',
		Results: 'bg-primary-100 text-primary-700',
		Service: 'bg-sky-100 text-sky-700'
	};

	// Aggregate stats
	const stats = {
		rating: 4.9,
		totalReviews: 523,
		breakdown: [
			{ stars: 5, percent: 94 },
			{ stars: 4, percent: 4 },
			{ stars: 3, percent: 1 },
			{ stars: 2, percent: 0.5 },
			{ stars: 1, percent: 0.5 }
		]
	};
</script>

<svelte:head>
	<title>Reviews — Pearl Dental Studio</title>
	<meta
		name="description"
		content="Read patient reviews and see why people choose our clinic for calm, modern dental care in Istanbul."
	/>
</svelte:head>

<PageShell>
	<!-- Header Section -->
	<Section tone="muted" spacing="default">
		<PageHeader
			title="Patient Reviews"
			subtitle="Real experiences from patients who value comfort, clarity, and honest results."
			breadcrumbs={[{ label: 'Reviews' }]}
		>
			<div class="mt-4 flex items-center gap-4">
				<div class="flex items-center gap-1">
					{#each Array(5) as _}
						<svg class="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
					{/each}
				</div>
				<span class="text-lg font-semibold text-neutral-900">4.9</span>
				<span class="text-neutral-500">on Google Reviews</span>
			</div>
		</PageHeader>
	</Section>

	<!-- Aggregate Stats Section -->
	<Section tone="surface" spacing="default" class="scroll-fade-in">
		<div class="grid gap-6 lg:grid-cols-3">
			<!-- Overall Rating -->
			<div
				class="flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-900/5 text-center"
			>
				<div class="text-6xl font-display font-bold text-neutral-900">{stats.rating}</div>
				<div class="mt-2 flex items-center gap-1">
					{#each Array(5) as _}
						<svg class="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
					{/each}
				</div>
				<p class="mt-2 text-sm text-neutral-500">Based on {stats.totalReviews} reviews</p>
			</div>

			<!-- Rating Breakdown -->
			<div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 lg:col-span-2">
				<h3 class="mb-4 font-semibold text-neutral-900">Rating breakdown</h3>
				<div class="space-y-3">
					{#each stats.breakdown as row (row.stars)}
						<div class="flex items-center gap-3">
							<span class="w-12 text-sm text-neutral-600">{row.stars} star</span>
							<div class="flex-1 h-3 rounded-full bg-neutral-100 overflow-hidden">
								<div
									class="h-full rounded-full bg-primary-500 transition-all duration-500"
									style="width: {row.percent}%"
								></div>
							</div>
							<span class="w-12 text-right text-sm text-neutral-500">{row.percent}%</span>
						</div>
					{/each}
				</div>
				<div class="mt-6 pt-4 border-t border-neutral-100">
					<a
						href="https://g.page/r/your-google-review-link"
						target="_blank"
						rel="noreferrer"
						class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Leave a review on Google
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</Section>

	<!-- Filter + Reviews -->
	<Section tone="muted" spacing="spacious" class="scroll-fade-in">
		<!-- Filter Buttons -->
		<div class="mb-8 flex flex-wrap gap-2">
			{#each filterOptions as t (t)}
				<button
					type="button"
					class="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 {filter ===
					t
						? 'bg-neutral-900 text-white shadow-md'
						: 'bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50 hover:ring-neutral-300'}"
					onclick={() => (filter = t)}
				>
					{t}
				</button>
			{/each}
		</div>

		<!-- Reviews Grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredReviews as r (r.name + r.text)}
				<article
					class="group relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10"
				>
					<!-- Quote icon -->
					<svg
						class="absolute right-6 top-6 h-8 w-8 text-primary-100"
						fill="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
						/>
					</svg>

					<!-- Stars -->
					<div class="mb-3 flex items-center gap-1">
						{#each Array(r.rating) as _}
							<svg class="h-4 w-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>
						{/each}
					</div>

					<!-- Review text -->
					<p class="relative z-10 leading-relaxed text-neutral-700">"{r.text}"</p>

					<!-- Tag -->
					<span class="mt-4 inline-block rounded-full px-2.5 py-1 text-xs font-medium {tagColors[r.tag]}"
						>{r.tag}</span
					>

					<!-- Author -->
					<footer class="mt-4 flex items-center gap-3 border-t border-neutral-100 pt-4">
						{#if r.avatar}
							<img
								src={r.avatar}
								alt=""
								class="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100"
								loading="lazy"
							/>
						{:else}
							<div
								class="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600"
							>
								{r.name.charAt(0)}
							</div>
						{/if}
						<div>
							<cite class="not-italic font-semibold text-neutral-900">{r.name}</cite>
							<p class="text-xs text-neutral-500">{r.date}</p>
						</div>
					</footer>
				</article>
			{/each}
		</div>
	</Section>

	<!-- CTA Section -->
	<Section tone="muted" spacing="default" class="scroll-fade-in">
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
							d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
						/>
					</svg>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-neutral-900">Ready to experience it yourself?</h3>
					<p class="mt-1 text-neutral-600">
						Join thousands of patients who've found comfort and clarity at Pearl Dental.
					</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-3">
				<Button href="/book" variant="primary">Book appointment</Button>
				<Button href="/contact" variant="ghost">Ask a question</Button>
			</div>
		</div>
	</Section>

	<!-- CTA Banner -->
	<section class="scroll-fade-in relative overflow-hidden">
		<div class="absolute inset-0">
			<img
				src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&h=600&fit=crop&q=80"
				alt=""
				class="h-full w-full object-cover"
				loading="lazy"
			/>
			<div class="absolute inset-0 bg-neutral-900/80"></div>
		</div>

		<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
					Your comfort is our priority
				</h2>
				<p class="mt-4 text-lg text-neutral-300">
					Book a visit and see why our patients keep coming back.
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
