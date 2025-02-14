import api from "@/utils/api";
import { apiCache, createCacheKey } from "@/utils/apiCahche";

export const NewsletterSubscriberAnalyitics = async (
  granularity,
  startDate,
  endDate
) => {
  const cacheKey = createCacheKey('newsletter-analytics', granularity, startDate, endDate);
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get("analytics/subs", {
        params: {
          granularity: granularity,
          startDate: startDate,
          endDate: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

export const GetUsageDetails = async () => {
  const cacheKey = 'usage-details';
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get("analytics/usage");
      return response.data;
    } catch (error) {
      return error;
    }
  });
};

export const GetViewsDeatils = async (granularity, startDate, endDate) => {
  const cacheKey = createCacheKey('views-details', granularity, startDate, endDate);
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get("analytics/views", {
        params: {
          granularity: granularity,
          startDate: startDate,
          endDate: endDate,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  });
};

export const GetIndividualNewsletterData = async (id) => {
  const cacheKey = createCacheKey('individual-newsletter', id);
  
  return apiCache.getOrFetch(cacheKey, async () => {
    try {
      const response = await api.get(`analytics/newsletter/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};