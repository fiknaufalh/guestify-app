import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { COLORS } from "@/constants/theme";
import { type HomeNavigation } from '@/app/(tabs)/home';

const HomeBanner = () => {
  const { navigate } = useNavigation<HomeNavigation>();

  const handleDaftarQRPress = () => {
    // Navigate to DaftarQR screen when "Daftar QR Code" button is pressed
    navigate('DaftarQR');
  };

  const handleCreateEventPress = () => {
    // Navigate to CreateEvent screen when "Buat Acara" button is pressed
    navigate('CreateEvent');
  };
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
      <Text className="text-center text-white mx-2 my-2 px-5 font-nun_light">
        Transformasikan setiap acara menjadi pengalaman tak terlupakan dengan
        <Text className="text-secondary-1"> Guestify</Text>, di mana kemudahan
        RSVP, manajemen tamu, dan kecanggihan teknologi bertemu dalam satu
        platform yang memikat
      </Text>
      <View className="flex flex-row gap-2 mx-10 mt-2">
        <Button
          mode="contained"
          buttonColor={COLORS.secondary_2}
          className="basis-1/2"
          onPress={handleDaftarQRPress}
        >
          <Text className="font-nun_regular">List QR Code</Text>
        </Button>
        <Button
          mode="contained"
          buttonColor={COLORS.secondary_2}
          className="basis-1/2"
          onPress={handleCreateEventPress}
        >
          <Text className="font-nun_regular">Buat Acara</Text>
        </Button>
      </View>
    </View>
  );
};

export default HomeBanner;
