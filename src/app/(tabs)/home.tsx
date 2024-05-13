import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "@/components/homescreen";
import DaftarQR from "@/components/daftarqrcode";
import QRCode from "@/components/qrcode";

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
};

export default Home;
