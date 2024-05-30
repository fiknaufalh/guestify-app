import { Tabs } from "expo-router";
import { View, Text, Platform } from "react-native";
import { Redirect } from "expo-router";
import { COLORS } from "@/constants/theme";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/authContext";
import React from "react";

export default function TabLayout() {

  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          height: 72,
          elevation: 0,
          backgroundColor: COLORS.primary_2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 2,
              }}
            >
              <MaterialIcons
                name="home-filled"
                size={24}
                style={{
                  width: 24,
                  height: 24,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "NunitoSans-Regular",
                  paddingTop: 2,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="event"
        options={{
          title: "Event",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 2,
              }}
            >
              <MaterialIcons
                name="event-available"
                size={24}
                style={{
                  width: 24,
                  height: 24,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "NunitoSans-Regular",
                  paddingTop: 2,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              >
                Event
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.secondary_2,
                  width: Platform.OS === "ios" ? 60 : 70,
                  height: Platform.OS === "ios" ? 60 : 70,
                  top: Platform.OS === "ios" ? -35 : -45,
                  borderRadius: Platform.OS === "ios" ? 35 : 40,
                }}
              >
                <Ionicons
                  name="scan-circle"
                  size={56}
                  style={{
                    width: 56,
                    height: 56,
                    color: COLORS.white,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "NunitoSans-Regular",
                  marginTop: -40,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              >
                Scanner
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 2,
              }}
            >
              <MaterialIcons
                name="dashboard"
                size={24}
                style={{
                  width: 24,
                  height: 24,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "NunitoSans-Regular",
                  paddingTop: 2,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              >
                Dashboard
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 2,
              }}
            >
              <Ionicons
                name="person"
                size={24}
                style={{
                  width: 24,
                  height: 24,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "NunitoSans-Regular",
                  paddingTop: 2,
                  color: focused ? COLORS.secondary_2 : COLORS.white,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
