<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { site } from '$lib/content/site';

	const quickLinks = [
		{ label: 'Services', href: '/services' },
		{ label: 'Pricing', href: '/pricing' },
		{ label: 'Our Team', href: '/team' },
		{ label: 'Reviews', href: '/reviews' },
		{ label: 'Book Online', href: '/book' }
	];

	const currentYear = new Date().getFullYear();
</script>

<footer>
	<!-- CTA Bar -->
	<div class="bg-primary-600">
		<Container class="py-10 lg:py-12">
			<div class="flex flex-col items-center justify-between gap-6 lg:flex-row">
				<div class="text-center lg:text-left">
					<h3 class="font-display text-xl text-white lg:text-2xl">
						Ready to experience calm, modern dental care?
					</h3>
					<p class="mt-2 text-primary-100">
						Book your appointment today — we'll confirm within 24 hours.
					</p>
				</div>
				<div class="flex flex-col items-center gap-4 sm:flex-row">
					<a
						href="/book"
						class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-primary-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
					>
						Book appointment
						<svg
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
							/></svg
						>
					</a>
					<a
						href={'tel:' + site.phone}
						class="inline-flex items-center gap-2 rounded-full px-6 py-4 font-medium text-white ring-1 ring-white/30 transition-colors hover:bg-white/10"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
							/></svg
						>
						Call us
					</a>
				</div>
			</div>
		</Container>
	</div>

	<!-- Main footer content -->
	<div class="bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 text-white">
		<!-- Newsletter row -->
		<Container class="border-b border-neutral-800 py-10">
			<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
				<div class="text-center md:text-left">
					<h4 class="text-lg font-semibold text-white">Get dental tips & updates</h4>
					<p class="mt-1 text-sm text-neutral-400">
						Simple advice for a healthier smile. No spam, unsubscribe anytime.
					</p>
				</div>
				<form class="flex w-full gap-2 md:w-auto" onsubmit={(e) => e.preventDefault()}>
					<div class="relative flex-1 md:w-72">
						<label for="newsletter-email" class="sr-only">Email address for newsletter</label>
						<input
							id="newsletter-email"
							type="email"
							placeholder="Your email address"
							autocomplete="email"
							class="w-full rounded-xl border border-neutral-700/50 bg-neutral-800/80 px-5 py-3.5 text-white placeholder-neutral-500 transition-all duration-200 focus:border-primary-500/50 focus:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:outline-none"
							required
						/>
					</div>
					<button
						type="submit"
						class="rounded-xl bg-primary-600 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-600/25 active:translate-y-0"
					>
						Subscribe
					</button>
				</form>
			</div>
		</Container>

		<!-- Footer columns -->
		<Container class="py-16 lg:py-20">
			<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
				<!-- Brand column -->
				<div class="sm:col-span-2 lg:col-span-1">
					<a href="/" class="group inline-flex items-center gap-3">
						<div
							class="grid h-10 w-10 place-items-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105"
						>
							<svg
								class="h-6 w-6 text-neutral-900"
								viewBox="0 0 24 24"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M12 3C8.5 3 6 5.5 6 8.5c0 2 .8 3.5 1.5 5 .7 1.5 1.5 3 1.5 5.5 0 1.5.5 2 1 2s1-.5 1.2-1.5c.2-1 .5-1.5.8-1.5s.6.5.8 1.5c.2 1 .7 1.5 1.2 1.5s1-.5 1-2c0-2.5.8-4 1.5-5.5.7-1.5 1.5-3 1.5-5C18 5.5 15.5 3 12 3z"
									fill="currentColor"
								/>
								<ellipse cx="9.5" cy="7" rx="1.5" ry="2" fill="white" opacity="0.3" />
							</svg>
						</div>
						<div class="flex flex-col">
							<span class="font-display text-lg tracking-tight">Pearl Dental</span>
							<span class="text-[11px] font-medium tracking-wide text-neutral-400 uppercase"
								>Studio</span
							>
						</div>
					</a>
					<p class="mt-5 max-w-xs text-sm leading-relaxed text-neutral-400">
						Modern dental care with a calm experience, transparent guidance, and a focus on
						long-term health.
					</p>

					<!-- Social icons -->
					<div class="mt-6 flex items-center gap-2">
						<a
							href="/contact"
							class="grid h-10 w-10 place-items-center rounded-xl bg-neutral-800/80 text-neutral-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white hover:shadow-lg hover:shadow-primary-600/25"
							aria-label="Follow us on Instagram"
						>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
									clip-rule="evenodd"
								/>
							</svg>
						</a>
						<a
							href="/contact"
							class="grid h-10 w-10 place-items-center rounded-xl bg-neutral-800/80 text-neutral-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white hover:shadow-lg hover:shadow-primary-600/25"
							aria-label="Follow us on Facebook"
						>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
									clip-rule="evenodd"
								/>
							</svg>
						</a>
						<a
							href="/contact"
							class="grid h-10 w-10 place-items-center rounded-xl bg-neutral-800/80 text-neutral-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white hover:shadow-lg hover:shadow-primary-600/25"
							aria-label="Follow us on LinkedIn"
						>
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
						</a>
					</div>
				</div>

				<!-- Quick links -->
				<div>
					<h3 class="mb-4 text-[13px] font-semibold tracking-wider text-neutral-400 uppercase">
						Quick Links
					</h3>
					<ul class="grid gap-3">
						{#each quickLinks as link (link.href)}
							<li>
								<a
									href={link.href}
									class="text-sm text-neutral-300 transition-colors duration-200 hover:text-white"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Contact -->
				<div>
					<h3 class="mb-4 text-[13px] font-semibold tracking-wider text-neutral-400 uppercase">
						Contact
					</h3>
					<ul class="grid gap-3">
						<li>
							<a
								href={'tel:' + site.phone}
								class="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors duration-200 hover:text-white"
							>
								<svg
									class="h-4 w-4 text-neutral-500"
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
								{site.phone}
							</a>
						</li>
						<li>
							<a
								href={'mailto:' + site.email}
								class="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors duration-200 hover:text-white"
							>
								<svg
									class="h-4 w-4 text-neutral-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
									/>
								</svg>
								{site.email}
							</a>
						</li>
						<li class="flex items-start gap-2 text-sm text-neutral-400">
							<svg
								class="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1.5"
								aria-hidden="true"
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
							<span>
								{site.addressLines[0]}<br />
								{site.addressLines[1]}
							</span>
						</li>
					</ul>
				</div>

				<!-- Hours -->
				<div>
					<h3 class="mb-4 text-[13px] font-semibold tracking-wider text-neutral-400 uppercase">
						Opening Hours
					</h3>
					<ul class="grid gap-2">
						{#each site.hours as h (h.day)}
							<li class="flex items-center justify-between text-sm">
								<span class="text-neutral-300">{h.day}</span>
								<span class="text-neutral-500">{h.time}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</Container>

		<!-- Bottom bar -->
		<div class="border-t border-neutral-800">
			<Container class="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
				<p class="text-xs text-neutral-500">
					© {currentYear}
					{site.name}. All rights reserved.
				</p>
				<div class="flex items-center gap-6 text-xs text-neutral-500">
					<a href="/contact" class="transition-colors duration-200 hover:text-neutral-300"
						>Privacy Policy</a
					>
					<a href="/contact" class="transition-colors duration-200 hover:text-neutral-300"
						>Terms of Service</a
					>
				</div>
			</Container>
		</div>
	</div>
</footer>
