import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Roll Alone - Solo TTRPG Toolkit | Complete Solo RPG Engine",
  description = "Your complete toolkit for solo tabletop RPG adventures. Features advanced dice roller, oracle systems, generators, and decision-making tools for any TTRPG system. No Game Master required!",
  keywords = "solo RPG, tabletop RPG, TTRPG, dice roller, oracle, solo gaming, RPG tools, game master, solo engine, OPSE",
  canonical = "https://rollal.one/",
  ogImage = "https://rollal.one/src/assets/hero.webp"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonical, true);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);
    updateMetaTag('twitter:url', canonical, true);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

  }, [title, description, keywords, canonical, ogImage]);

  return null; // This component doesn't render anything
};

export default SEO;
