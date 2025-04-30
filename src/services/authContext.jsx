// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    const refresh_token = sessionStorage.getItem("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ data }) => {
          setAuth({
            user: data.user ?? null,
            token: data.session.access_token ?? "",
          });
        });
    }

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.access_token) {
          sessionStorage.setItem("access_token", session.access_token);
          sessionStorage.setItem("refresh_token", session.refresh_token);
          sessionStorage.setItem("user", JSON.stringify(session.user));
          setAuth({
            user: session.user,
            token: session.access_token,
          });
        } else {
          sessionStorage.clear();
          setAuth({ user: null, token: "" });
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
