import { colors } from "@/themes/colors";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressComponent = () => {
  // Crear interfaces - Modificar Valores y dinamismo
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryOpacity]}
      style={styles.container}
    >
      <View style={styles.progressContainer}>
        <Text style={styles.title}>HOY</Text>
        <Text style={styles.title}>0/5</Text>
        <Text style={styles.title}>0%</Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Progress.Bar progress={0.4} width={300} color={colors.textLabel} />
      </View>
    </LinearGradient>
  );
};

export default ProgressComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
