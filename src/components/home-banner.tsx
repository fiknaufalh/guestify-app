import { View, Text, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { COLORS } from "@/constants/theme";

const HomeBanner = () => {
  return (
    <View className="bg-primary-2 w-screen flex-1 items-center pb-8 rounded-b-3xl">
      <Image
        source={require("@/assets/wedding-banner.png")}
        style={{
          width: "100%",
          height: 200,
          marginVertical: 10,
        }}
      />
      <Text className="text-center text-white mx-2 my-2">
        Transformasikan setiap acara menjadi pengalaman tak terlupakan dengan
        <Text className="text-secondary-1"> Guestify</Text>, di mana kemudahan
        RSVP, manajemen tamu, dan kecanggihan teknologi bertemu dalam satu
        platform yang memikat
      </Text>
      <View className="flex flex-row my-2">
        <Button
          mode="contained"
          buttonColor={COLORS.secondary_2}
          className="w-44 mr-4"
        >
          Daftar QR Code
        </Button>
        <Button
          mode="contained"
          buttonColor={COLORS.secondary_2}
          className="w-44"
        >
          Buat Acara
        </Button>
      </View>
    </View>
  );
};

export default HomeBanner;