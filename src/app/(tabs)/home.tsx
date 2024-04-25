import { ScrollView } from "react-native";
import React from "react";
import Header from "@/components/header";
import HomeBanner from "@/components/home-banner";
import FeatureSlider from "@/components/feature-slider";

const Home = () => {
  return (
    <ScrollView>
      <Header />
      <HomeBanner />
      <FeatureSlider />
    </ScrollView>
  );
};

export default Home;
