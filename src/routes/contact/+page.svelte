<script lang="ts">
	import { browser } from '$app/environment';
	import PageShell from '$lib/components/PageShell.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { site } from '$lib/content/site';
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

	// Quick contact form state
	let contactName = $state('');
	let contactEmail = $state('');
	let contactMessage = $state('');
	let contactError = $state<string | null>(null);
	let contactSuccess = $state(false);
	let contactLoading = $state(false);

	function validateContact() {
		if (!contactName.trim()) return 'Please enter your name.';
		if (!contactEmail.trim()) return 'Please enter your email.';
		if (!contactMessage.trim()) return 'Please enter a message.';
		return null;
	}

	function onContactSubmit(e: SubmitEvent) {
		e.preventDefault();
		contactError = validateContact();
		if (contactError) return;

		contactLoading = true;
		setTimeout(() => {
			contactLoading = false;
			contactSuccess = true;
		}, 1000);
	}
</script>

<SEO
	title="Contact Us"
	description="Contact Pearl Dental Studio in Kadıköy, Istanbul. Opening hours, directions, phone, email & appointment booking."
	canonical="/contact"
/>

<PageShell>
	<!-- Header Section -->
	<Section tone="muted" spacing="default">
		<PageHeader
			title="Contact Us"
			subtitle="We're here to help. Reach out by phone, email, or book an appointment online."
			breadcrumbs={[{ label: 'Contact' }]}
		>
			<div class="mt-2 flex flex-wrap gap-3">
				<Button href="/book" variant="primary" size="lg">Book appointment</Button>
				<Button href={'tel:' + site.phone} variant="outline" size="lg">Call now</Button>
			</div>
		</PageHeader>
	</Section>

	<!-- Contact Info + Map -->
	<Section tone="surface" spacing="spacious" class="scroll-fade-in">
		<div class="grid gap-6 lg:grid-cols-3">
			<!-- Contact Cards -->
			<div class="space-y-6">
				<!-- Phone -->
				<div
					class="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					<div
						class="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary-100 text-primary-600"
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
								d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
							/>
						</svg>
					</div>
					<h3 class="font-semibold text-neutral-900">Phone</h3>
					<a
						href={'tel:' + site.phone}
						class="mt-1 block text-neutral-600 transition-colors hover:text-primary-600"
					>
						{site.phone}
					</a>
					<p class="mt-2 text-sm text-neutral-500">Mon–Fri, 9am–6:30pm</p>
				</div>

				<!-- Email -->
				<div
					class="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					<div class="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-sage-100 text-sage-600">
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
								d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
							/>
						</svg>
					</div>
					<h3 class="font-semibold text-neutral-900">Email</h3>
					<a
						href={'mailto:' + site.email}
						class="mt-1 block text-neutral-600 transition-colors hover:text-primary-600"
					>
						{site.email}
					</a>
					<p class="mt-2 text-sm text-neutral-500">We reply within 24 hours</p>
				</div>

				<!-- Address -->
				<div
					class="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					<div class="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-sky-100 text-sky-600">
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
								d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
							/>
						</svg>
					</div>
					<h3 class="font-semibold text-neutral-900">Address</h3>
					<p class="mt-1 text-neutral-600">
						{site.addressLines[0]}<br />
						{site.addressLines[1]}
					</p>
					<a
						href="https://maps.google.com"
						target="_blank"
						rel="noreferrer"
						class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
					>
						Get directions
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
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Map + Hours -->
			<div class="space-y-6 lg:col-span-2">
				<!-- Map -->
				<div class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-900/5">
					<div class="relative aspect-[16/9]">
						<iframe
							title="Pearl Dental Studio location in Kadıköy, Istanbul"
							width="100%"
							height="100%"
							class="absolute inset-0"
							src="https://www.openstreetmap.org/export/embed.html?bbox=29.015%2C40.975%2C29.045%2C40.995&layer=mapnik&marker=40.985%2C29.03"
							style="border: 0;"
							loading="lazy"
						></iframe>
					</div>
					<div class="flex items-center justify-between border-t border-neutral-100 p-4">
						<div>
							<p class="text-sm font-medium text-neutral-900">Pearl Dental Studio</p>
							<p class="text-xs text-neutral-500">Kadıköy, Istanbul</p>
						</div>
						<a
							href="https://www.google.com/maps/search/dentist+kadikoy+istanbul"
							target="_blank"
							rel="noreferrer"
							class="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
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
									d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
								/>
							</svg>
							Get directions
						</a>
					</div>
				</div>

				<!-- Opening Hours -->
				<div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 sm:p-8">
					<h3 class="font-semibold text-neutral-900">Opening hours</h3>
					<div class="mt-4 grid gap-3">
						{#each site.hours as h (h.day)}
							<div
								class="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-sm"
							>
								<span class="font-medium text-neutral-900">{h.day}</span>
								<span class="text-neutral-600">{h.time}</span>
							</div>
						{/each}
					</div>

					<div class="mt-6 flex flex-wrap gap-3">
						<Button href="/book" variant="primary">Book online</Button>
						<Button
							href="https://maps.google.com"
							target="_blank"
							rel="noreferrer"
							variant="outline"
						>
							Get directions
						</Button>
					</div>
				</div>
			</div>
		</div>
	</Section>

	<!-- Quick Contact Form -->
	<Section tone="muted" spacing="default" class="scroll-fade-in">
		<div class="mx-auto max-w-2xl">
			<div class="mb-8 text-center">
				<p class="mb-2 text-sm font-medium tracking-wider text-primary-600 uppercase">
					Send a Message
				</p>
				<h2 class="font-display text-2xl tracking-tight text-neutral-900 sm:text-3xl">
					Have a question?
				</h2>
				<p class="mt-2 text-neutral-600">
					Fill out the form below and we'll get back to you within 24 hours.
				</p>
			</div>

			<form
				class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 sm:p-8"
				onsubmit={onContactSubmit}
			>
				{#if contactError}
					<div
						class="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
					>
						<svg
							class="h-5 w-5 shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
							/>
						</svg>
						{contactError}
					</div>
				{/if}

				{#if contactSuccess}
					<div
						class="text-sage-800 mb-6 flex items-start gap-3 rounded-xl border border-sage-200 bg-sage-50 p-4 text-sm"
					>
						<svg
							class="h-5 w-5 shrink-0"
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
						<div>
							<strong>Message sent!</strong> We'll get back to you shortly.
						</div>
					</div>
				{/if}

				<div class="grid gap-6 sm:grid-cols-2">
					<div class="grid gap-2">
						<label class="text-sm font-medium text-neutral-900" for="contact-name">
							Your name <span class="text-red-500">*</span>
						</label>
						<input
							id="contact-name"
							type="text"
							class="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-sm transition-all outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
							placeholder="John Doe"
							bind:value={contactName}
							disabled={contactSuccess}
						/>
					</div>

					<div class="grid gap-2">
						<label class="text-sm font-medium text-neutral-900" for="contact-email">
							Email <span class="text-red-500">*</span>
						</label>
						<input
							id="contact-email"
							type="email"
							class="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-sm transition-all outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
							placeholder="you@example.com"
							bind:value={contactEmail}
							disabled={contactSuccess}
						/>
					</div>

					<div class="grid gap-2 sm:col-span-2">
						<label class="text-sm font-medium text-neutral-900" for="contact-message">
							Message <span class="text-red-500">*</span>
						</label>
						<textarea
							id="contact-message"
							class="min-h-32 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm transition-all outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
							placeholder="How can we help you?"
							bind:value={contactMessage}
							disabled={contactSuccess}
						></textarea>
					</div>

					<div class="flex flex-wrap items-center gap-3 pt-2 sm:col-span-2">
						<Button
							type="submit"
							variant="primary"
							size="lg"
							loading={contactLoading}
							disabled={contactSuccess || contactLoading}
						>
							{contactSuccess ? 'Message sent' : 'Send message'}
						</Button>
						<span class="text-sm text-neutral-500">or</span>
						<Button href="/book" variant="outline" size="lg">Book appointment instead</Button>
					</div>
				</div>
			</form>
		</div>
	</Section>

	<!-- Quick Help Section -->
	<Section tone="surface" spacing="default" class="scroll-fade-in">
		<div
			class="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 sm:p-8 md:flex-row md:items-center md:justify-between"
		>
			<div class="flex items-start gap-4">
				<div
					class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sage-100 text-sage-600"
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
					<h3 class="text-lg font-semibold text-neutral-900">Need urgent help?</h3>
					<p class="mt-1 text-neutral-600">
						For dental emergencies, call us directly. We prioritize same-day appointments when
						possible.
					</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-3">
				<Button href={'tel:' + site.phone} variant="primary">Call now</Button>
				<Button href="/services" variant="ghost">View services</Button>
			</div>
		</div>
	</Section>

	<!-- CTA Banner -->
	<section class="scroll-fade-in relative overflow-hidden">
		<div class="absolute inset-0">
			<img
				src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&h=600&fit=crop&q=80"
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
					Ready to visit?
				</h2>
				<p class="mt-4 text-lg text-neutral-300">
					Book your appointment online or give us a call. We look forward to meeting you.
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
