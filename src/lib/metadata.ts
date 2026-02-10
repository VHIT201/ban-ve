import type { Metadata } from "next";

interface GenerateMetadataParams {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

/**
 * Generate SEO metadata for pages
 */
export function generateMetadata(params: GenerateMetadataParams): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = "/og-image.png",
    url = "",
    type = "website",
    publishedTime,
    authors = [],
  } = params;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      type,
      locale: "vi_VN",
      url: fullUrl,
      siteName: "BanVe",
      title,
      description,
      images: [
        {
          url: image.startsWith("http") ? image : `${baseUrl}/${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && type === "article" && { publishedTime }),
      ...(authors.length > 0 && type === "article" && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${baseUrl}${image}`],
    },
  };
}

/**
 * Generate JSON-LD structured data for products
 */
export function generateProductJsonLd(params: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}) {
  const {
    name,
    description,
    image,
    price,
    currency = "VND",
    rating,
    reviewCount,
    availability = "InStock",
  } = params;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
    },
    ...(rating &&
      reviewCount && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating,
          reviewCount,
        },
      }),
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
