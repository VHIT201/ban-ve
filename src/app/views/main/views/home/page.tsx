import { Fragment } from "react";
import {
  BannerSection,
  BlueprintFeatureSection,
  CategoriesSection,
} from "./components";

const Home = () => {
  return (
    <Fragment>
      <BannerSection />
      <CategoriesSection />
      <BlueprintFeatureSection />
    </Fragment>
  );
};

export default Home;
