import { View, Text } from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from "@/screens/dashboard/dashboardscreen";
export type EventScreenNames = ["DashboardScreen"];
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
    </Stack.Navigator>
  );
};

export default Dashboard;
