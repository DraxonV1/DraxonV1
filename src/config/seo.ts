import content from '@/config/content.json';

export const siteConfig = {
  name: 'Draxon',
  handle: 'DraxonV1',
  domain: 'https://draxon.asia',
  title: 'Draxon - Minecraft Mod Developer & Reviewer',
  description: 'Portfolio of DraxonV1: Minecraft mod developer specializing in Fabric 1.21+, texture pack reviewer, and YouTube content creator showcasing custom mods and in-depth reviews.',
  keywords: [
    'Minecraft mods',
    'Fabric mods',
    'Minecraft 1.21',
    'mod developer',
    'texture pack reviews',
    'Minecraft YouTube',
    'DraxonV1',
    'custom mods',
    'mod reviews',
    'Modrinth',
    'CurseForge'
  ],
  creator: 'DraxonV1',
  
  social: {
    youtube: content.contact.socials.youtube,
    github: content.contact.socials.github,
    modrinth: content.contact.socials.modrinth,
    curseforge: content.contact.socials.curseforge,
    discord: content.contact.socials.discord,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Draxon.asia',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Draxon - Minecraft Mod Developer Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    creator: '@DraxonV1',
  },
};

export const generateMetadata = () => ({
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.domain),
  
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.openGraph.siteName,
    images: siteConfig.openGraph.images,
    locale: siteConfig.openGraph.locale,
    type: siteConfig.openGraph.type,
  },
  
  twitter: {
    card: siteConfig.twitter.card,
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter.creator,
    images: siteConfig.openGraph.images,
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'W9Qw1PmMb--vevj7hX-No2CXaxMO5toK98XieMcyK9g',
    // Add other verification codes as needed
  },
});

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  alternateName: [siteConfig.handle, 'DraxonV1'],
  url: siteConfig.domain,
  image: `${siteConfig.domain}/logo.png`,
  description: siteConfig.description,
  sameAs: [
    siteConfig.social.youtube,
    siteConfig.social.github,
    siteConfig.social.modrinth,
    siteConfig.social.curseforge,
  ],
  jobTitle: 'Minecraft Mod Developer',
  knowsAbout: ['Minecraft Modding', 'Fabric API', 'Java Programming', 'Game Development', 'Texture Pack Reviews'],
  worksFor: {
    '@type': 'Organization',
    name: 'Draxon Dev'
  }
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.title,
  url: siteConfig.domain,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.domain}/#mods?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faq.questions.map(q => ({
    '@type': 'Question',
    name: q.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.a
    }
  }))
};
