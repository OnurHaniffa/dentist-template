<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/ui/cn";

  type Tone = "surface" | "muted" | "primary";
  type Padding = "none" | "sm" | "md" | "lg";

  type Props = {
    tone?: Tone;
    padding?: Padding;
    hover?: boolean;
    href?: string;
    target?: string;
    rel?: string;
    class?: string;
    children?: Snippet;
  };

  let {
    tone = "surface",
    padding = "md",
    hover = false,
    href,
    target,
    rel,
    class: className,
    children
  }: Props = $props();

  const tones: Record<Tone, string> = {
    surface: "bg-white border border-neutral-200",
    muted: "bg-neutral-50 border border-neutral-200",
    primary: "bg-primary-50 border border-primary-200"
  };

  const paddings: Record<Padding, string> = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6 sm:p-8"
  };

  const base = "rounded-2xl shadow-sm";

  const hoverStyles =
    "transition-all duration-normal ease-out " +
    "hover:shadow-md hover:-translate-y-1 " +
    "motion-reduce:hover:transform-none";

  const clickableStyles =
    "cursor-pointer " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50";

  let isClickable = $derived(!!href);

  let classes = $derived(
    cn(
      base,
      tones[tone],
      paddings[padding],
      (hover || isClickable) && hoverStyles,
      isClickable && clickableStyles,
      className
    )
  );

  let safeRel = $derived(target === "_blank" ? (rel ?? "noreferrer") : rel);
</script>

{#if href}
  <a class={classes} {href} {target} rel={safeRel}>
    {@render children?.()}
  </a>
{:else}
  <div class={classes}>
    {@render children?.()}
  </div>
{/if}
