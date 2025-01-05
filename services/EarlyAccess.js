import api from "@/utils/api";

export const SendEmail = async (params) => {
  try {
    const response = await api.post("earlyaccess", params);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
