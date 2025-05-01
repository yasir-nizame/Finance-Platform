import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    loading: true,
    token: "",
  });

  useEffect(() => {
    const initializeSession = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const refresh_token = sessionStorage.getItem("refresh_token");

      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) {
          console.error("Error restoring session:", error);
          sessionStorage.clear();
          setAuth({ user: null, token: "", loading: false });
        } else {
          setAuth({
            user: data.user ?? null,
            token: data.session?.access_token ?? "",
            loading: false,
          });
        }
      } else {
        setAuth({ user: null, token: "", loading: false });
      }
    };

    initializeSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event, session);
        if (event === "SIGNED_IN" && session) {
          sessionStorage.setItem("access_token", session.access_token);
          sessionStorage.setItem("refresh_token", session.refresh_token);
          sessionStorage.setItem("user", JSON.stringify(session.user));
          setAuth({
            user: session.user,
            token: session.access_token,
            loading: false,
          });
        } else if (event === "SIGNED_OUT" || !session) {
          sessionStorage.clear();
          setAuth({ user: null, token: "", loading: false });
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
