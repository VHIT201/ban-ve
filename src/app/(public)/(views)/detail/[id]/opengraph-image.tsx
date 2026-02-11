import { ImageResponse } from "next/og";
import { getApiContentId } from "@/api/endpoints/content";
import { Content } from "@/api/models";
import baseConfig from "@/configs/base";

export const runtime = "edge";
export const alt = "Product Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Image({ params }: Props) {
  const { id } = await params;

  try {
    const content = (await getApiContentId(id)) as Content;
    const firstImage =
      content.images && content.images.length > 0 ? content.images[0] : null;

    if (firstImage) {
      // Build absolute image URL
      let imageUrl: string;
      if (firstImage.startsWith("http")) {
        imageUrl = firstImage;
      } else if (firstImage.startsWith("/")) {
        imageUrl = `${baseConfig.mediaDomain}${firstImage}`;
      } else {
        imageUrl = `${baseConfig.mediaDomain}/${firstImage}`;
      }

      // Return redirect to actual image
      return new Response(null, {
        status: 307,
        headers: {
          Location: imageUrl,
        },
      });
    }
  } catch (error) {
    console.error("Error loading image:", error);
  }

  // Fallback image if no content image
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom right, #1e293b, #334155)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      BanVe
    </div>,
    {
      ...size,
    },
  );
}
