import { supabase } from "@/lib/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../auth/useAuth";

interface Habits {
  id_habito: string;
  nombre: string;
  icono?: React.ComponentProps<typeof Ionicons>["name"];
  habitos_dias: { id_dia: number }[];
  completadoHoy: boolean;
}

export const useHome = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Habits[]>([]);

  const { getUser } = useAuth();

  const getHabits = async () => {
    try {
      const user = await getUser();

      if (!user) throw new Error("Usuario no autenticado");

      const today = new Date().toISOString().split("T")[0];

      const day = new Date().getDay();
      const { data, error } = await supabase
        .from("habitos")
        .select(
          `
        id_habito,
        nombre,
        icono,
        habitos_dias!inner (
          id_dia
        ),
        habitos_log (
          completado, fecha
        )
      `,
        )
        .eq("id_usuario", user.id)
        .eq("habitos_dias.id_dia", day);

      if (error) {
        throw error;
      }

      const habitsData = data.map((habit) => ({
        ...habit,
        completadoHoy:
          habit.habitos_log?.some(
            (log) => log.fecha === today && log.completado,
          ) ?? false,
      }));

      setData(habitsData);
      return habitsData;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateHabits = async (id_habito: string) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("habitos_log")
        .upsert(
          {
            id_habito,
            fecha: today,
            completado: true,
          },
          {
            onConflict: "id_habito,fecha",
          },
        )
        .select()
        .single();

      if (error) throw error;

      Alert.alert("Exito", "Exito al actualizar");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  return { getHabits, loading, data, updateHabits };
};
