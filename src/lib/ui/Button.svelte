<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/ui/cn";

  type Variant = "primary" | "secondary" | "outline" | "ghost";
  type Size = "sm" | "md" | "lg";

  type Props = {
    href?: string;
    target?: string;
    rel?: string;

    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;

    variant?: Variant;
    size?: Size;

    class?: string;
    ariaLabel?: string;

    onclick?: (e: MouseEvent) => void;
    children?: Snippet;
    iconLeft?: Snippet;
    iconRight?: Snippet;
  };

  let {
    href,
    target,
    rel,
    type = "button",
    disabled = false,
    loading = false,
    variant = "primary",
    size = "md",
    class: className = "",
    ariaLabel,
    onclick,
    children,
    iconLeft,
    iconRight
  }: Props = $props();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-normal ease-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 " +
      "shadow-sm hover:shadow-md",
    secondary:
      "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:bg-neutral-300 " +
      "border border-neutral-200",
    outline:
      "bg-transparent text-neutral-800 border-2 border-neutral-300 " +
      "hover:border-primary-500 hover:text-primary-700 active:bg-primary-50",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200"
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };

  // Icon sizing matches button size
  const iconSizes: Record<Size, string> = {
    sm: "[&>svg]:size-4",
    md: "[&>svg]:size-5",
    lg: "[&>svg]:size-5"
  };

  let isDisabled = $derived(disabled || loading);

  let classes = $derived(
    cn(
      base,
      variants[variant],
      sizes[size],
      iconSizes[size],
      isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
      loading && "relative",
      className
    )
  );

  let safeRel = $derived(target === "_blank" ? (rel ?? "noreferrer") : rel);

  function handleAnchorClick(e: MouseEvent) {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onclick?.(e);
  }
</script>

{#snippet spinner()}
  <svg
    class="animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
{/snippet}

{#snippet buttonContent()}
  {#if loading}
    {@render spinner()}
    <span class="sr-only">Loading...</span>
  {/if}
  {#if iconLeft && !loading}
    <span class="shrink-0" aria-hidden="true">{@render iconLeft()}</span>
  {/if}
  <span class={loading ? "opacity-0" : ""}>{@render children?.()}</span>
  {#if iconRight && !loading}
    <span class="shrink-0" aria-hidden="true">{@render iconRight()}</span>
  {/if}
{/snippet}

{#if href}
  <a
    class={classes}
    href={isDisabled ? undefined : href}
    target={target}
    rel={safeRel}
    aria-label={ariaLabel}
    aria-disabled={isDisabled}
    aria-busy={loading}
    tabindex={isDisabled ? -1 : undefined}
    onclick={handleAnchorClick}
  >
    {@render buttonContent()}
  </a>
{:else}
  <button
    class={classes}
    {type}
    disabled={isDisabled}
    aria-label={ariaLabel}
    aria-busy={loading}
    onclick={onclick}
  >
    {@render buttonContent()}
  </button>
{/if}
