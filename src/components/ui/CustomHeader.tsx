import { colors } from "@/themes/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  title: string;
}
export const CustomHeader = ({ title }: Props) => {
  const time = Number(
    new Date().toLocaleString("es-AR", {
      hour: "numeric",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires",
    }),
  );

  const greeting =
    time < 12 ? "BUENOS DÍAS" : time < 18 ? "BUENAS TARDES" : "BUENAS NOCHES";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.containerHeader}>
          <Text style={styles.subtitle}>{greeting || "BUENOS DÍAS"} </Text>
          <Text style={styles.title}>{title.toLocaleUpperCase()}</Text>
        </View>

        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons
            name="meditation"
            size={25}
            color={"black"}
            style={styles.icon}
          />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.backgroundHeader,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerHeader: {
    justifyContent: "center",
    marginTop: 10,
  },
  subtitle: {
    color: colors.textLabel,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  iconContainer: {
    borderRadius: 40,
    width: 50,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
});
