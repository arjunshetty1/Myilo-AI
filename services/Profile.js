import api from "@/utils/api";
import { supabase } from "@/utils/supabaseConfig";


export const GetProfile = async () => {
  try {
    const response = await api.get("profile");
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserName = async (data) => {
  try {
    const response = await api.patch("profile",{data});
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const Logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error);
    return error;
  }
};

