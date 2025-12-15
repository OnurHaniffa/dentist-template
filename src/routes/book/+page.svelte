<script lang="ts">
  import PageShell from "$lib/components/PageShell.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import { site } from "$lib/content/site";

  let name = $state("");
  let phone = $state("");
  let email = $state("");
  let reason = $state("Check-up");
  let message = $state("");
  let consent = $state(false);

  let error = $state<string | null>(null);
  let success = $state(false);

  function validate() {
    if (!name.trim()) return "Please enter your name.";
    if (!phone.trim()) return "Please enter your phone number.";
    if (!consent) return "Please confirm consent so we can contact you.";
    return null;
  }

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    error = validate();
    if (error) return;

    // For now: simulate success.
    // Next step: we wire a real SvelteKit server action in +page.server.ts.
    success = true;
  }
</script>

<svelte:head>
  <title>Book appointment — Pearl Dental Studio</title>
  <meta name="description" content="Request an appointment online. We’ll confirm by phone or email." />
</svelte:head>

<PageShell>
  <PageHeader
    title="Book appointment"
    subtitle="This is an appointment request — we’ll confirm your time by phone or email."
  />

  <div class="mt-10 grid gap-4 lg:grid-cols-3">
    <form class="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2" onsubmit={onSubmit}>
      {#if error}
        <div class="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      {/if}

      {#if success}
        <div class="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Request received. We’ll contact you shortly.
        </div>
      {/if}

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="grid gap-2">
          <label class="text-sm font-medium text-slate-900" for="name">Full name</label>
          <input id="name" class="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            value={name} oninput={(e) => (name = (e.currentTarget as HTMLInputElement).value)} />
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-medium text-slate-900" for="phone">Phone</label>
          <input id="phone" class="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            value={phone} oninput={(e) => (phone = (e.currentTarget as HTMLInputElement).value)} />
        </div>

        <div class="grid gap-2 sm:col-span-2">
          <label class="text-sm font-medium text-slate-900" for="email">Email (optional)</label>
          <input id="email" type="email" class="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            value={email} oninput={(e) => (email = (e.currentTarget as HTMLInputElement).value)} />
        </div>

        <div class="grid gap-2 sm:col-span-2">
          <label class="text-sm font-medium text-slate-900" for="reason">Reason</label>
          <select
            id="reason"
            class="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            value={reason}
            onchange={(e) => (reason = (e.currentTarget as HTMLSelectElement).value)}
          >
            <option>Check-up</option>
            <option>Cleaning</option>
            <option>Whitening</option>
            <option>Invisalign consult</option>
            <option>Emergency</option>
            <option>Other</option>
          </select>
        </div>

        <div class="grid gap-2 sm:col-span-2">
          <label class="text-sm font-medium text-slate-900" for="message">Notes (optional)</label>
          <textarea
  id="message"
  class="min-h-28 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-400"
  value={message}
  oninput={(e) => (message = (e.currentTarget as HTMLTextAreaElement).value)}
></textarea>

        </div>

        <label class="sm:col-span-2 flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            class="mt-1 h-4 w-4 rounded border-slate-300"
            checked={consent}
            onchange={(e) => (consent = (e.currentTarget as HTMLInputElement).checked)}
          />
          <span>
            I consent to being contacted about this request.
          </span>
        </label>

        <div class="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
          <button type="submit" class="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800">
            Send request
          </button>
          <a class="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium hover:bg-slate-50" href={"tel:" + site.phone}>
            Call instead
          </a>
        </div>

        <p class="sm:col-span-2 text-xs text-slate-500">
          Next step: we will connect this form to a server action and send an email / store to a database.
        </p>
      </div>
    </form>

    <aside class="rounded-2xl border border-slate-200 bg-white p-6 h-fit">
      <div class="text-sm font-semibold text-slate-900">Prefer to call?</div>
      <p class="mt-2 text-sm text-slate-600">
        We’re happy to help you book by phone.
      </p>
      <a class="mt-4 inline-flex rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700" href={"tel:" + site.phone}>
        Call {site.phone}
      </a>

      <div class="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4">
        <div class="text-sm font-semibold text-slate-900">What to expect</div>
        <ul class="mt-2 grid gap-2 text-sm text-slate-600">
          <li>• Quick confirmation</li>
          <li>• Clear pricing before treatment</li>
          <li>• Comfort-first approach</li>
        </ul>
      </div>
    </aside>
  </div>
</PageShell>
