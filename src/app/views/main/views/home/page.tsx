import { Fragment } from "react";
import {
  BannerSection,
  BlueprintFeatureSection,
  CategoriesSection,
  CustomerReviewsSection,
} from "./components";

const Home = () => {
  return (
    <Fragment>
      <BannerSection />
      <CategoriesSection />
      <BlueprintFeatureSection />
      <CustomerReviewsSection />
    </Fragment>
  );
};

export default Home;
