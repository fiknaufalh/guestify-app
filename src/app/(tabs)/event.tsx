import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import EventScreen from "@/components/eventscreen";
import RSVPScreen from "@/components/rsvpscreen";
import RSVPHadir from "@/components/rsvphadir";
import RSVPTidakHadir from "@/components/rsvptidakhadir";

const Stack = createStackNavigator();

const Event = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RSVPScreen"
        component={RSVPScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RSVPHadir"
        component={RSVPHadir}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RSVPTidakHadir"
        component={RSVPTidakHadir}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Event;
