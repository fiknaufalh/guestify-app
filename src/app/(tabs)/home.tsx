import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "@/screens/homescreen";
import DaftarQR from "@/screens/daftarqrcode";
import QRCode from "@/screens/qrcode";
import CreateEvent from "@/screens/createevent";
import Payment from "@/screens/payment";
import PaymentCompleted from "@/screens/paymentcompleted";
import EditEvent from "@/screens/editevent";

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
