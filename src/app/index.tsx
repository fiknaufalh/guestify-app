import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { Link, Redirect } from "expo-router";
import { COLORS } from "@/constants/theme";
import IntroSlider from "@/components/intro-slider";

import Login from "./(auth)/login";

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);

  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor(COLORS.primary_2);

  // if (!showHomePage) {
  //   return <IntroSlider setShowHomePage={setShowHomePage} />;
  // }

  return (
    // <Redirect href="/home" />
    <Login />
  );
}
