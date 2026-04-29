import Habits from "@/components/home/Habits";
import ProgressComponent from "@/components/home/Progress";

import { CustomHeader } from "@/components/ui/CustomHeader";
import { useHome } from "@/hooks/home/useHome";
import { colors } from "@/themes/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

const Home = () => {
  const { data, loading } = useHome();

  return (
    <View style={styles.container}>
      <CustomHeader title="Tus Habitos" />
      <View>
        <ProgressComponent />
        <View style={styles.habits}>
          {data?.map((items) => {
            return (
              <Habits
                key={items.id_habito}
                name={items.nombre}
                id={items.id_habito}
                icon={items.icono}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  habits: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
