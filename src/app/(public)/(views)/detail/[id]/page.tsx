import type { Metadata } from "next";
import { getApiContentId } from "@/api/endpoints/content";
import { Content } from "@/api/models";
import {
  generateMetadata as generateSEOMetadata,
  generateProductJsonLd,
} from "@/lib/metadata";
import DetailClient from "./DetailClient";

interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Generate dynamic metadata for content detail page
 */
export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;

    // Fetch content data
    const content = (await getApiContentId(id)) as Content;

    // Get first image or use default
    const image =
      content.images && content.images.length > 0
        ? content.images[0]
        : "/og-image.png";

    // Format price for description
    const priceText = content.price
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(content.price)
      : "Miễn phí";

    const metadata = generateSEOMetadata({
      title: content.title || "Chi tiết sản phẩm",
      description:
        content.description ||
        `Sản phẩm ${content.title} - Giá: ${priceText}. Xem chi tiết tại BanVe.vn`,
      image,
      url: `/detail/${id}`,
      type: "article",
      keywords: [
        content.title || "",
        "bản vẽ",
        "thiết kế",
        content.field || "",
        "BanVe.vn",
      ].filter(Boolean),
      publishedTime: content.createdAt,
      authors: content.createdBy?.fullname ? [content.createdBy.fullname] : [],
    });

    return metadata;
  } catch (error) {
    // If error, return default metadata
    return generateSEOMetadata({
      title: "Chi tiết sản phẩm",
      description: "Xem chi tiết sản phẩm tại BanVe.vn",
      url: "/detail",
    });
  }
}

const Detail = async ({ params }: DetailPageProps) => {
  const { id } = await params;

  // Fetch content for JSON-LD
  let jsonLd = null;
  try {
    const content = (await getApiContentId(id)) as Content;
    const image =
      content.images && content.images.length > 0
        ? content.images[0]
        : "/og-image.png";

    jsonLd = generateProductJsonLd({
      name: content.title || "Sản phẩm",
      description: content.description || "",
      image: image?.startsWith("http")
        ? image
        : `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${image}`,
      price: content.price || 0,
      currency: "VND",
      availability: "InStock",
    });
  } catch (error) {
    // Ignore error, just don't show JSON-LD
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <DetailClient id={id} />
    </>
  );
};

export default Detail;
