import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp } from "@react-navigation/native";
import FormKetikManual from "@/screens/scanner/formketikscan";
import ScannerCamera from "@/screens/scanner/scannercam";
import FormCheckIn from "@/screens/scanner/formcheckin";
import ScannerLast from "@/screens/scanner/scannerlast";

export type ScannerScreenNames = ["Scanner", "FormKetikManual", "FormCheckIn", "ScannerLast"];
export type ScannerStackParamList = Record<ScannerScreenNames[number], undefined>;
export type ScannerNavigation = NavigationProp<ScannerStackParamList>;

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
