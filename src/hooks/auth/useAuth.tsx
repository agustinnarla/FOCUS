import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return { loading, login, getUser };
};
