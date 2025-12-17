<script lang="ts">
	import { browser } from '$app/environment';
	import PageShell from '$lib/components/PageShell.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/ui/Button.svelte';
	import SEO from '$lib/components/SEO.svelte';

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

	const team = [
		{
			name: 'Dr. Aylin Kaya',
			role: 'Lead Dentist',
			specialty: 'Cosmetic & Restorative',
			bio: 'Dr. Kaya specializes in creating natural-looking results with a comfort-focused approach. She believes in clear communication and evidence-based treatment planning.',
			image:
				'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face&q=80',
			credentials: ['DDS, Istanbul University', '15+ years experience', 'Invisalign Certified']
		},
		{
			name: 'Dr. Emre Demir',
			role: 'Oral Surgeon',
			specialty: 'Implants & Surgery',
			bio: 'Dr. Demir brings precision and care to complex procedures. His planning-led approach uses modern imaging to ensure predictable, long-term outcomes.',
			image:
				'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face&q=80',
			credentials: ['DDS, Ankara University', '12+ years experience', 'Implant Specialist']
		},
		{
			name: 'Zeynep Yılmaz',
			role: 'Dental Hygienist',
			specialty: 'Prevention & Hygiene',
			bio: 'Zeynep provides gentle, thorough hygiene sessions with personalized prevention coaching. She helps patients build sustainable oral health habits.',
			image:
				'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&crop=face&q=80',
			credentials: ['RDH, Certified Hygienist', '8+ years experience', 'Periodontal Care']
		}
	];

	const values = [
		{
			title: 'Comfort first',
			desc: 'We explain every step, never rush, and always prioritize your comfort.'
		},
		{
			title: 'Honest guidance',
			desc: "We'll give you options with pros and cons — the choice is always yours."
		},
		{
			title: 'Modern approach',
			desc: 'Digital workflows, current techniques, and evidence-based care.'
		}
	];
</script>

<SEO
	title="Our Team"
	description="Meet our experienced dentists and staff at Pearl Dental Studio Istanbul. Friendly, qualified professionals committed to your comfort."
	canonical="/team"
/>

<PageShell>
	<!-- Header Section -->
	<Section tone="muted" spacing="default">
		<PageHeader
			title="Meet Our Team"
			subtitle="A calm clinic experience starts with people who listen, explain, and genuinely care about your comfort."
			breadcrumbs={[{ label: 'Team' }]}
		>
			<div class="mt-2 flex flex-wrap gap-3">
				<Button href="/book" variant="primary" size="lg">Book appointment</Button>
				<Button href="/contact" variant="outline" size="lg">Contact us</Button>
			</div>
		</PageHeader>
	</Section>

	<!-- Team Grid -->
	<Section tone="surface" spacing="spacious" class="scroll-fade-in">
		<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<p class="mb-2 text-sm font-medium tracking-wider text-primary-600 uppercase">Our Team</p>
				<h2 class="font-display text-2xl tracking-tight text-neutral-900 sm:text-3xl">
					Experienced professionals
				</h2>
			</div>
			<p class="max-w-md text-neutral-600">
				Each team member brings expertise and a genuine commitment to patient care.
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each team as p (p.name)}
				<article
					class="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-900/10"
				>
					<!-- Photo -->
					<div class="aspect-[3/4] overflow-hidden bg-neutral-100">
						<img
							src={p.image}
							alt={p.name}
							width="400"
							height="533"
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
							decoding="async"
						/>
					</div>

					<!-- Content -->
					<div class="p-6">
						<div class="mb-1 text-xs font-medium tracking-wider text-primary-600 uppercase">
							{p.specialty}
						</div>
						<h3 class="text-lg font-semibold text-neutral-900">{p.name}</h3>
						<p class="text-sm text-neutral-600">{p.role}</p>

						<p class="mt-4 text-sm leading-relaxed text-neutral-600">{p.bio}</p>

						<!-- Credentials -->
						<ul class="mt-4 space-y-1">
							{#each p.credentials as cred (cred)}
								<li class="flex items-center gap-2 text-xs text-neutral-500">
									<svg
										class="h-3.5 w-3.5 text-sage-500"
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
									{cred}
								</li>
							{/each}
						</ul>
					</div>
				</article>
			{/each}
		</div>
	</Section>

	<!-- Our Story -->
	<Section tone="muted" spacing="default" class="scroll-fade-in">
		<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
			<!-- Image -->
			<div class="relative overflow-hidden rounded-2xl">
				<img
					src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&h=600&fit=crop&q=80"
					alt="Pearl Dental Studio interior"
					width="800"
					height="600"
					class="aspect-[4/3] h-full w-full object-cover"
					loading="lazy"
					decoding="async"
				/>
				<div
					class="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm"
				>
					<p class="text-sm font-semibold text-neutral-900">Est. 2015</p>
					<p class="text-xs text-neutral-500">Kadıköy, Istanbul</p>
				</div>
			</div>

			<!-- Story Content -->
			<div>
				<p class="mb-2 text-sm font-medium tracking-wider text-primary-600 uppercase">Our Story</p>
				<h2 class="font-display text-2xl tracking-tight text-neutral-900 sm:text-3xl">
					Built on a simple idea
				</h2>
				<div class="mt-6 space-y-4 text-neutral-600">
					<p>
						Pearl Dental Studio was founded in 2015 with a simple mission: make dental care
						comfortable, honest, and modern. Dr. Aylin Kaya, frustrated by the rushed, impersonal
						experiences she saw patients endure, set out to build something different.
					</p>
					<p>
						Today, we've grown to a team of three dedicated professionals, but our approach remains
						the same. We take time to listen, explain every option clearly, and never pressure you
						into decisions.
					</p>
					<p>
						Our clinic combines modern technology with a calm, welcoming environment. From digital
						x-rays to 3D treatment previews, we use the latest tools — not to impress, but to give
						you better care and clearer understanding of your treatment.
					</p>
				</div>

				<!-- Stats -->
				<div class="mt-8 grid grid-cols-3 gap-4">
					<div class="text-center">
						<div class="font-display text-2xl font-bold text-neutral-900">10+</div>
						<div class="text-xs text-neutral-500">Years serving patients</div>
					</div>
					<div class="text-center">
						<div class="font-display text-2xl font-bold text-neutral-900">5,000+</div>
						<div class="text-xs text-neutral-500">Happy patients</div>
					</div>
					<div class="text-center">
						<div class="font-display text-2xl font-bold text-neutral-900">4.9</div>
						<div class="text-xs text-neutral-500">Google rating</div>
					</div>
				</div>
			</div>
		</div>
	</Section>

	<!-- Our Values -->
	<Section tone="surface" spacing="default" class="scroll-fade-in">
		<div class="text-center">
			<p class="mb-2 text-sm font-medium tracking-wider text-primary-600 uppercase">Our Values</p>
			<h2 class="font-display text-2xl tracking-tight text-neutral-900 sm:text-3xl">
				What guides our care
			</h2>
		</div>

		<div class="mt-10 grid gap-6 sm:grid-cols-3">
			{#each values as v, i (v.title)}
				<div class="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-neutral-900/5">
					<div
						class="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-neutral-900 font-display text-lg text-white"
					>
						0{i + 1}
					</div>
					<h3 class="font-semibold text-neutral-900">{v.title}</h3>
					<p class="mt-2 text-sm text-neutral-600">{v.desc}</p>
				</div>
			{/each}
		</div>
	</Section>

	<!-- CTA Banner -->
	<section class="scroll-fade-in relative overflow-hidden">
		<div class="absolute inset-0">
			<img
				src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1600&h=600&fit=crop&q=80"
				alt=""
				width="1600"
				height="600"
				class="h-full w-full object-cover"
				loading="lazy"
				decoding="async"
			/>
			<div class="absolute inset-0 bg-neutral-900/80"></div>
		</div>

		<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
					Ready to meet us?
				</h2>
				<p class="mt-4 text-lg text-neutral-300">
					Book a consultation and experience our calm, patient-focused approach firsthand.
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
