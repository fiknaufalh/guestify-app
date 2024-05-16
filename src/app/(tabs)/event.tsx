import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import EventScreen from "../../screens/eventscreen";
import RSVPScreen from "../../screens/rsvpscreen";
import RSVPHadir from "../../screens/rsvphadir";
import RSVPTidakHadir from "../../screens/rsvptidakhadir";

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
