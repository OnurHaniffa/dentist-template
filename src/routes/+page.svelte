<script lang="ts">
  import { browser } from "$app/environment";
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

  const services = [
    { name: "Check-up & cleaning", desc: "Gentle exam + cleaning with clear next steps.", meta: "30–45 min", price: "₺3,500+", icon: "sparkles" },
    { name: "Teeth whitening", desc: "Natural brightening with sensitivity-aware options.", meta: "45–60 min", price: "₺8,500+", icon: "sun" },
    { name: "Invisalign consult", desc: "Scan-based consult with realistic outcomes.", meta: "30 min", price: "₺2,500", icon: "cube" },
    { name: "Fillings", desc: "Comfort-first composite fillings that look natural.", meta: "30–60 min", price: "₺3,000+", icon: "shield" },
    { name: "Implants", desc: "Planning-led implants focused on long-term outcomes.", meta: "Case-based", price: "Consult", icon: "bolt" },
    { name: "Emergency care", desc: "Fast relief for pain, swelling, or broken teeth.", meta: "Same-day when possible", price: "From ₺2,500", icon: "clock" }
  ];

  const highlights = [
    { title: "Anxiety-friendly", desc: "Calm explanations, gentle pace, comfort-first care." },
    { title: "Modern diagnostics", desc: "Digital workflows for clarity and confidence." },
    { title: "Transparent options", desc: "We explain pros/cons and pricing before treatment." }
  ];

  const steps = [
    { n: "01", title: "Request a time", desc: "Book online or call — we’ll confirm quickly." },
    { n: "02", title: "Clear exam", desc: "We check what matters and explain what we see." },
    { n: "03", title: "Simple plan", desc: "Only what you need, with options and pricing." }
  ];

  const faqs = [
    { q: "What should I expect at my first visit?", a: "Your first visit includes a comprehensive exam, digital x-rays, and a thorough cleaning. We'll discuss your dental history, address any concerns, and create a personalized care plan. The whole appointment typically takes 60-90 minutes." },
    { q: "Do you accept dental insurance?", a: "Yes, we accept most major dental insurance plans. Our team will verify your coverage and help you understand your benefits before any treatment. We also offer flexible payment plans for those without insurance." },
    { q: "I have dental anxiety — how can you help?", a: "We specialize in anxious patients. Our approach includes detailed explanations before each step, a calm environment, and the option to pause anytime. Many patients tell us they feel more comfortable here than at previous dentists." },
    { q: "How often should I schedule a check-up?", a: "For most patients, we recommend a check-up and cleaning every 6 months. However, some patients with specific conditions may benefit from more frequent visits. We'll recommend a schedule based on your individual needs." },
    { q: "What payment options do you offer?", a: "We accept cash, credit cards, and bank transfers. For larger treatments, we offer interest-free payment plans spread over 3-12 months. We'll always discuss costs upfront so there are no surprises." }
  ];

  const testimonials = [
    {
      quote: "I've avoided dentists for years due to anxiety. Pearl Dental changed that completely. The team explains everything, never rushes, and genuinely cares about comfort.",
      name: "Ayşe K.",
      role: "Patient since 2022",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
    },
    {
      quote: "Finally, a dentist who doesn't try to upsell. They gave me honest options, explained the trade-offs, and let me decide. My whole family comes here now.",
      name: "Mehmet T.",
      role: "Patient since 2021",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      quote: "The modern equipment and digital workflow made my Invisalign treatment seamless. I could see exactly what to expect before starting.",
      name: "Elena S.",
      role: "Invisalign patient",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    }
  ];
</script>

<svelte:head>
  <title>Pearl Dental Studio — Modern dentistry, gentle care</title>
  <meta name="description" content="Modern dental care with a calm experience, transparent guidance, and a focus on long-term health." />
</svelte:head>

<!-- HERO -->
<section class="relative min-h-[90vh] flex items-center overflow-hidden bg-neutral-50">
  <!-- Background pattern -->
  <div class="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true"></div>

  <!-- Gradient orbs -->
  <div class="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl motion-safe:animate-pulse-soft" aria-hidden="true"></div>
  <div class="absolute bottom-20 right-10 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl motion-safe:animate-pulse-soft motion-safe:animation-delay-500" aria-hidden="true"></div>

  <!-- Content -->
  <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
    <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

      <!-- Left: Text content -->
      <div class="lg:col-span-6 space-y-8 motion-safe:animate-fade-in">
        <!-- Availability pill -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass ring-1 ring-neutral-200/50 shadow-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-500 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-sage-600"></span>
          </span>
          <span class="text-sm font-medium text-neutral-700">Same-week appointments available</span>
        </div>

        <!-- Main headline -->
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-display font-normal tracking-tight text-neutral-900 leading-[1.05]">
          Modern dental care,
          <span class="block text-primary-600">designed for you.</span>
        </h1>

        <!-- Subheadline -->
        <p class="text-xl text-neutral-600 max-w-lg leading-relaxed">
          From check-ups to cosmetic treatments, we combine gentle care with honest guidance for lasting results.
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="/book"
            class="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 text-white font-semibold text-base shadow-xl shadow-neutral-900/20 hover:shadow-2xl hover:shadow-neutral-900/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Book appointment
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            class="inline-flex items-center gap-2 px-6 py-4 rounded-full text-neutral-700 font-medium hover:text-neutral-900 hover:bg-white/80 transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
            See how we work
          </a>
        </div>

        <!-- Trust logos / badges -->
        <div class="flex items-center gap-6 pt-6 border-t border-neutral-200/60">
          <div class="flex items-center gap-1">
            <div class="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face" alt="" class="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" alt="" class="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" alt="" class="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" alt="" class="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
            </div>
            <span class="text-sm text-neutral-600 ml-2">5,000+ happy patients</span>
          </div>
        </div>
      </div>

      <!-- Right: Bento Grid -->
      <div class="lg:col-span-6 motion-safe:animate-fade-in motion-safe:animation-delay-200">
        <div class="grid grid-cols-2 gap-4 p-4 rounded-[2rem] bg-white/40 ring-1 ring-neutral-200/50 backdrop-blur-sm">
          <!-- Main image card - spans 2 cols -->
          <div class="col-span-2 relative group">
            <div class="rounded-3xl bg-gradient-to-br from-neutral-100 to-white p-1 shadow-2xl shadow-neutral-900/10 ring-1 ring-neutral-900/5 overflow-hidden">
              <div class="rounded-[1.25rem] aspect-[16/9] relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=450&fit=crop&q=80"
                  alt="Modern dental clinic interior with comfortable treatment chair"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <!-- Overlay gradient for text readability if needed -->
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <!-- Bento: Rating card -->
          <div class="glass rounded-2xl p-5 ring-1 ring-neutral-200/50 shadow-lg motion-safe:animate-float">
            <div class="flex items-center gap-3 mb-3">
              <div class="flex text-primary-500">
                {#each Array(5) as _}
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
              </div>
            </div>
            <div class="text-3xl font-display font-medium text-neutral-900">4.9</div>
            <div class="text-sm text-neutral-500 mt-1">Google Reviews</div>
          </div>

          <!-- Bento: Experience card -->
          <div class="bg-neutral-900 text-white rounded-2xl p-5 shadow-xl">
            <div class="w-10 h-10 rounded-xl bg-white/10 grid place-items-center mb-4">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <div class="text-3xl font-display font-medium">15+</div>
            <div class="text-sm text-neutral-400 mt-1">Years of expertise</div>
          </div>

          <!-- Bento: Booking prompt - spans 2 cols -->
          <div class="col-span-2 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-5 shadow-xl shadow-primary-500/25 text-white ring-1 ring-primary-400/20">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold text-lg">New patient special</div>
                <div class="text-primary-100 text-sm mt-0.5">Exam + X-rays + Cleaning</div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-display font-medium">₺3,500</div>
                <div class="text-primary-200 text-xs">Save 30%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- TRUST BAR -->
<section class="border-y border-neutral-200 bg-white py-6">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <p class="text-sm text-neutral-500 text-center sm:text-left">Trusted by patients who value comfort and clarity</p>
      <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span class="text-sm font-medium text-neutral-900">4.9 on Google</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span class="text-sm font-medium text-neutral-900">Same-week slots</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
          <span class="text-sm font-medium text-neutral-900">Modern equipment</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
          <span class="text-sm font-medium text-neutral-900">Transparent pricing</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<Section tone="muted" spacing="spacious" class="scroll-fade-in">
  <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
    <div>
      <p class="text-sm font-medium text-primary-600 uppercase tracking-wider mb-2">Our Services</p>
      <h2 class="text-3xl sm:text-4xl font-display tracking-tight text-neutral-900">Popular treatments</h2>
      <p class="text-neutral-600 mt-2 max-w-lg">Clear options, explained simply. No jargon, no pressure.</p>
    </div>
    <Button href="/services" variant="outline" size="md">View all services →</Button>
  </div>

  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each services as s (s.name)}
      <a href="/services" class="group relative bg-white rounded-2xl p-6 shadow-md ring-1 ring-neutral-900/5 hover:shadow-xl hover:shadow-neutral-900/10 hover:-translate-y-1 transition-all duration-300 block">
        <!-- Icon -->
        <div class="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 grid place-items-center mb-4 group-hover:bg-primary-100 transition-colors">
          {#if s.icon === "sparkles"}
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
          {:else if s.icon === "sun"}
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
          {:else if s.icon === "cube"}
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
          {:else if s.icon === "shield"}
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          {:else if s.icon === "bolt"}
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
          {:else if s.icon === "clock"}
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {/if}
        </div>
        <h3 class="text-lg font-semibold text-neutral-900">{s.name}</h3>
        <p class="mt-2 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
        <div class="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span class="text-xs text-neutral-500">{s.meta}</span>
          <span class="text-sm font-semibold text-neutral-900">{s.price}</span>
        </div>
        <!-- Hover arrow -->
        <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
        </div>
      </a>
    {/each}
  </div>
</Section>

<!-- WHY US -->
<Section tone="surface" spacing="spacious" class="scroll-fade-in">
  <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    <!-- Image side -->
    <div class="relative">
      <div class="relative rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=700&fit=crop&q=80"
          alt="Dentist carefully explaining treatment to patient"
          class="w-full aspect-[4/5] object-cover"
          loading="lazy"
        />
        <!-- Overlay card -->
        <div class="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 ring-1 ring-white/20">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-sage-500 text-white grid place-items-center shrink-0">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <div class="font-semibold text-neutral-900">Trusted by 5,000+ patients</div>
              <div class="text-sm text-neutral-600">Rated 4.9 on Google</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Decorative element -->
      <div class="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl bg-primary-100/50" aria-hidden="true"></div>
    </div>

    <!-- Content side -->
    <div>
      <p class="text-sm font-medium text-primary-600 uppercase tracking-wider mb-2">Why Choose Us</p>
      <h2 class="text-3xl sm:text-4xl font-display tracking-tight text-neutral-900 mb-4">
        A clinic experience designed around <span class="text-primary-600">you</span>
      </h2>
      <p class="text-lg text-neutral-600 mb-8">
        We believe dental care should feel calm, modern, and straightforward. That's why everything we do puts your comfort first.
      </p>

      <div class="space-y-6">
        {#each highlights as h, i (h.title)}
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-xl bg-neutral-900 text-white grid place-items-center shrink-0 text-sm font-semibold">
              0{i + 1}
            </div>
            <div>
              <h3 class="font-semibold text-neutral-900">{h.title}</h3>
              <p class="text-neutral-600 mt-1">{h.desc}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-8">
        <a href="/team" class="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
          Meet our team
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </a>
      </div>
    </div>
  </div>
</Section>

<!-- TESTIMONIALS -->
<Section tone="muted" spacing="spacious" class="scroll-fade-in">
  <div class="text-center max-w-2xl mx-auto mb-12">
    <p class="text-sm font-medium text-primary-600 uppercase tracking-wider mb-2">Patient Stories</p>
    <h2 class="text-3xl sm:text-4xl font-display tracking-tight text-neutral-900">What our patients say</h2>
    <p class="text-neutral-600 mt-3">Real experiences from people who chose comfort and clarity.</p>
  </div>

  <div class="grid gap-6 md:grid-cols-3">
    {#each testimonials as t (t.name)}
      <blockquote class="relative bg-white rounded-2xl p-6 shadow-sm ring-1 ring-neutral-900/5">
        <!-- Quote icon -->
        <svg class="absolute top-6 right-6 w-8 h-8 text-primary-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p class="text-neutral-700 leading-relaxed mb-6 relative z-10">"{t.quote}"</p>
        <footer class="flex items-center gap-3">
          <img
            src={t.avatar}
            alt=""
            class="w-11 h-11 rounded-full object-cover ring-2 ring-neutral-100"
            loading="lazy"
          />
          <div>
            <cite class="not-italic font-semibold text-neutral-900">{t.name}</cite>
            <p class="text-sm text-neutral-500">{t.role}</p>
          </div>
        </footer>
      </blockquote>
    {/each}
  </div>

  <div class="mt-10 text-center">
    <a href="/reviews" class="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
      Read more reviews
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    </a>
  </div>
</Section>

<!-- HOW IT WORKS -->
<Section id="how-it-works" tone="surface" spacing="spacious" class="scroll-fade-in">
  <div class="text-center max-w-2xl mx-auto mb-12">
    <p class="text-sm font-medium text-primary-600 uppercase tracking-wider mb-2">Simple Process</p>
    <h2 class="text-3xl sm:text-4xl font-display tracking-tight text-neutral-900">How it works</h2>
    <p class="text-neutral-600 mt-3">Three simple steps to better dental health. No confusion, no pressure.</p>
  </div>

  <div class="relative grid gap-8 lg:grid-cols-3 lg:gap-6">
    <!-- Connector line (desktop only) -->
    <div class="hidden lg:block absolute top-8 left-[16.67%] right-[16.67%] h-[2px] bg-neutral-200" aria-hidden="true"></div>

    {#each steps as s (s.n)}
      <div class="relative text-center">
        <!-- Step number -->
        <div class="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 text-white text-2xl font-display mb-6 shadow-lg">
          {s.n}
        </div>
        <h3 class="text-xl font-semibold text-neutral-900">{s.title}</h3>
        <p class="mt-2 text-neutral-600 max-w-xs mx-auto">{s.desc}</p>
      </div>
    {/each}
  </div>

  <div class="mt-12 text-center">
    <a
      href="/book"
      class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 text-white font-semibold shadow-xl shadow-neutral-900/20 hover:shadow-2xl hover:shadow-neutral-900/30 hover:-translate-y-0.5 transition-all duration-300"
    >
      Book your first visit
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
    </a>
  </div>
</Section>

<!-- FAQ -->
<Section tone="surface" spacing="default" class="scroll-fade-in">
  <div class="grid lg:grid-cols-12 gap-12">
    <!-- Left: Header -->
    <div class="lg:col-span-4">
      <p class="text-sm font-medium text-primary-600 uppercase tracking-wider mb-2">FAQ</p>
      <h2 class="text-3xl sm:text-4xl font-display tracking-tight text-neutral-900">Common questions</h2>
      <p class="text-neutral-600 mt-3">Quick answers to help you feel informed and confident.</p>
      <div class="mt-6">
        <a href="/contact" class="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
          Still have questions? Contact us
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </a>
      </div>
    </div>

    <!-- Right: Accordions -->
    <div class="lg:col-span-8 space-y-4">
      {#each faqs as f (f.q)}
        <details class="accordion-smooth group rounded-2xl bg-white shadow-sm ring-1 ring-neutral-900/5 overflow-hidden">
          <summary class="cursor-pointer flex items-center justify-between p-6 text-left font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
            <span>{f.q}</span>
            <svg class="w-5 h-5 text-neutral-400 group-open:rotate-45 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </summary>
          <div class="accordion-content">
            <div class="px-6 pb-6">
              <p class="text-neutral-600 leading-relaxed">{f.a}</p>
            </div>
          </div>
        </details>
      {/each}
    </div>
  </div>
</Section>

<!-- FINAL CTA -->
<section class="relative overflow-hidden">
  <!-- Background image -->
  <div class="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1600&h=600&fit=crop&q=80"
      alt=""
      class="w-full h-full object-cover"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-neutral-900/80"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display text-white tracking-tight">
        Ready to feel comfortable at the dentist?
      </h2>
      <p class="mt-4 text-lg text-neutral-300">
        Book online or call — we'll confirm your appointment quickly and answer any questions you have.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="/book"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Book appointment
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </a>
        <a
          href="tel:+905551234567"
          class="inline-flex items-center gap-2 px-6 py-4 rounded-full text-white font-medium ring-1 ring-white/30 hover:bg-white/10 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
          Call +90 555 123 4567
        </a>
      </div>
    </div>
  </div>
</section>
