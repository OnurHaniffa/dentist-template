<script lang="ts">
  let { title, subtitle, children } = $props<{
    title: string;
    subtitle?: string;
    children?: any; // optional extra content (buttons etc.)
  }>();
</script>

<header class="grid gap-3">
  <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
    {title}
  </h1>

  {#if subtitle}
    <p class="text-slate-600 max-w-2xl leading-relaxed">
      {subtitle}
    </p>
  {/if}

  {#if children}
    <div class="pt-2">
      {@render children?.()}
    </div>
  {/if}
</header>
