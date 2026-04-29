import Habits from "@/components/home/Habits";
import ProgressComponent from "@/components/home/Progress";

import { CustomHeader } from "@/components/ui/CustomHeader";
import { useHome } from "@/hooks/home/useHome";
import { colors } from "@/themes/colors";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Home = () => {
  const { data, loading, updateHabits, getHabits } = useHome();

  return (
    <View style={styles.container}>
      <CustomHeader title="Tus Habitos" />
      <View>
        <ProgressComponent />
        <View style={styles.habits}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            data?.map((items) => (
              <Habits
                key={items.id_habito}
                name={items.nombre}
                id_habito={items.id_habito}
                icon={items.icono}
                completadoHoy={items.completadoHoy}
                onToggle={async () => {
                  await updateHabits(items.id_habito);
                  await getHabits();
                }}
              />
            ))
          )}
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
  },
});
