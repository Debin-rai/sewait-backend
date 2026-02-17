import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import WidgetsGrid from "@/components/home/WidgetsGrid";
import TasksSection from "@/components/home/TasksSection";
import AdSlot from "@/components/ads/AdSlot";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://sewait.com.np/#website',
        'url': 'https://sewait.com.np',
        'name': 'SewaIT',
        'description': 'Digital Utility Platform for Nepalis',
        'publisher': {
          '@id': 'https://sewait.com.np/#organization'
        },
        'inLanguage': 'ne-NP'
      },
      {
        '@type': 'Organization',
        '@id': 'https://sewait.com.np/#organization',
        'name': 'SewaIT',
        'url': 'https://sewait.com.np',
        'logo': 'https://sewait.com.np/assets/images/Logo.jpg',
        'founder': {
          '@type': 'Person',
          'name': 'Debin Rai',
          'url': 'https://sewait.com.np/about'
        },
        'sameAs': [
          'https://facebook.com/sewait',
          'https://twitter.com/sewait'
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
        <AdSlot position="HOME_HERO" className="mb-12 h-[200px] md:h-[400px]" />
        <ServicesGrid />
        <WidgetsGrid />
        <div className="mt-8">
          <TasksSection />
        </div>
      </div>
    </div>
  );
}
