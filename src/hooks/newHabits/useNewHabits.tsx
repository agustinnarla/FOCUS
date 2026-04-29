import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";

export const useNewHabits = () => {
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuth();

  const handleCreateHabit = async (
    nombre: string,
    icono: string,
    selectedDays: number[],
  ) => {
    try {
      const user = await getUser();

      if (!user) throw new Error("Usuario no autenticado");

      const { data: habit, error } = await supabase
        .from("habitos")
        .insert({
          id_usuario: user.id,
          nombre,
          icono,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      if (selectedDays.length > 0) {
        const diasData = selectedDays.map((dia) => ({
          id_habito: habit.id_habito,
          id_dia: dia,
        }));
        const { error: diasError } = await supabase
          .from("habitos_dias")
          .insert(diasData);
        if (diasError) throw diasError;
      }
      return habit;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const onRegisterHabit = async (
    name: string,
    selectedIcon: string | null,
    selectedDays: number[],
  ) => {
    if (!name || !selectedIcon || !selectedDays) {
      throw new Error("Complete todo el formulario por favor.");
    }

    setLoading(true);

    try {
      await handleCreateHabit(name, selectedIcon, selectedDays);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateHabit, loading, onRegisterHabit };
};
