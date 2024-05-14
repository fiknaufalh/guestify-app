import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "@/components/homescreen";
import DaftarQR from "@/components/daftarqrcode";
import QRCode from "@/components/qrcode";
import CreateEvent from "@/components/createevent";
import Payment from "@/components/payment";
import PaymentCompleted from "@/components/paymentcompleted";
import EditEvent from "@/components/editevent";

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
      <Stack.Screen
        name="EditEvent"
        component={EditEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Home;
