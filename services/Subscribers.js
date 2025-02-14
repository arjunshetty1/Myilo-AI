import api from "@/utils/api";
import { apiCache, createCacheKey } from "@/utils/apiCahche";
import axios from "axios";

export const GetSubscribers = async (page, limit) => {
  const cacheKey = createCacheKey('subscribers', page, limit);
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get("subscriber", {
        params: {
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

export const PostSubscribers = async (emailList) => {
  try {
    const response = await api.post("subscriber", {
      emails: emailList,
    });
    // Clear subscriber cache after adding new subscribers
    apiCache.remove('subscribers');
    return response.data;
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
    // Clear subscriber cache after deleting subscribers
    apiCache.remove('subscribers');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const OnboardSubscriber = async (params) => {
  // Public route API call, no caching for this one
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/onboard/subscriber/opt`,
      params
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetCreatorProfile = async (id) => {
  const cacheKey = createCacheKey('creator-profile', id);
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/onboard/profile/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
};

export const unSubscribe = async (params) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/onboard/subscriber/out`,
      params
    );
    // Clear subscriber cache after unsubscribing
    apiCache.remove('subscribers');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};