import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import WidgetsGrid from "@/components/home/WidgetsGrid";
import AdSlot from "@/components/ads/AdSlot";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://sewait.up.railway.app/#website',
        'url': 'https://sewait.up.railway.app',
        'name': 'SewaIT',
        'alternateName': ['SewaIT', 'Sewa IT'],
        'description': 'Digital Utility Platform for Nepalis',
        'publisher': {
          '@id': 'https://sewait.up.railway.app/#organization'
        },
        'inLanguage': 'ne-NP'
      },
      {
        '@type': 'Organization',
        '@id': 'https://sewait.up.railway.app/#organization',
        'name': 'SewaIT',
        'url': 'https://sewait.up.railway.app',
        'logo': 'https://sewait.up.railway.app/web-app-manifest-512x512.png',
        'founder': {
          '@type': 'Person',
          '@id': 'https://sewait.up.railway.app/#founder',
          'name': 'Debin C. Rai',
          'jobTitle': 'SewaIT Founder',
        },
        'sameAs': [
          'https://facebook.com/SewaIT',
          'https://twitter.com/SewaIT'
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <div className="container mx-auto px-4 lg:px-10 py-16">
        <AdSlot position="HOME_HERO" className="mb-12 aspect-[3/1] md:aspect-[3/1] lg:aspect-[3/1]" />
        <ServicesGrid />
        <WidgetsGrid />

        <AdSlot position="HOME_FOOTER" className="mt-16 aspect-[6/1] w-full" />
      </div>
    </div>
  );
}
