import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { Link, Redirect, Slot, useRootNavigationState } from "expo-router";
import { COLORS } from "@/constants/theme";
import IntroSlider from "@/components/intro-slider";
import { useAuth } from "@/contexts/authContext";

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);
  const { isLoggedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (isLoggedIn) {
      setShowHomePage(true);
    }
  }, [isLoggedIn]);

  if (!rootNavigationState?.key) return null;

  StatusBar.setBarStyle("light-content", true);
  StatusBar.setBackgroundColor(COLORS.primary_2);

  if (!showHomePage) {
    return <IntroSlider setShowHomePage={setShowHomePage} />;
  }

  return (
    <Redirect href="home" />
  );
}
