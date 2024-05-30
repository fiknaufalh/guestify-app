import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";

const Header = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <View className="bg-primary-2 w-screen">
      <View className="flex flex-row justify-between" style={{ marginTop: 10 }}>
        <Image source={require("@/assets/icon.png")} className="w-28 h-24" />
        <View
          className="flex items-center justify-center bg-secondary-2 rounded-full"
          style={{ marginTop: 24, marginEnd: 10, width: 40, height: 40 }}
        >
          <Entypo
            name="shopping-cart"
            size={18}
            style={{
              width: 18,
              height: 18,
              color: COLORS.white,
            }}
          />
        </View>
      </View>
      <Text className="text-white font-nun_semibold text-xl" style={{ marginStart: 20 }}>
        👋 Halo, {firstName}!
      </Text>
    </View>
  );
};

export default Header;
