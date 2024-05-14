import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import FormKetikManual from "@/components/formketikscan";
import ScannerCamera from "@/components/scannercam";
import FormCheckIn from "@/components/formcheckin";
import ScannerLast from "@/components/scannerlast";

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
