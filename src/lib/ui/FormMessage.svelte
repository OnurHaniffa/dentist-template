<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/ui/cn";

  type Tone = "error" | "success" | "warning" | "info";

  type Props = {
    tone?: Tone;
    class?: string;
    children?: Snippet;
  };

  let {
    tone = "info",
    class: className,
    children
  }: Props = $props();

  const base = "rounded-xl border px-4 py-3 text-sm";

  const tones: Record<Tone, string> = {
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-sage-200 bg-sage-50 text-sage-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    info: "border-sky-200 bg-sky-50 text-sky-800"
  };

  let classes = $derived(cn(base, tones[tone], className));
</script>

<div class={classes} role={tone === "error" ? "alert" : "status"}>
  {@render children?.()}
</div>
