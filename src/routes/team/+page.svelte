<script lang="ts">
  import PageShell from "$lib/components/PageShell.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";

  const team = [
    {
      name: "Dr. Aylin Kaya",
      role: "Cosmetic & restorative dentistry",
      bio: "Comfort-focused care with clear, evidence-based treatment planning."
    },
    {
      name: "Dr. Emre Demir",
      role: "Implants & surgery",
      bio: "Planning-led implant care with modern imaging and long-term outcomes in mind."
    },
    {
      name: "Zeynep Yılmaz",
      role: "Hygienist",
      bio: "Gentle hygiene sessions and prevention coaching that fits your lifestyle."
    }
  ];
</script>

<svelte:head>
  <title>Team — Pearl Dental Studio</title>
  <meta name="description" content="Meet our dentists and staff, and learn about our approach to calm, modern dental care." />
</svelte:head>

<PageShell>
  <PageHeader
    title="Team"
    subtitle="A calm clinic experience starts with people who listen, explain, and care."
  />

  <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each team as p (p.name)}
      <article class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="aspect-[4/3] rounded-xl bg-slate-100 grid place-items-center text-slate-500 text-sm">
          Photo
        </div>
        <div class="mt-4">
          <div class="text-sm font-semibold text-slate-900">{p.name}</div>
          <div class="text-sm text-slate-600 mt-1">{p.role}</div>
          <p class="text-sm text-slate-600 mt-3 leading-relaxed">{p.bio}</p>
        </div>
      </article>
    {/each}
  </div>
</PageShell>
