import { supabase } from "@/lib/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

interface Habits {
  id_habito: string;
  nombre: string;
  icono?: React.ComponentProps<typeof Ionicons>["name"];
  habitos_dias: { id_dia: number }[];
}

export const useHome = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Habits[]>([]);

  const { getUser } = useAuth();

  const getHabits = async () => {
    try {
      const user = await getUser();

      if (!user) throw new Error("Usuario no autenticado");

      const { data, error } = await supabase
        .from("habitos")
        .select(
          `
        id_habito,
        nombre,
        icono,
        habitos_dias (
          id_dia
        )
      `,
        )
        .eq("id_usuario", user.id);

      if (error) {
        throw error;
      }

      setData(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  return { getHabits, loading, data };
};
