import api from "@/utils/api";
import axios from "axios";

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

export const OnboardSubscriber = async (params) => { // a public route api call, so not gonna pass access_token.
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/onboard/subscriber/opt`, params);
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const GetCreatorProfile = async (id) => { // a public route api call, so not gonna pass access_token.
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/onboard/profile/${id}`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
