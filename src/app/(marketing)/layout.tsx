import type { ReactNode } from "react";

import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/config/site";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon`,
  description: siteConfig.description,
  sameAs: [siteConfig.links.twitter, siteConfig.links.github],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  // Enables a Google sitelinks search box that queries the app's search page.
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
