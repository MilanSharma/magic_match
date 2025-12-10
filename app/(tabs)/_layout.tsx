import { Tabs } from "expo-router";
import { Map, ShoppingBag, User } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

import { Colors } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.text,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.boardBackground,
          borderTopColor: Colors.surface,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
          fontSize: 12,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "World Map",
          tabBarIcon: ({ color }) => <Map color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Magic Shop",
          tabBarIcon: ({ color }) => <ShoppingBag color={color} size={24} />,
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: "Wizard",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
