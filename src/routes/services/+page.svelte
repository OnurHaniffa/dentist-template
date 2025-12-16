<script lang="ts">
  import PageShell from "$lib/components/PageShell.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";

  const services = [
    {
      name: "Check-up & cleaning",
      desc: "A gentle exam and cleaning with clear guidance — no pressure.",
      meta: "30–45 min • Preventive",
      price: "₺1,250+"
    },
    {
      name: "Teeth whitening",
      desc: "Natural-looking brightening with sensitivity-aware options.",
      meta: "45–60 min • Cosmetic",
      price: "₺2,900+"
    },
    {
      name: "Invisalign consult",
      desc: "A scan-based consultation to see realistic alignment outcomes.",
      meta: "30 min • Ortho",
      price: "₺1,500"
    },
    {
      name: "Fillings",
      desc: "Comfort-first fillings designed to preserve healthy tooth structure.",
      meta: "30–60 min • Restorative",
      price: "₺1,400+"
    },
    {
      name: "Implants",
      desc: "Planning-led implants with a focus on long-term stability and comfort.",
      meta: "Case-based • Surgical",
      price: "Consult first"
    },
    {
      name: "Emergency care",
      desc: "Fast relief for pain, swelling, broken teeth, or urgent concerns.",
      meta: "Same-day when possible",
      price: "From ₺1,000"
    }
  ];
</script>

<svelte:head>
  <title>Services — Pearl Dental Studio</title>
  <meta name="description" content="Explore dental services including check-ups, whitening, Invisalign consults, fillings, implants, and emergency care." />
</svelte:head>

<PageShell>
  <PageHeader
    title="Services"
    subtitle="Clear options, explained simply. We’ll recommend only what you actually need."
  >
    <div class="flex flex-wrap gap-3">
      <a class="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800" href="/book">
        Book appointment
      </a>
      <a class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-slate-50" href="/contact">
        Ask a question
      </a>
    </div>
  </PageHeader>

  <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each services as s (s.name)}
      <article class="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-sm transition">
        <div class="text-sm font-semibold text-slate-900">{s.name}</div>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
        <div class="mt-4 flex items-center justify-between text-xs">
          <span class="text-slate-500">{s.meta}</span>
          <span class="font-semibold text-slate-900">{s.price}</span>
        </div>
      </article>
    {/each}
  </div>

  <div class="mt-10 rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div class="text-sm font-semibold text-slate-900">Not sure what you need?</div>
      <div class="text-sm text-slate-600">Tell us your symptoms — we’ll guide you to the right next step.</div>
    </div>
    <a class="mt-3 sm:mt-0 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700" href="/book">
      Request appointment
    </a>
  </div>
</PageShell>

