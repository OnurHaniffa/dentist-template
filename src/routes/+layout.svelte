<script lang="ts">
  import "./layout.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<div class="min-h-screen bg-white text-slate-900 antialiased">
  <Navbar />
  <main class="bg-slate-50">
    {@render children()}
  </main>
  <Footer />
</div>
