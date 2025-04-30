import supabase from "../../src/services/supabase.js";

export const signUp = async ({ email, password }) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const login = async ({ email, password }) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const loginWithOtp = async ({ email, token }) => {
  return await supabase.auth.verifyOtp({ email, token });
};

export const resetPassword = async (email) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });
};

export const updatePassword = async (newPassword) => {
  return await supabase.auth.updateUser({ password: newPassword });
};

export const loginWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({ provider: "google" });
};

export const logout = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};
