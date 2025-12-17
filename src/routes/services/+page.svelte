<script lang="ts">
  import { browser } from "$app/environment";
  import PageShell from "$lib/components/PageShell.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import Section from "$lib/components/Section.svelte";
  import Button from "$lib/ui/Button.svelte";

  // Scroll animation observer
  $effect(() => {
    if (!browser) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".scroll-fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });

  type Category = "all" | "preventive" | "cosmetic" | "restorative" | "surgical";

  interface Service {
    name: string;
    desc: string;
    duration: string;
    category: Category;
    price: string;
    icon: string;
    includes: string[];
    idealFor: string;
  }

  const services: Service[] = [
    {
      name: "Check-up & Cleaning",
      desc: "A thorough exam and professional cleaning with honest guidance — no pressure, just clear advice about your oral health.",
      duration: "30–45 min",
      category: "preventive",
      price: "₺3,500+",
      icon: "search",
      includes: ["Full oral examination", "Professional scaling & polish", "Oral hygiene guidance", "Treatment plan if needed"],
      idealFor: "Everyone — recommended every 6 months"
    },
    {
      name: "Teeth Whitening",
      desc: "Professional brightening tailored to your sensitivity level. Natural-looking results you'll actually feel confident about.",
      duration: "45–60 min",
      category: "cosmetic",
      price: "₺8,500+",
      icon: "sparkles",
      includes: ["Shade assessment", "Gum protection", "Professional whitening", "Aftercare kit"],
      idealFor: "Those wanting a brighter, confident smile"
    },
    {
      name: "Invisalign",
      desc: "Clear aligners that straighten your teeth discreetly. We'll show you a 3D preview of your smile transformation.",
      duration: "6–18 months",
      category: "cosmetic",
      price: "From ₺95,000",
      icon: "smile",
      includes: ["3D digital scan", "Custom aligner sets", "Progress check-ins", "Retainers included"],
      idealFor: "Adults & teens wanting discreet alignment"
    },
    {
      name: "Fillings & Restorations",
      desc: "Tooth-colored composite fillings that preserve healthy structure and blend seamlessly with your natural teeth.",
      duration: "30–60 min",
      category: "restorative",
      price: "₺3,000+",
      icon: "shield",
      includes: ["Local anesthesia", "Decay removal", "Composite restoration", "Bite adjustment"],
      idealFor: "Cavities or replacing old metal fillings"
    },
    {
      name: "Dental Implants",
      desc: "Permanent tooth replacement with meticulous planning. A long-term solution that looks and functions like natural teeth.",
      duration: "3–6 months total",
      category: "surgical",
      price: "From ₺45,000",
      icon: "cog",
      includes: ["3D CT scan & planning", "Surgical placement", "Healing period", "Custom ceramic crown"],
      idealFor: "Missing teeth — single or multiple"
    },
    {
      name: "Emergency Care",
      desc: "Fast relief when you need it most. Same-day appointments for pain, swelling, broken teeth, or urgent concerns.",
      duration: "Same-day",
      category: "surgical",
      price: "From ₺2,500",
      icon: "alert",
      includes: ["Priority scheduling", "Pain management", "Diagnostic X-rays", "Immediate treatment"],
      idealFor: "Dental emergencies & severe pain"
    }
  ];

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All Services" },
    { value: "preventive", label: "Preventive" },
    { value: "cosmetic", label: "Cosmetic" },
    { value: "restorative", label: "Restorative" },
    { value: "surgical", label: "Surgical" }
  ];

  let activeCategory = $state<Category>("all");
  let expandedService = $state<string | null>(null);

  const filteredServices = $derived(
    activeCategory === "all"
      ? services
      : services.filter(s => s.category === activeCategory)
  );

  function toggleExpand(name: string) {
    expandedService = expandedService === name ? null : name;
  }

  function getCategoryStyle(category: Category): string {
    switch (category) {
      case "preventive": return "bg-sage-50 text-sage-700";
      case "cosmetic": return "bg-primary-50 text-primary-700";
      case "restorative": return "bg-amber-50 text-amber-700";
      case "surgical": return "bg-rose-50 text-rose-700";
      default: return "bg-neutral-50 text-neutral-700";
    }
  }
</script>

<svelte:head>
  <title>Services — Pearl Dental Studio</title>
  <meta name="description" content="Dental services including check-ups, whitening, Invisalign, fillings, implants, and emergency care. Transparent pricing, honest advice." />
</svelte:head>

<PageShell>
  <!-- Header Section -->
  <Section tone="muted" spacing="default">
    <PageHeader
      title="Our Services"
      subtitle="Quality care with transparent pricing. We recommend only what you actually need — nothing more."
      breadcrumbs={[{ label: "Services" }]}
    >
      <div class="mt-2 flex flex-wrap gap-3">
        <Button href="/book" variant="primary" size="lg">Book appointment</Button>
        <Button href="/contact" variant="outline" size="lg">Ask a question</Button>
      </div>
    </PageHeader>
  </Section>

  <!-- Category Filter & Services -->
  <Section tone="surface" spacing="spacious" class="scroll-fade-in">
    <!-- Section Header -->
    <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="mb-2 text-sm font-medium uppercase tracking-wider text-primary-600">
          Browse Treatments
        </p>
        <h2 class="font-display text-2xl tracking-tight text-neutral-900 sm:text-3xl">
          What we offer
        </h2>
      </div>
      <p class="max-w-md text-neutral-600">
        Select a category to filter, or browse all our services below.
      </p>
    </div>

    <!-- Category Filter Tabs -->
    <div class="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Service categories">
      {#each categories as cat (cat.value)}
        <button
          role="tab"
          aria-selected={activeCategory === cat.value}
          onclick={() => activeCategory = cat.value}
          class="rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 {
            activeCategory === cat.value
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }"
        >
          {cat.label}
        </button>
      {/each}
    </div>

    <!-- Services Grid -->
    <div class="grid gap-6 md:grid-cols-2">
      {#each filteredServices as service (service.name)}
        {@const isExpanded = expandedService === service.name}
        <article
          class="group relative rounded-2xl bg-gradient-to-b from-neutral-100 to-white p-[1px] shadow-md transition-all duration-300 {
            isExpanded ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-xl hover:shadow-neutral-900/10 hover:-translate-y-1 hover:from-primary-100'
          }"
        >
        <div class="rounded-2xl bg-white overflow-hidden h-full">
          <div class="p-6 sm:p-8">
            <!-- Header -->
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 text-primary-600 grid place-items-center group-hover:bg-primary-100 transition-colors">
                {#if service.icon === "search"}
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                {:else if service.icon === "sparkles"}
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                {:else if service.icon === "smile"}
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                {:else if service.icon === "shield"}
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                {:else if service.icon === "cog"}
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                {:else if service.icon === "alert"}
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                {/if}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <h3 class="text-lg font-semibold text-neutral-900">
                    {service.name}
                  </h3>
                  <span class="flex-shrink-0 text-lg font-semibold text-neutral-900">{service.price}</span>
                </div>
                <span class="inline-block mt-1 rounded-full px-2.5 py-0.5 text-xs font-medium {getCategoryStyle(service.category)}">
                  {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="mt-4 text-neutral-600 leading-relaxed">
              {service.desc}
            </p>

            <!-- Meta -->
            <div class="mt-5 flex items-center gap-2 text-sm text-neutral-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {service.duration}
            </div>
          </div>

          <!-- Expandable Details -->
          <div class="border-t border-neutral-100">
            <button
              onclick={() => toggleExpand(service.name)}
              aria-expanded={isExpanded}
              class="w-full px-6 sm:px-8 py-4 flex items-center justify-between text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <span>{isExpanded ? "Hide details" : "View details"}</span>
              <svg
                class="w-5 h-5 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {#if isExpanded}
              <div class="px-6 sm:px-8 pb-6 sm:pb-8 space-y-5 animate-fadeIn">
                <div>
                  <h4 class="text-xs font-semibold text-neutral-900 uppercase tracking-wide mb-3">What's Included</h4>
                  <ul class="space-y-2">
                    {#each service.includes as item}
                      <li class="flex items-start gap-3 text-sm text-neutral-600">
                        <svg class="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    {/each}
                  </ul>
                </div>

                <div>
                  <h4 class="text-xs font-semibold text-neutral-900 uppercase tracking-wide mb-2">Ideal For</h4>
                  <p class="text-sm text-neutral-600">{service.idealFor}</p>
                </div>

                <Button href="/book?service={encodeURIComponent(service.name)}" variant="primary" class="w-full">
                  Book {service.name}
                </Button>
              </div>
            {/if}
          </div>
        </div>
        </article>
      {/each}
    </div>
  </Section>

  <!-- Help Card Section -->
  <Section tone="muted" spacing="default" class="scroll-fade-in">
    <div
      class="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5 sm:p-8 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex items-start gap-4">
        <div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-100 text-primary-600">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-neutral-900">Not sure what you need?</h3>
          <p class="mt-1 text-neutral-600">
            Describe your symptoms or concerns and we'll guide you to the right treatment — no pressure.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3">
        <Button href="/contact" variant="outline">Describe symptoms</Button>
        <Button href="/book" variant="primary">Book consultation</Button>
      </div>
    </div>
  </Section>

  <!-- Additional Info Section -->
  <Section tone="surface" spacing="default" class="scroll-fade-in">
    <div class="grid gap-6 sm:grid-cols-3">
      <div class="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5">
        <div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-100 text-sage-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-neutral-900">Flexible Payment</h3>
          <p class="mt-1 text-sm text-neutral-500">Interest-free installments for treatments over ₺5,000</p>
        </div>
      </div>
      <div class="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5">
        <div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-100 text-primary-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-neutral-900">Insurance Welcome</h3>
          <p class="mt-1 text-sm text-neutral-500">We work with all major insurance providers</p>
        </div>
      </div>
      <div class="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-900/5">
        <div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-neutral-900">Free Estimates</h3>
          <p class="mt-1 text-sm text-neutral-500">Detailed cost breakdown before any treatment</p>
        </div>
      </div>
    </div>
  </Section>

  <!-- Final CTA Banner -->
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
          Book a consultation and we'll create a personalized treatment plan tailored to your needs.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/book"
            class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-neutral-900 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Book appointment
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="tel:+905551234567"
            class="inline-flex items-center gap-2 rounded-full px-6 py-4 font-medium text-white ring-1 ring-white/30 transition-colors hover:bg-white/10"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call +90 555 123 4567
          </a>
        </div>
      </div>
    </div>
  </section>
</PageShell>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
</style>
