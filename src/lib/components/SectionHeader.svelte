<script lang="ts">
  import { cn } from "$lib/ui/cn";

  type Align = "left" | "center";

  type Props = {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: Align;
    class?: string;
  };

  let {
    eyebrow,
    title,
    subtitle,
    align = "left",
    class: className
  }: Props = $props();

  const alignments: Record<Align, string> = {
    left: "text-left",
    center: "text-center mx-auto"
  };

  let containerClasses = $derived(
    cn(
      "max-w-2xl",
      alignments[align],
      className
    )
  );
</script>

<header class={containerClasses}>
  {#if eyebrow}
    <p class="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-2">
      {eyebrow}
    </p>
  {/if}

  <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
    {title}
  </h2>

  {#if subtitle}
    <p class="mt-2 text-base text-neutral-600 leading-relaxed">
      {subtitle}
    </p>
  {/if}
</header>
