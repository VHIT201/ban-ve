import { Fragment } from "react";
import type { Metadata } from "next";
import { Main } from "@/components/layouts";
import {
  BannerSection,
  DailyBestDownloaded,
  DailyBestSeller,
  DailyFeatureSection,
  DailyCustomerReviewSection,
  TopSellingLists,
  CategoriesFeatureSection,
} from "@/app/(public)/(views)/(home)/components";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Khám phá và tải xuống nội dung số chất lượng cao. BanVe - Nền tảng mua bán tài nguyên thiết kế hàng đầu Việt Nam.",
  keywords: [
    "digital content",
    "marketplace",
    "design resources",
    "templates",
    "graphics",
    "vector",
    "tải xuống",
    "thiết kế",
  ],
  openGraph: {
    title: "BanVe - Nền tảng mua bán nội dung số",
    description: "Khám phá và tải xuống nội dung số chất lượng cao",
    type: "website",
    url: "/",
  },
};

export const revalidate = 3600;

export default async function HomePage() {
  return (
    <Fragment>
      <div className="bg-gray-50 py-4">
        <Main className="py-2">
          <CategoriesFeatureSection />
        </Main>
      </div>

      <Main className="pt-0">
        <TopSellingLists />
        <DailyBestSeller />
        <BannerSection />
        <DailyBestDownloaded />
        <DailyCustomerReviewSection />
        <DailyFeatureSection />
      </Main>
    </Fragment>
  );
}
