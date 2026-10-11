import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SITE_URL = 'https://xova.pro';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function SEO({ title, description, canonical, ogImage, noindex = false, structuredData }: SEOProps) {
  const location = useLocation();
  const currentUrl = `${SITE_URL}${location.pathname}`;
  const fullTitle = `${title} | TOM - AI Agent Runtime`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:url', currentUrl, 'property');
    updateMeta('og:image', ogImage || DEFAULT_OG_IMAGE, 'property');
    updateMeta('og:type', 'website', 'property');
    updateMeta('og:site_name', 'TOM', 'property');

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage || DEFAULT_OG_IMAGE);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || currentUrl);

    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"][data-page-structured-data]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-page-structured-data', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else {
      const script = document.querySelector('script[type="application/ld+json"][data-page-structured-data]');
      if (script) script.remove();
    }

    // Cleanup on unmount
    return () => {
      const script = document.querySelector('script[type="application/ld+json"][data-page-structured-data]');
      if (script) script.remove();
    };
  }, [fullTitle, description, currentUrl, ogImage, noindex, structuredData, canonical]);

  return null;
}

// Predefined structured data generators
export function OrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TOM',
    alternateName: 'Task-Oriented Multimodal Agent Runtime',
    url: SITE_URL,
    logo: `${SITE_URL}/wolf-logo.png`,
    description: 'Open-source AI agent runtime with planning, tools, browser automation, Android control, voice, and verification.',
    sameAs: [
      'https://github.com/Raghav509/TOM'
    ]
  };
}

export function SoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TOM',
    operatingSystem: 'Cross-platform',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: 'Open-source AI agent runtime with planning, tools, browser automation, Android control, voice, and verification.',
    downloadUrl: 'https://github.com/Raghav509/TOM',
    repositoryUrl: 'https://github.com/Raghav509/TOM',
    license: 'https://github.com/Raghav509/TOM/blob/main/LICENSE',
    programmingLanguage: 'Python',
    runtimePlatform: 'Python 3.12+',
    featureList: [
      'AI Planning and Reasoning',
      'Tool Registry System',
      'Browser Automation',
      'Android Device Control',
      'Voice Interface',
      'Verification Engine',
      'Memory and Context',
      'Permission System'
    ]
  };
}

export function FAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function BreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}
