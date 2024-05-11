import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import FormKetikManual from "@/components/formketikscan";
import ScannerCamera from "@/components/scannercam";

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
        options={{
          headerShown: false,
          headerLeft: () => null
        }}
      />
    </Stack.Navigator>

  );
};

export default Scanner;
