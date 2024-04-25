import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { COLORS } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";

/* 
  Temporarily archived due to the following error:
    Layout children must be of type Screen, all other children are ignored. 
    To use custom children, create a custom . Update Layout Route at: "app/(tabs)/_layout"

  This component is used to make a cleaner code for the tab screen in the tab layout.
  Further note: 
    - Component that is used for icon is MaterialIcons and Ionicons.
    - The styling of focused and unfocused tab for scanner is bit different.
*/

type TabScreenProps = {
  tabName: string;
  tabTitle: string;
  tabIcon: any;
  iconComponent: React.ComponentType<any>;
};

export default function TabScreen({ tabName, tabTitle, tabIcon, iconComponent }: TabScreenProps) {
  const IconComponent = iconComponent || MaterialIcons;
  return (
    <Tabs.Screen
      name={tabName}
      options={{
        title: tabTitle,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: "center",
              paddingTop: 16,
              borderTopColor: focused ? COLORS.secondary_2 : COLORS.primary_3,
              borderTopWidth: 2,
            }}
          >
            <IconComponent
              name={tabIcon}
              size={24}
              style={{
                width: 24,
                height: 24,
                color: focused ? COLORS.secondary_2 : COLORS.primary_3,
              }}
            />
          </View>
        ),
      }}
    />
  );
};
