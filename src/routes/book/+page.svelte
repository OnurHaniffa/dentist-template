<script lang="ts">
	import { browser } from '$app/environment';
	import PageShell from '$lib/components/PageShell.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Section from '$lib/components/Section.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { site } from '$lib/content/site';

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

	// Service options with prices
	const serviceOptions = [
		{ value: 'Check-up', label: 'Check-up & Exam', price: '₺1,250' },
		{ value: 'Cleaning', label: 'Cleaning', price: '₺1,250+' },
		{ value: 'Whitening', label: 'Teeth Whitening', price: '₺2,900+' },
		{ value: 'Invisalign', label: 'Invisalign Consult', price: '₺1,500' },
		{ value: 'Filling', label: 'Filling', price: '₺1,400+' },
		{ value: 'Emergency', label: 'Emergency Visit', price: '₺1,000+' },
		{ value: 'Other', label: 'Other', price: null }
	];

	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let reason = $state('Check-up');
	let message = $state('');
	let consent = $state(false);

	let error = $state<string | null>(null);
	let success = $state(false);
	let loading = $state(false);

	const selectedService = $derived(serviceOptions.find((s) => s.value === reason));

	function validate() {
		if (!name.trim()) return 'Please enter your name.';
		if (!phone.trim()) return 'Please enter your phone number.';
		if (!consent) return 'Please confirm consent so we can contact you.';
		return null;
	}

	function onSubmit(e: SubmitEvent) {
		e.preventDefault();

		error = validate();
		if (error) return;

		loading = true;

		// Simulate async submission
		setTimeout(() => {
			loading = false;
			success = true;
		}, 1000);
	}

	const expectations = [
		{ icon: 'clock', text: 'Quick confirmation by phone or email' },
		{ icon: 'currency', text: 'Clear pricing before any treatment' },
		{ icon: 'heart', text: 'Comfort-first, anxiety-friendly approach' },
		{ icon: 'chat', text: 'Honest options with no pressure' }
	];
</script>

<svelte:head>
	<title>Book appointment — Pearl Dental Studio</title>
	<meta
		name="description"
		content="Request a dental appointment online. We'll confirm by phone or email within 24 hours."
	/>
</svelte:head>

<PageShell>
	<!-- Header Section -->
	<Section tone="muted" spacing="default">
		<PageHeader
			title="Book Appointment"
			subtitle="Request a time that works for you. We'll confirm by phone or email within 24 hours."
			breadcrumbs={[{ label: 'Book' }]}
		/>
	</Section>

	<!-- Form Section -->
	<Section tone="surface" spacing="spacious" class="scroll-fade-in">
		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Form -->
			<form
				class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 sm:p-8 lg:col-span-2"
				onsubmit={onSubmit}
			>
				{#if error}
					<div
						class="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
					>
						<svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
						</svg>
						{error}
					</div>
				{/if}

				{#if success}
					<div
						class="mb-6 flex items-start gap-3 rounded-xl border border-sage-200 bg-sage-50 p-4 text-sm text-sage-800"
					>
						<svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div>
							<strong>Request received!</strong> We'll contact you shortly to confirm your appointment.
						</div>
					</div>
				{/if}

				<div class="grid gap-6 sm:grid-cols-2">
					<!-- Name -->
					<div class="grid gap-2">
						<label class="text-sm font-medium text-neutral-900" for="name">
							Full name <span class="text-red-500">*</span>
						</label>
						<input
							id="name"
							type="text"
							class="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
							placeholder="Your name"
							bind:value={name}
							disabled={success}
						/>
					</div>

					<!-- Phone -->
					<div class="grid gap-2">
						<label class="text-sm font-medium text-neutral-900" for="phone">
							Phone <span class="text-red-500">*</span>
						</label>
						<input
							id="phone"
							type="tel"
							class="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
							placeholder="+90 555 123 4567"
							bind:value={phone}
							disabled={success}
						/>
					</div>

					<!-- Email -->
					<div class="grid gap-2 sm:col-span-2">
						<label class="text-sm font-medium text-neutral-900" for="email">
							Email <span class="text-neutral-400">(optional)</span>
						</label>
						<input
							id="email"
							type="email"
							class="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
							placeholder="you@example.com"
							bind:value={email}
							disabled={success}
						/>
					</div>

					<!-- Reason -->
					<div class="grid gap-2 sm:col-span-2">
						<label class="text-sm font-medium text-neutral-900" for="reason">Reason for visit</label>
						<select
							id="reason"
							class="h-12 rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
							bind:value={reason}
							disabled={success}
						>
							{#each serviceOptions as opt (opt.value)}
								<option value={opt.value}>
									{opt.label}{opt.price ? ` — ${opt.price}` : ''}
								</option>
							{/each}
						</select>
						{#if selectedService?.price}
							<div class="flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2 text-sm">
								<svg class="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span class="text-neutral-600">
									Starting from <strong class="text-primary-700">{selectedService.price}</strong>
									<span class="text-neutral-500">— final price confirmed after consultation</span>
								</span>
							</div>
						{/if}
					</div>

					<!-- Message -->
					<div class="grid gap-2 sm:col-span-2">
						<label class="text-sm font-medium text-neutral-900" for="message">
							Additional notes <span class="text-neutral-400">(optional)</span>
						</label>
						<textarea
							id="message"
							class="min-h-28 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
							placeholder="Any specific concerns or preferred times?"
							bind:value={message}
							disabled={success}
						></textarea>
					</div>

					<!-- Consent -->
					<label
						class="sm:col-span-2 flex items-start gap-3 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600 cursor-pointer hover:bg-neutral-100 transition-colors"
					>
						<input
							type="checkbox"
							class="mt-0.5 h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
							bind:checked={consent}
							disabled={success}
						/>
						<span>
							I consent to being contacted about this appointment request. <span class="text-red-500">*</span>
						</span>
					</label>

					<!-- Buttons -->
					<div class="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
						<Button type="submit" variant="primary" size="lg" {loading} disabled={success || loading}>
							{success ? 'Request sent' : 'Send request'}
						</Button>
						<Button href={'tel:' + site.phone} variant="outline" size="lg">
							Call instead
						</Button>
					</div>
				</div>
			</form>

			<!-- Sidebar -->
			<aside class="space-y-6">
				<!-- What to Expect -->
				<div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5">
					<h3 class="font-semibold text-neutral-900">What to expect</h3>
					<ul class="mt-4 space-y-4">
						{#each expectations as e (e.text)}
							<li class="flex items-start gap-3">
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
								<span class="text-sm text-neutral-600">{e.text}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Prefer to Call -->
				<div class="rounded-2xl bg-primary-50 p-6 ring-1 ring-primary-100">
					<h3 class="font-semibold text-neutral-900">Prefer to call?</h3>
					<p class="mt-2 text-sm text-neutral-600">
						We're happy to help you book over the phone and answer any questions.
					</p>
					<div class="mt-4">
						<Button href={'tel:' + site.phone} variant="primary">
							Call {site.phone}
						</Button>
					</div>
				</div>

				<!-- Opening Hours -->
				<div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5">
					<h3 class="font-semibold text-neutral-900">Opening hours</h3>
					<div class="mt-3 space-y-2 text-sm">
						{#each site.hours as h (h.day)}
							<div class="flex justify-between text-neutral-600">
								<span>{h.day}</span>
								<span>{h.time}</span>
							</div>
						{/each}
					</div>
				</div>
			</aside>
		</div>
	</Section>

	<!-- Trust Section -->
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
							d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
						/>
					</svg>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-neutral-900">Trusted by 5,000+ patients</h3>
					<p class="mt-1 text-neutral-600">
						Rated 4.9 on Google. Join thousands who've experienced our calm, modern approach.
					</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-3">
				<Button href="/reviews" variant="outline">Read reviews</Button>
				<Button href="/team" variant="ghost">Meet the team</Button>
			</div>
		</div>
	</Section>
</PageShell>
