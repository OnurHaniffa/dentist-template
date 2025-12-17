/**
 * Robots.txt Generator
 *
 * WHAT IS ROBOTS.TXT?
 * A text file that tells search engine crawlers (bots) which pages
 * they're allowed to access on your site.
 *
 * WHY DO WE NEED IT?
 * - Control what search engines index
 * - Block private/admin pages from appearing in search results
 * - Point crawlers to your sitemap
 *
 * COMMON DIRECTIVES:
 * - User-agent: Which bot this applies to (* = all bots)
 * - Allow: Pages the bot CAN access
 * - Disallow: Pages the bot CANNOT access
 * - Sitemap: Location of your sitemap
 *
 * EXAMPLE:
 * User-agent: *        # Applies to all bots
 * Allow: /             # Allow access to everything
 * Disallow: /admin     # Block the /admin folder
 * Sitemap: https://example.com/sitemap.xml
 *
 * NOTE: robots.txt is advisory, not enforced. Malicious bots may ignore it.
 * Don't use it for security - use authentication instead.
 */

import type { RequestHandler } from './$types';

// Base URL of your website
const BASE_URL = 'https://pearldental.com';

export const GET: RequestHandler = async () => {
	// The robots.txt content
	const robotsTxt = `# Robots.txt for Pearl Dental Studio
# Learn more: https://developers.google.com/search/docs/crawling-indexing/robots/intro

# Allow all search engines to crawl everything
User-agent: *
Allow: /

# Point to the sitemap
Sitemap: ${BASE_URL}/sitemap.xml
`;

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
			// Cache for 1 day
			'Cache-Control': 'max-age=86400'
		}
	});
};
