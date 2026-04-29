import Login from "@/pages/Login";
import { colors } from "@/themes/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function login() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
