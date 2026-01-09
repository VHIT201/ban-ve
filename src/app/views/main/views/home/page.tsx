import { Fragment } from "react/jsx-runtime";
import {
  BannerSection,
  CategoriesSection,
  DailyBestDownloaded,
  DailyBestSeller,
  DailyFeatureSection,
  DailyCustomerReviewSection,
  TopSellingLists,
  CategoriesFeatureSection,
} from "./components";
import { Main } from "@/components/layouts";

const Home = () => {
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
};

export default Home;
