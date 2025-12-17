<script lang="ts">
	import { site } from '$lib/content/site';

	/**
	 * SEO Component
	 *
	 * This component manages all the meta tags that help search engines
	 * and social media understand your page. It goes in the <head> of your HTML.
	 *
	 * CONCEPTS:
	 * - title: Shows in browser tab and Google search results
	 * - description: The snippet text shown below the title in search results
	 * - Open Graph (og:): How your page looks when shared on Facebook/LinkedIn
	 * - Twitter Card: How your page looks when shared on Twitter/X
	 * - canonical: The "official" URL of this page (prevents duplicate content issues)
	 */

	interface Props {
		/** Page title - shown in browser tab and search results */
		title?: string;
		/** Page description - shown as snippet in search results (keep under 160 chars) */
		description?: string;
		/** Canonical URL - the official URL of this page */
		canonical?: string;
		/** Open Graph image for social sharing (1200x630px recommended) */
		image?: string;
		/** Page type for Open Graph (website, article, etc.) */
		type?: 'website' | 'article' | 'profile';
		/** Set to true to prevent search engines from indexing this page */
		noindex?: boolean;
	}

	let {
		title = site.name,
		description = site.tagline,
		canonical,
		image = '/og-image.jpg', // Default social sharing image
		type = 'website',
		noindex = false
	}: Props = $props();

	// Base URL for the site (would be set to actual domain in production)
	const baseUrl = 'https://pearldental.com';

	// Use $derived() for values computed from props
	// $derived() is Svelte 5's way to create reactive computed values
	// These will update if props change (though SEO props typically don't)

	// Create the full title with site name suffix
	// e.g., "Services | Pearl Dental Studio"
	const fullTitle = $derived(title === site.name ? title : `${title} | ${site.name}`);

	// Build canonical URL from the path
	const canonicalUrl = $derived(canonical ? `${baseUrl}${canonical}` : undefined);

	// Build full image URL
	const imageUrl = $derived(image.startsWith('http') ? image : `${baseUrl}${image}`);
</script>

<!--
  svelte:head allows us to add elements to the <head> of the HTML document.
  This is where meta tags, title, and other SEO elements go.
-->
<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="description" content={description} />

	<!-- Robots directive: tells search engines whether to index this page -->
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<!-- Canonical URL: prevents duplicate content issues -->
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	<!--
    Open Graph Protocol (og:)
    These tags control how your page appears when shared on Facebook, LinkedIn, etc.
    When someone shares your link, these determine the preview card.
  -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:site_name" content={site.name} />
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}

	<!--
    Twitter Card Tags
    Similar to Open Graph, but specifically for Twitter/X.
    "summary_large_image" shows a large preview image.
  -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	<!--
    Additional useful meta tags
  -->
	<meta name="theme-color" content="#0A7558" />
	<!-- Primary brand color for browser UI -->
</svelte:head>
