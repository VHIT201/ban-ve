"use client";

import { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const useMetaTags = ({
  title,
  description,
  image,
  url,
  type = "website",
}: MetaTagsProps) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} - Blueprint Marketplace`;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper function to update or create meta tag with name attribute
    const updateMetaTagByName = (name: string, content: string) => {
      let element = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard meta tags
    if (description) {
      updateMetaTagByName("description", description);
    }

    // Open Graph tags
    if (title) {
      updateMetaTag("og:title", title);
    }

    if (description) {
      updateMetaTag("og:description", description);
    }

    if (image) {
      updateMetaTag("og:image", image);
      updateMetaTag("og:image:width", "1200");
      updateMetaTag("og:image:height", "630");
    }

    if (url) {
      updateMetaTag("og:url", url);
    }

    updateMetaTag("og:type", type);
    updateMetaTag("og:site_name", "Blueprint Marketplace");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    if (title) {
      updateMetaTag("twitter:title", title);
    }
    if (description) {
      updateMetaTag("twitter:description", description);
    }
    if (image) {
      updateMetaTag("twitter:image", image);
    }

    // Facebook specific
    updateMetaTag("fb:app_id", "your-facebook-app-id"); // Thay bằng Facebook App ID thực tế

    return () => {
      // Cleanup không cần thiết vì meta tags sẽ được update ở trang khác
    };
  }, [title, description, image, url, type]);
};

export default useMetaTags;
