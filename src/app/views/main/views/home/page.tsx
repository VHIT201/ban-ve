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
      <div className="bg-gray-50 py-12">
        <Main>
          <CategoriesFeatureSection />
        </Main>
      </div>

      <Main>
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
