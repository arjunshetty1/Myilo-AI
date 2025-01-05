import api from "@/utils/api";

export const ChannelData = async () => {
  try {
    const response = await api.get("profile/videos");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
