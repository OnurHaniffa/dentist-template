<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import Button from "$lib/ui/Button.svelte";
  import Card from "$lib/ui/Card.svelte";
  import Badge from "$lib/ui/Badge.svelte";
  import { fly, fade } from "svelte/transition";

  const services = [
    { name: "Check-up & cleaning", desc: "Gentle exam + cleaning with clear next steps.", meta: "30–45 min", price: "₺1,250+" },
    { name: "Teeth whitening", desc: "Natural brightening with sensitivity-aware options.", meta: "45–60 min", price: "₺2,900+" },
    { name: "Invisalign consult", desc: "Scan-based consult with realistic outcomes.", meta: "30 min", price: "₺1,500" },
    { name: "Fillings", desc: "Comfort-first composite fillings that look natural.", meta: "30–60 min", price: "₺1,400+" },
    { name: "Implants", desc: "Planning-led implants focused on long-term outcomes.", meta: "Case-based", price: "Consult" },
    { name: "Emergency care", desc: "Fast relief for pain, swelling, or broken teeth.", meta: "Same-day when possible", price: "From ₺1,000" }
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
    { q: "I’m anxious — can you help?", a: "Yes. We go slowly, explain clearly, and can pause anytime. You stay in control." },
    { q: "Do you share pricing before treatment?", a: "Always. We confirm options and cost before anything starts." },
    { q: "Do you offer same-week appointments?", a: "Often yes — especially for urgent pain or emergencies." }
  ];
</script>

<svelte:head>
  <title>Pearl Dental Studio — Modern dentistry, gentle care</title>
  <meta name="description" content="Modern dental care with a calm experience, transparent guidance, and a focus on long-term health." />
</svelte:head>

<!-- HERO -->
<Section tone="muted">
  <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
    <div in:fly={{ y: 10, duration: 220 }} class="grid gap-5">
      <Badge tone="success">
        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
        Same-week appointments available
      </Badge>

      <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
        Dentistry that feels calm, modern, and clear.
      </h1>

      <p class="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
        From check-ups to cosmetic care, we focus on comfort, honest guidance, and natural-looking results.
      </p>

      <div class="flex flex-wrap items-center gap-3">
        <Button href="/book" variant="primary" size="md">Book appointment</Button>
        <Button href="/services" variant="secondary" size="md">Explore services</Button>
      </div>

      <div class="grid grid-cols-3 gap-3 pt-4 text-sm">
        <Card class="p-4">
          <div class="font-semibold text-slate-900">4.9★</div>
          <div class="text-slate-600 text-xs">Avg reviews</div>
        </Card>
        <Card class="p-4">
          <div class="font-semibold text-slate-900">Gentle</div>
          <div class="text-slate-600 text-xs">Comfort-first</div>
        </Card>
        <Card class="p-4">
          <div class="font-semibold text-slate-900">Modern</div>
          <div class="text-slate-600 text-xs">Digital workflows</div>
        </Card>
      </div>
    </div>

    <div class="relative" in:fade={{ duration: 180 }}>
      <div class="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-sky-200/50 via-white to-emerald-200/40 blur-2xl"></div>

      <Card class="relative rounded-[2rem] p-4">
        <div class="rounded-[1.6rem] bg-slate-100 aspect-[4/3] grid place-items-center text-slate-500">
          Clinic photo / hero image
        </div>

        <div class="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
          <div>
            <div class="text-sm font-semibold text-slate-900">New patient?</div>
            <div class="text-xs text-slate-600">Exam + x-ray consultation</div>
          </div>
          <div class="text-sm font-semibold text-slate-900">₺1,250</div>
        </div>
      </Card>
    </div>
  </div>
</Section>

<!-- TRUST BAR -->
<Section tone="surface">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="text-sm text-slate-600">
      Trusted by patients who value comfort and clarity.
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Google 4.9★</Badge>
      <Badge>Same-week slots</Badge>
      <Badge>Modern clinic</Badge>
      <Badge>Transparent pricing</Badge>
    </div>
  </div>
</Section>

<!-- SERVICES -->
<Section tone="muted">
  <div class="flex items-end justify-between gap-6">
    <div>
      <h2 class="text-2xl font-semibold tracking-tight text-slate-900">Popular services</h2>
      <p class="text-sm text-slate-600 mt-1">Clear options, explained simply.</p>
    </div>
    <Button href="/services" variant="ghost" size="sm">View all →</Button>
  </div>

  <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each services as s (s.name)}
      <Card class="hover:shadow-md transition">
        <div class="text-sm font-semibold text-slate-900">{s.name}</div>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
        <div class="mt-4 flex items-center justify-between text-xs">
          <span class="text-slate-500">{s.meta}</span>
          <span class="font-semibold text-slate-900">{s.price}</span>
        </div>
      </Card>
    {/each}
  </div>
</Section>

<!-- WHY US -->
<Section tone="surface">
  <h2 class="text-2xl font-semibold tracking-tight text-slate-900">Why patients choose us</h2>
  <p class="text-sm text-slate-600 mt-1 max-w-2xl">A clinic experience designed to feel calm, modern, and straightforward.</p>

  <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each highlights as h (h.title)}
      <Card>
        <div class="text-sm font-semibold text-slate-900">{h.title}</div>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">{h.desc}</p>
      </Card>
    {/each}
  </div>
</Section>

<!-- HOW IT WORKS -->
<Section tone="muted">
  <h2 class="text-2xl font-semibold tracking-tight text-slate-900">How it works</h2>
  <p class="text-sm text-slate-600 mt-1 max-w-2xl">Simple steps. No confusion.</p>

  <div class="mt-6 grid gap-4 lg:grid-cols-3">
    {#each steps as s (s.n)}
      <Card>
        <div class="text-xs font-semibold text-slate-500">{s.n}</div>
        <div class="mt-2 text-sm font-semibold text-slate-900">{s.title}</div>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
      </Card>
    {/each}
  </div>

  <div class="mt-8 flex flex-wrap gap-3">
    <Button href="/book" variant="primary">Request appointment</Button>
    <Button href="/contact" variant="secondary">Contact</Button>
  </div>
</Section>

<!-- FAQ -->
<Section tone="surface">
  <h2 class="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
  <p class="text-sm text-slate-600 mt-1 max-w-2xl">Quick answers to common questions.</p>

  <div class="mt-6 grid gap-3">
    {#each faqs as f (f.q)}
      <details class="rounded-2xl border border-slate-200 bg-white p-5">
        <summary class="cursor-pointer text-sm font-semibold text-slate-900">
          {f.q}
        </summary>
        <p class="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
      </details>
    {/each}
  </div>
</Section>

<!-- FINAL CTA -->
<Section tone="muted">
  <Card class="p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div class="text-lg font-semibold text-slate-900">Ready to feel comfortable at the dentist?</div>
      <div class="text-sm text-slate-600 mt-1">Book online or call — we’ll confirm quickly.</div>
    </div>
    <div class="flex flex-wrap gap-3">
      <Button href="/book" variant="primary">Book appointment</Button>
      <Button href="/contact" variant="secondary">Contact</Button>
    </div>
  </Card>
</Section>
