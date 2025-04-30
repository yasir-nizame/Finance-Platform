import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_API_BASE_URL_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env
  .VITE_API_BASE_URL_REACT_APP_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and API Key must be provided");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const access_token = sessionStorage.getItem("access_token");
if (access_token) {
  supabase.auth.setSession({
    access_token,
    refresh_token: sessionStorage.getItem("refresh_token"),
  });
}

export default supabase;
