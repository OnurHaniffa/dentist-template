<script lang="ts">
  import PageShell from "$lib/components/PageShell.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";

  const pricing = [
    { item: "New patient exam + x-ray consult", price: "₺1,250" },
    { item: "Check-up & cleaning", price: "₺1,250+" },
    { item: "Whitening", price: "₺2,900+" },
    { item: "Filling (composite)", price: "₺1,400+" },
    { item: "Emergency consult", price: "₺1,000+" }
  ];
</script>

<svelte:head>
  <title>Pricing — Pearl Dental Studio</title>
  <meta name="description" content="Transparent pricing guidance, insurance information, and payment options for common dental treatments." />
</svelte:head>

<PageShell>
  <PageHeader
    title="Pricing"
    subtitle="Transparent guidance. Final pricing depends on your exam and treatment plan."
  />

  <div class="mt-10 grid gap-4 lg:grid-cols-3">
    <div class="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
      <div class="text-sm font-semibold text-slate-900">Common treatments</div>
      <div class="mt-4 divide-y divide-slate-200">
        {#each pricing as row (row.item)}
          <div class="py-4 flex items-center justify-between gap-6">
            <div class="text-sm text-slate-700">{row.item}</div>
            <div class="text-sm font-semibold text-slate-900 whitespace-nowrap">{row.price}</div>
          </div>
        {/each}
      </div>

      <p class="mt-4 text-xs text-slate-500">
        Prices shown are estimates. We’ll confirm everything before any treatment begins.
      </p>
    </div>

    <aside class="rounded-2xl border border-slate-200 bg-white p-6">
      <div class="text-sm font-semibold text-slate-900">Insurance & payments</div>
      <ul class="mt-3 grid gap-2 text-sm text-slate-600">
        <li>• Itemized invoices available</li>
        <li>• Card / bank transfer accepted</li>
        <li>• Payment plans (case-based)</li>
      </ul>

      <div class="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4">
        <div class="text-sm font-semibold text-slate-900">Want an estimate?</div>
        <div class="mt-1 text-sm text-slate-600">
          Book a consult and we’ll give clear options with pros/cons.
        </div>
        <a class="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800" href="/book">
          Book consult
        </a>
      </div>
    </aside>
  </div>
</PageShell>
