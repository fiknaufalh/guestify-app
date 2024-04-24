import React from "react";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <TouchableOpacity
        className="bg-teal-500 p-3 rounded-lg shadow-lg shadow-black"
        style={[Platform.OS === "android" && { elevation: 20 }]}
      >
        <Text className="text-white text-3xl font-bold">Hello World!</Text>
      </TouchableOpacity>

      <Link href="/">
        <Text>Go to Home</Text>
      </Link>

      <StatusBar style="dark" />
    </View>
  );
}
