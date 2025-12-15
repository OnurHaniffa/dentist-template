<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { browser } from "$app/environment";
  import Container from "$lib/components/Container.svelte";
  import { site } from "$lib/content/site";
  import { cn } from "$lib/ui/cn";

  let open = $state(false);

  function close() {
    open = false;
  }

  $effect(() => {
    if (!browser) return;

    document.documentElement.style.overflow = open ? "hidden" : "";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (open) window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  });
</script>

<header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
  <Container class="h-16 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <div class="h-9 w-9 rounded-xl bg-sky-600 text-white grid place-items-center font-semibold">P</div>
      <div class="leading-tight">
        <div class="text-sm font-semibold text-slate-900">{site.name}</div>
        <div class="text-xs text-slate-500 hidden sm:block">{site.tagline}</div>
      </div>
    </a>

    <nav class="hidden md:flex items-center gap-7">
      {#each site.nav as item (item.href)}
        <a class="text-sm text-slate-700 hover:text-slate-900" href={item.href}>
          {item.label}
        </a>
      {/each}
    </nav>

    <div class="hidden md:flex items-center gap-3">
      <a class="text-sm text-slate-700 hover:text-slate-900" href={"tel:" + site.phone}>
        {site.phone}
      </a>

      <a
        class="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
        href={site.cta.href}
      >
        {site.cta.label}
      </a>
    </div>

    <button
      class={cn(
        "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200",
        "hover:bg-slate-50"
      )}
      aria-label="Open menu"
      aria-expanded={open}
      onclick={() => (open = !open)}
    >
      <span class="text-lg">☰</span>
    </button>
  </Container>

  {#if open}
    <div class="fixed inset-0 z-50 md:hidden">
<button
  type="button"
  class="absolute inset-0 bg-slate-900/40"
  aria-label="Close menu"
  onclick={close}
  in:fade
  out:fade
></button>


      <aside
        class="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl border-l border-slate-200 p-5"
        in:fly={{ x: 24, duration: 180 }}
        out:fly={{ x: 24, duration: 140 }}
      >
        <div class="flex items-center justify-between">
          <div class="font-semibold text-slate-900">Menu</div>
          <button class="h-10 w-10 rounded-xl hover:bg-slate-100" aria-label="Close menu" onclick={close}>
            ✕
          </button>
        </div>

        <div class="mt-5 grid gap-2">
          {#each site.nav as item (item.href)}
            <a
              class="rounded-xl px-3 py-2 text-slate-800 hover:bg-slate-100"
              href={item.href}
              onclick={close}
            >
              {item.label}
            </a>
          {/each}
        </div>

        <div class="mt-6 border-t border-slate-200 pt-4 grid gap-3">
          <a class="text-sm text-slate-700" href={"tel:" + site.phone}>{site.phone}</a>
          <a class="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800"
             href={site.cta.href}
             onclick={close}
          >
            {site.cta.label}
          </a>
        </div>
      </aside>
    </div>
  {/if}
</header>
