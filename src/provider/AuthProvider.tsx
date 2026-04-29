import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type AuthDate = {
  loading: boolean;
  session: Session | null;
};

const AuthContext = createContext<AuthDate>({
  loading: true,
  session: null,
});

// Permite renderizar el resto de nuestra app
interface Props {
  children: React.ReactNode;
}

export default function AuthProvider(props: Props) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      if (data.session) {
        setSession(data.session);
      } else {
        router.replace("/(auth)/login");
      }

      setLoading(false);
    }

    fetchSession();

    const { data: authLitener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setLoading(false);

        if (session) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/login");
        }
      },
    );

    return () => {
      authLitener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loading, session }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
