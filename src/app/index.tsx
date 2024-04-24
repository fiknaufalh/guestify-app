import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "../constants/theme";
import IntroSlide from "../components/intro-slider";

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);

  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor(COLORS.purple);

  if (!showHomePage) {
    return <IntroSlide setShowHomePage={setShowHomePage} />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/home">
        <Text>Home Screen</Text>
      </Link>
    </View>
  );
}
