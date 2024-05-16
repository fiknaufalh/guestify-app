import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from "@/screens/dashboard/dashboardscreen";
import DashboardScreenEvent from "@/screens/dashboard/dashboardscreenevent";

export type EventScreenNames = ["DashboardScreen", "DashboardScreenEvent"];
export type EventStackParamList = Record<EventScreenNames[number], undefined>;
export type EventNavigation = NavigationProp<EventStackParamList>;

const Stack = createStackNavigator<EventStackParamList>()

const Dashboard = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DashboardScreenEvent"
        component={DashboardScreenEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Dashboard;
