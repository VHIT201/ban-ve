"use client";

import { useEffect } from "react";

interface Props {
  imageUrl: string;
  title: string;
}

export default function ZaloMetaTags({ imageUrl, title }: Props) {
  useEffect(() => {
    // Inject additional meta tags for Zalo
    const metaTags = [
      { property: "og:image:secure_url", content: imageUrl },
      {
        property: "og:image:type",
        content: imageUrl.endsWith(".png") ? "image/png" : "image/jpeg",
      },
      { property: "og:image:alt", content: title },
      { name: "zalo-platform-site-verification", content: "website" },
    ];

    const head = document.getElementsByTagName("head")[0];
    const addedTags: HTMLMetaElement[] = [];

    metaTags.forEach((tag) => {
      const meta = document.createElement("meta");
      if (tag.property) {
        meta.setAttribute("property", tag.property);
      }
      if (tag.name) {
        meta.setAttribute("name", tag.name);
      }
      meta.setAttribute("content", tag.content);
      head?.appendChild(meta);
      addedTags.push(meta);
    });

    return () => {
      // Cleanup on unmount
      addedTags.forEach((tag) => {
        if (tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      });
    };
  }, [imageUrl, title]);

  return null; // This component doesn't render anything
}
