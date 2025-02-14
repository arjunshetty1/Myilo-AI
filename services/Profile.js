import api from "@/utils/api";
import { apiCache } from "@/utils/apiCahche";
import { supabase } from "@/utils/supabaseConfig";

export const GetProfile = async () => {
  const cacheKey = 'user-profile';
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get("profile");
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

export const updateUserName = async (username) => {
  try {
    const response = await api.patch("profile", { username });
    // Clear profile cache after update
    apiCache.remove('user-profile');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const Logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    // Clear all caches on logout
    apiCache.clear();
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error);
    return error;
  }
};