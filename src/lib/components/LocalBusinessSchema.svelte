<script lang="ts">
	import { site } from '$lib/content/site';

	/**
	 * LocalBusinessSchema Component
	 *
	 * This adds JSON-LD structured data to help search engines understand
	 * your business. It tells Google:
	 * - What type of business this is (Dentist)
	 * - Where it's located
	 * - When it's open
	 * - How to contact it
	 *
	 * WHAT IS JSON-LD?
	 * - JSON-LD = "JSON for Linking Data"
	 * - It's a script tag containing structured data that search engines read
	 * - Users never see it, but Google uses it to show rich results
	 *
	 * WHAT ARE RICH RESULTS?
	 * When you search for a business on Google, you might see:
	 * - Star ratings
	 * - Opening hours ("Open now")
	 * - Phone number
	 * - Address with map link
	 * These come from structured data like this!
	 *
	 * SCHEMA.ORG
	 * - Schema.org defines standard vocabularies for structured data
	 * - "Dentist" is a type defined at https://schema.org/Dentist
	 * - Google, Bing, Yahoo all understand schema.org markup
	 */

	// Build the structured data object following schema.org spec
	// This follows the "Dentist" type: https://schema.org/Dentist
	const schema = {
		// @context tells parsers we're using schema.org vocabulary
		'@context': 'https://schema.org',

		// @type specifies what kind of thing this is
		// "Dentist" inherits from LocalBusiness, MedicalBusiness, etc.
		'@type': 'Dentist',

		// Basic business information
		name: site.name,
		description: site.tagline,

		// URL of the website
		url: 'https://pearldental.com',

		// Logo image (would be actual URL in production)
		logo: 'https://pearldental.com/logo.png',

		// Contact information
		telephone: site.phone,
		email: site.email,

		// Physical address using PostalAddress type
		address: {
			'@type': 'PostalAddress',
			streetAddress: site.addressLines[0],
			addressLocality: 'Kadıköy',
			addressRegion: 'İstanbul',
			postalCode: '34710',
			addressCountry: 'TR'
		},

		// Geographic coordinates (approximate for Kadıköy, Istanbul)
		// These help Google Maps show your location
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 40.9819,
			longitude: 29.0573
		},

		// Opening hours in ISO 8601 format
		// OpeningHoursSpecification lets you define hours per day
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '09:00',
				closes: '18:30'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Saturday',
				opens: '10:00',
				closes: '15:00'
			}
		],

		// Services offered (helps Google understand what you do)
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Dental Services',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Dental Check-up & Cleaning'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Teeth Whitening'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Invisalign'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Dental Implants'
					}
				}
			]
		},

		// Price range indicator ($ to $$$$)
		priceRange: '$$',

		// Aggregate rating (would come from real reviews in production)
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '150',
			bestRating: '5',
			worstRating: '1'
		},

		// Social media profiles
		sameAs: [
			'https://instagram.com/pearldentalstudio',
			'https://facebook.com/pearldentalstudio',
			'https://linkedin.com/company/pearldentalstudio'
		]
	};

	// Create the script tag content as a string for @html rendering
	// The closing script tag needs to be escaped to prevent Svelte from parsing it
	const closingTag = '</scr' + 'ipt>';
	const scriptContent = `<script type="application/ld+json">${JSON.stringify(schema)}${closingTag}`;
</script>

<!--
  The JSON-LD script tag
  - type="application/ld+json" tells the browser this is structured data
  - {@html ...} is Svelte's way to output raw HTML/JSON
  - JSON.stringify with (null, 2) makes it readable (optional, can remove spaces in production)
-->
<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- Safe: content is from static schema object, not user input -->
	{@html scriptContent}
</svelte:head>
