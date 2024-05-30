import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp } from "@react-navigation/native";
import EventScreen from "@/screens/event/eventscreen";
import RSVPScreen from "@/screens/event/rsvpscreen";
import RSVPHadir from "@/screens/event/rsvphadir";
import RSVPTidakHadir from "@/screens/event/rsvptidakhadir";

export type EventStackParamList = {
  EventScreen: undefined;
  RSVPScreen: { event: any }; // Perbarui tipe parameter untuk RSVPScreen
  RSVPHadir: undefined;
  RSVPTidakHadir: undefined;
};
export type EventNavigation = NavigationProp<EventStackParamList>;

const Stack = createStackNavigator<EventStackParamList>()

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
