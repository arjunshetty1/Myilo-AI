import api from "@/utils/api";

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

export const Logout = async () => {
  try {
    const response = await api.get("auth/logout");
    return response.data;
  } catch (error) {
    return error;
  }
};
