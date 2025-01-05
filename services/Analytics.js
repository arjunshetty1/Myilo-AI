import api from "@/utils/api";

export const NewsletterSubscriberAnalyitics = async (
  granularity,
  startDate,
  endDate
) => {
  try {
    const response = await api.get("analytics/subs", {
      params: {
        granularity: granularity,
        startDate: startDate,
        endDate: endDate,
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetUsageDetails = async () => {
  try {
    const response = await api.get("analytics/usage");
    const result = response.data;
    return result;
  } catch (error) {
    return error;
  }
};

export const GetViewsDeatils = async (granularity, startDate, endDate) => {
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
};

export const GetIndividualNewsletterData = async (id) => {
  try {
    const response = await api.get(`analytics/newsletter/${id}`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
