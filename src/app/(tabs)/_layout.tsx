import { colors } from "@/themes/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarLabelStyle: { fontSize: 12, color: colors.textLabel },
        tabBarStyle: {
          backgroundColor: colors.backgroundHeader,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color={colors.textLabel} />
          ),
        }}
      />
      <Tabs.Screen
        name="newHabits"
        options={{
          headerShown: false,
          tabBarLabel: "New",
          tabBarIcon: () => (
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={colors.textLabel}
            />
          ),
        }}
      />
    </Tabs>
  );
}
