import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const slides = [
  {
    id: 1,
    title: "RSVP Cepat \ndan Efisien",
    image: require("@/assets/feature-1-rsvp.png"),
  },
  {
    id: 2,
    title: "Digital Guest \nBook Interaktif",
    image: require("@/assets/feature-2-guestbook.png"),
  },
  {
    id: 3,
    title: "Check-In \nQR Code",
    image: require("@/assets/feature-3-checkin.png"),
  },
];

const FeatureSlider = () => {
  return (
    <View className="mx-[20px] my-2">
      <Text className="text-primary-2 text-2xl my-2 font-jos_bold">
        Fitur Menarik
      </Text>
      <FlatList
        horizontal
        data={slides}
        renderItem={({ item, index }) => (
          <View className="bg-primary-2 h-36 w-36 mx-2 rounded-xl flex items-center justify-center">
            <Image source={item.image} className="h-16 w-16" />
            <Text className="text-white text-sm text-center mt-2 font-pop_regular">
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default FeatureSlider;
