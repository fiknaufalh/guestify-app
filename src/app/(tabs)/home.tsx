import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp } from "@react-navigation/native";
import HomeScreen from "@/screens/home/homescreen";
import DaftarQR from "@/screens/home/daftarqrcode";
import QRCode from "@/screens/home/qrcode";
import CreateEvent from "@/screens/home/createevent";
import Payment from "@/screens/home/payment";
import PaymentCompleted from "@/screens/home/paymentcompleted";

export type HomeScreenNames =
  ["HomeScreen", "DaftarQR", "QRCode", "CreateEvent", "Payment", "PaymentCompleted", "EditEvent"];
export type HomeStackParamList = Record<HomeScreenNames[number], undefined>;
export type HomeNavigation = NavigationProp<HomeStackParamList>;

const Stack = createStackNavigator<HomeStackParamList>();

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DaftarQR"
        component={DaftarQR}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QRCode"
        component={QRCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentCompleted"
        component={PaymentCompleted}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Home;
