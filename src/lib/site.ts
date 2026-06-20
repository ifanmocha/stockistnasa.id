import seoJson from "../../cms-export/seo.json";
import siteJson from "../../cms-export/site.json";
import { siteConfig as defaults } from "./site.defaults";

const site = {
  ...defaults,
  ...siteJson,
  memberFee: Number((siteJson as { memberFee?: string | number }).memberFee) || defaults.memberFee,
} as typeof defaults;
const seo = seoJson as {
  global: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    robots: string;
    googleVerification: string;
    jsonLdExtra: string;
  };
  ai: {
    llmsTxt: string;
    aiSiteSummary: string;
    aiBrandFacts: string;
  };
};

export const siteConfig = site;
export const seoConfig = seo;
export { categories } from "./site.defaults";
export type { CategorySlug, ArticleCategory } from "./site.defaults";
