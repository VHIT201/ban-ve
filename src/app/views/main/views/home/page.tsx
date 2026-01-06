import { Fragment } from "react/jsx-runtime";
import {
  BannerSection,
  CategoriesSection,
  DailyBestDownloaded,
  DailyBestSeller,
  DailyFeatureSection,
  CustomerReviewsSection,
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
        <DailyFeatureSection />
      </Main>
    </Fragment>
  );
};

export default Home;
