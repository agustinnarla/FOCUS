import { colors } from "@/themes/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Practico
interface Props {
  id: string;
  name: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  days?: number;
  completed?: boolean;
}

const Habits = ({ name, icon, days, completed }: Props) => {
  const renderDays = () => {
    return Array(days)
      .fill(0)
      .map((_, index) => <View key={index} style={styles.day} />);
  };

  return (
    <View
      style={[
        styles.container,
        {
          opacity: completed ? 1 : 0.5,
        },
      ]}
    >
      <View style={styles.containerHeader}>
        <Text style={styles.title}>{name.toLocaleUpperCase()}</Text>
        <Ionicons
          name={icon || "water-sharp"}
          size={26}
          color="black"
          style={styles.icon}
        />
      </View>
      <View style={styles.containerFooter}>{renderDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 20,
    width: "40%",
    height: "auto",
    gap: 5,
    justifyContent: "center",
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  title: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  icon: {
    color: "black",
  },
  containerFooter: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
  day: {
    height: 4,
    flex: 1,
    backgroundColor: "black",
    borderRadius: 2,
    opacity: 0.7,
    marginBottom: 10,
  },
});
export default Habits;
