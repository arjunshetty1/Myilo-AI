import api from "@/utils/api";

export const GetSubscribers = async (page, limit) => {
  try {
    const response = await api.get("subscriber", {
      params: {
        page: page,
        limit: limit,
      },
    });

    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const PostSubscribers = async (emailList) => {
  try {
    const response = await api.post("subscriber", {
      emails: emailList,
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const DeleteSubscribers = async (emails) => {
  try {
    const response = await api.post("subscriber/unsubscribe", {
      emails: emails,
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const OnboardSubscriber = async (params) => {
  try {
    const response = await api.post("subscriber/opt", params);
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
