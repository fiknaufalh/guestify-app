import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import FormKetikManual from "@/screens/formketikscan";
import ScannerCamera from "@/screens/scannercam";
import FormCheckIn from "@/screens/formcheckin";
import ScannerLast from "@/screens/scannerlast";

const Stack = createStackNavigator();

const Scanner = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scanner"
        component={ScannerCamera}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormKetikManual"
        component={FormKetikManual}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormCheckIn"
        component={FormCheckIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScannerLast"
        component={ScannerLast}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  );
};

export default Scanner;
