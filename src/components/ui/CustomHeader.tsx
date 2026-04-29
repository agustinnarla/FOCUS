import { colors } from "@/themes/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
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
    time < 12 ? "Buenos días" : time < 18 ? "Buenas tardes" : "Buenas noches";

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.containerHeader}>
          <Text style={styles.subtitle}>{greeting}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons
            name="meditation"
            size={26}
            color="#ffffff"
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
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(142, 225, 33, 0.15)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  containerHeader: {
    justifyContent: "center",
    flex: 1,
    paddingRight: 12,
  },
  subtitle: {
    color: colors.textLabel,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
    opacity: 0.75,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.3,
    color: colors.textLabel,
  },
  iconContainer: {
    borderRadius: 16,
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    alignSelf: "center",
  },
});
