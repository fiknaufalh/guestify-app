import { ScrollView } from "react-native";
import React from "react";
import Header from "@/components/header";
import HomeBanner from "@/components/home-banner";
import FeatureSlider from "@/components/feature-slider";
import FrequentQnA from "@/components/frequent-qna";

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
      <Header />
      <HomeBanner />
      <FeatureSlider />
      <FrequentQnA />
    </ScrollView>
  );
};

export default HomeScreen;
