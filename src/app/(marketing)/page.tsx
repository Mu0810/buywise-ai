import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/config/site";
import { Comparison } from "@/features/marketing/components/comparison";
import { CtaBand } from "@/features/marketing/components/cta-band";
import { Faq } from "@/features/marketing/components/faq";
import { FeaturesShowcase } from "@/features/marketing/components/features-showcase";
import { Hero } from "@/features/marketing/components/hero";
import { HowItWorks } from "@/features/marketing/components/how-it-works";
import { Pricing } from "@/features/marketing/components/pricing";
import { Testimonials } from "@/features/marketing/components/testimonials";

export default function LandingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/icon`,
          description: siteConfig.description,
          sameAs: [siteConfig.links.twitter, siteConfig.links.github],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteConfig.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Hero />
      <FeaturesShowcase />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <Pricing />
      <Faq />
      <CtaBand />
    </>
  );
}
