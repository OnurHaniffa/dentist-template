<script lang="ts">
  import PageShell from "$lib/components/PageShell.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import { site } from "$lib/content/site";
</script>

<svelte:head>
  <title>Contact — Pearl Dental Studio</title>
  <meta name="description" content="Contact our clinic, view opening hours, and find directions. Call, email, or request an appointment." />
</svelte:head>

<PageShell>
  <PageHeader
    title="Contact"
    subtitle="Fastest ways to reach us — call, email, or request an appointment online."
  />

  <div class="mt-10 grid gap-4 lg:grid-cols-3">
    <div class="rounded-2xl border border-slate-200 bg-white p-6 grid gap-4">
      <div>
        <div class="text-sm font-semibold text-slate-900">Call</div>
        <a class="text-sm text-slate-700 hover:text-slate-900" href={"tel:" + site.phone}>{site.phone}</a>
      </div>

      <div>
        <div class="text-sm font-semibold text-slate-900">Email</div>
        <a class="text-sm text-slate-700 hover:text-slate-900" href={"mailto:" + site.email}>{site.email}</a>
      </div>

      <div>
        <div class="text-sm font-semibold text-slate-900">Address</div>
        <div class="text-sm text-slate-600">
          {site.addressLines[0]}<br />
          {site.addressLines[1]}
        </div>
      </div>

      <a class="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 w-fit" href="/book">
        Request appointment
      </a>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
      <div class="text-sm font-semibold text-slate-900">Opening hours</div>
      <div class="mt-4 grid gap-2">
        {#each site.hours as h (h.day)}
          <div class="flex items-center justify-between text-sm text-slate-700">
            <span>{h.day}</span>
            <span class="text-slate-600">{h.time}</span>
          </div>
        {/each}
      </div>

      <div class="mt-6 rounded-2xl bg-slate-100 border border-slate-200 aspect-[16/7] grid place-items-center text-slate-500 text-sm">
        Google Map embed placeholder
      </div>

      <div class="mt-4 flex flex-wrap gap-3">
        <a class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-slate-50" href="https://maps.google.com" target="_blank" rel="noreferrer">
          Get directions
        </a>
        <a class="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700" href="/book">
          Book online
        </a>
      </div>
    </div>
  </div>
</PageShell>
