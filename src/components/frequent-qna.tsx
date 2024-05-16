import { View, Text } from "react-native";
import React from "react";

const QnA = [
  {
    id: 1,
    question:
      "Bagaimana cara mengonfigurasi QR Code check-in untuk acara saya?",
    answer:
      "Apabila Anda mengisi RSVP dengan 'Akan menghadiri acara', maka QR Code akan di-generate untuk Anda",
  },
  {
    id: 2,
    question:
      "Apakah Guestify mendukung integrasi dengan aplikasi lain atau sistem manajemen acara yang sudah ada?",
    answer: "Guestify bekerja melakukan manajemen acara secara end-to-end",
  },
  {
    id: 3,
    question: "Bagaimana tingkat keamanan data tamu dijamin oleh Guestify?",
    answer: "Setiap tamu yang akan datang akan memiliki QR Code yang unik",
  },
];

const FrequentQnA = () => {
  return (
    <View className="mx-[20px] my-2">
      <Text className="text-primary-2 text-2xl my-2 font-jos_bold">Pertanyaan</Text>
      <View className="w-full">
        {QnA.map((item, index) => (
          <View
            key={index}
            className="mx-2 my-1 rounded-xl w-80% flex items-center justify-center"
          >
            <View
              className="bg-primary-2 rounded-lg w-full h-14 items-center justify-center my-2"
              style={{ padding: 8 }}
            >
              <Text className="text-white text-sm text-center font-nun_regular">
                {item.question}
              </Text>
            </View>

            <View
              className="bg-secondary-2 rounded-lg w-full h-14 items-center justify-center"
              style={{ padding: 8 }}
            >
              <Text className=" text-white text-sm text-center font-nun_regular">
                {item.answer}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default FrequentQnA;
