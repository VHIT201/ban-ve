import { Fragment } from "react/jsx-runtime";
import {
  BannerSection,
  CategoriesSection,
  DailyBestDownloaded,
  DailyBestSeller,
  DailyFeatureSection,
  DailyCustomerReviewSection,
} from "./components";
import { Main } from "@/components/layouts";

const Home = () => {
  return (
    <Fragment>
      <div className="bg-[#FAF9F6]">
        <Main>
          <BannerSection />
          <CategoriesSection />
        </Main>
      </div>

      <Main>
        <DailyBestSeller />
        <DailyBestDownloaded />
        <DailyCustomerReviewSection />
        <DailyFeatureSection />
      </Main>
    </Fragment>
  );
};

export default Home;
