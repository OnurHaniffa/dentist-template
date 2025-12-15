<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import { site } from "$lib/content/site";
</script>

<footer class="border-t border-slate-200 bg-white">
  <Container class="py-10 grid gap-8 md:grid-cols-3">
    <div class="grid gap-2">
      <div class="text-sm font-semibold text-slate-900">{site.name}</div>
      <p class="text-sm text-slate-600 max-w-sm">
        Calm, modern dental care with a focus on comfort, clarity, and long-term health.
      </p>
    </div>

    <div class="grid gap-2">
      <div class="text-sm font-semibold text-slate-900">Contact</div>
      <a class="text-sm text-slate-700 hover:text-slate-900" href={"tel:" + site.phone}>{site.phone}</a>
      <a class="text-sm text-slate-700 hover:text-slate-900" href={"mailto:" + site.email}>{site.email}</a>
      <div class="text-sm text-slate-600">
        {site.addressLines[0]}<br />
        {site.addressLines[1]}
      </div>
    </div>

    <div class="grid gap-2">
      <div class="text-sm font-semibold text-slate-900">Hours</div>
      {#each site.hours as h (h.day)}
        <div class="flex items-center justify-between text-sm text-slate-700">
          <span>{h.day}</span>
          <span class="text-slate-600">{h.time}</span>
        </div>
      {/each}
    </div>

    <div class="md:col-span-3 pt-6 border-t border-slate-200 text-xs text-slate-500">
      © {new Date().getFullYear()} {site.name}. All rights reserved.
    </div>
  </Container>
</footer>
