<script lang="ts">
  import PageShell from "$lib/components/PageShell.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";

  type ReviewTag = "Comfort" | "Results" | "Service";
  type Review = { name: string; rating: number; text: string; tag: ReviewTag };

  const reviews: Review[] = [
    { name: "S. A.", rating: 5, tag: "Comfort", text: "Super gentle and explained everything clearly. I finally feel relaxed at the dentist." },
    { name: "M. K.", rating: 5, tag: "Results", text: "Whitening looked natural — not overdone. Clean, modern clinic and great team." },
    { name: "N. D.", rating: 5, tag: "Service", text: "Fast appointment, no waiting, and very professional. Felt taken care of." },
    { name: "E. T.", rating: 5, tag: "Comfort", text: "I’m usually anxious — they were patient and calm. Huge difference." }
  ];

  const filterOptions = ["All", "Comfort", "Results", "Service"] as const;
  type Filter = (typeof filterOptions)[number];

  let filter = $state<Filter>("All");

  const stars = (n: number) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
</script>

<svelte:head>
  <title>Reviews — Pearl Dental Studio</title>
  <meta name="description" content="Read patient reviews and see why people choose our clinic for calm, modern dental care." />
</svelte:head>

<PageShell>
  <PageHeader
    title="Reviews"
    subtitle="Real experiences from patients who value comfort, clarity, and results."
  />

  <div class="mt-8 flex flex-wrap gap-2">
    {#each filterOptions as t}
      <button
        type="button"
        class={"rounded-full px-3 py-1.5 text-sm border transition " + (filter === t ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}
        onclick={() => (filter = t)}
      >
        {t}
      </button>
    {/each}
  </div>

  <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each (filter === "All" ? reviews : reviews.filter((r) => r.tag === filter)) as r (r.name + r.text)}
      <article class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="flex items-start justify-between gap-4">
          <div class="text-sm font-semibold text-slate-900">{r.name}</div>
          <div class="text-xs text-amber-600">{stars(r.rating)}</div>
        </div>
        <div class="mt-2 text-xs text-slate-500">{r.tag}</div>
        <p class="mt-3 text-sm text-slate-600 leading-relaxed">{r.text}</p>
      </article>
    {/each}
  </div>

  <div class="mt-10 rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <div class="text-sm font-semibold text-slate-900">Want to book a visit?</div>
      <div class="text-sm text-slate-600">Request an appointment and we’ll confirm quickly.</div>
    </div>
    <a class="mt-3 sm:mt-0 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700" href="/book">
      Book appointment
    </a>
  </div>
</PageShell>
f