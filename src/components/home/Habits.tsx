import { colors } from "@/themes/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  id_habito: string;
  name: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  completadoHoy?: boolean;
  onToggle: () => void;
}

const Habits = ({ name, icon, completadoHoy, onToggle }: Props) => {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: completadoHoy ? "#E8F9F0" : "#fff",
          borderColor: completadoHoy ? "#4CAF50" : colors.secondary,
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
    >
      {completadoHoy && (
        <Ionicons
          name="checkmark-circle"
          size={18}
          color="#4CAF50"
          style={styles.check}
        />
      )}

      <View style={styles.containerHeader}>
        <Text style={styles.title}>{name.toUpperCase()}</Text>

        <Ionicons
          name={icon || "water-sharp"}
          size={28}
          color={completadoHoy ? "#4CAF50" : "#555"}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 20,
    width: "45%",
    aspectRatio: 1,
    justifyContent: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
  check: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});

export default Habits;
