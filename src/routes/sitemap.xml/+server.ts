/**
 * Sitemap.xml Generator
 *
 * WHAT IS A SITEMAP?
 * A sitemap is an XML file that lists all pages on your website.
 * Search engines use it to discover and index your pages.
 *
 * WHY DO WE NEED IT?
 * - Helps Google find all your pages
 * - Tells Google when pages were last updated
 * - Indicates which pages are most important
 *
 * HOW IT WORKS IN SVELTEKIT:
 * - +server.ts files create API endpoints
 * - The route path becomes the URL (sitemap.xml/+server.ts → /sitemap.xml)
 * - GET function handles HTTP GET requests
 * - We return XML with the correct content-type header
 */

import type { RequestHandler } from './$types';

// Base URL of your website (change this in production)
const BASE_URL = 'https://pearldental.com';

// List of all pages on the site
// In a larger site, you might generate this dynamically from your routes
const pages = [
	{ url: '/', priority: 1.0, changefreq: 'weekly' },
	{ url: '/services', priority: 0.9, changefreq: 'weekly' },
	{ url: '/pricing', priority: 0.8, changefreq: 'monthly' },
	{ url: '/team', priority: 0.7, changefreq: 'monthly' },
	{ url: '/reviews', priority: 0.7, changefreq: 'weekly' },
	{ url: '/contact', priority: 0.8, changefreq: 'monthly' },
	{ url: '/book', priority: 0.9, changefreq: 'weekly' }
];

/**
 * GET handler - returns the sitemap XML
 *
 * SITEMAP XML FORMAT:
 * <?xml version="1.0" encoding="UTF-8"?>
 * <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 *   <url>
 *     <loc>https://example.com/page</loc>      <!-- The page URL -->
 *     <lastmod>2024-01-15</lastmod>            <!-- Last modified date -->
 *     <changefreq>weekly</changefreq>          <!-- How often it changes -->
 *     <priority>0.8</priority>                 <!-- Importance (0.0-1.0) -->
 *   </url>
 * </urlset>
 */
export const GET: RequestHandler = async () => {
	// Get today's date in YYYY-MM-DD format for lastmod
	const today = new Date().toISOString().split('T')[0];

	// Build the XML string
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	// Return the XML with the correct content-type
	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			// Cache for 1 day (86400 seconds)
			'Cache-Control': 'max-age=86400'
		}
	});
};
