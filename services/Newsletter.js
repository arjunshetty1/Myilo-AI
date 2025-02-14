import api from "@/utils/api";
import { apiCache, createCacheKey } from "@/utils/apiCahche";



export const CreateNewsletter = async (params) => {
  try {
    const data = await api.post("newsletter", params);
    // Clear related caches when creating a new newsletter
    apiCache.remove('newsletter-list');
    apiCache.remove('newsletter-count');
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const PublishNewsetter = async (params) => {
  try {
    const data = await api.patch(`newsletter/publish/${params}`);
    // Clear related caches
    apiCache.remove('newsletter-list');
    apiCache.remove(createCacheKey('newsletter-by-id', params));
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetNewsletterList = async (page, limit, status) => {
  const cacheKey = createCacheKey('newsletter-list', page, limit, status);
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get("newsletter", {
        params: {
          page: page,
          limit: limit,
          status: status,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  });
};

export const GetNewsletterByID = async (id) => {
  const cacheKey = createCacheKey('newsletter-by-id', id);
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get(`newsletter/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

export const GetNewsletterCount = async () => {
  const cacheKey = 'newsletter-count';
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get("newsletter/count");
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

export const SendTestMail = async (id, email) => {
  try {
    const response = await api.post(`newsletter/test/${id}`, { email });
    return response.data;
  } catch (error) {
    console.error("Error sending test email:", error);
    return error;
  }
};

export const Reccomandations = async (industry, length) => {
  const cacheKey = createCacheKey('newsletter-suggestions', industry, length);
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.post("/newsletter/suggestion", {
        industry,
        length,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting recommendations:", error);
      return error;
    }
  });
};

export const UpdateNewsletter = async (data, id) => {
  try {
    const response = await api.patch(`/newsletter/${id}`, data);
    // Clear related caches
    apiCache.remove(createCacheKey('newsletter-by-id', id));
    apiCache.remove('newsletter-list');
    return response.data;
  } catch (error) {
    console.log("Error in updating newsletter API response");
    return error;
  }
};