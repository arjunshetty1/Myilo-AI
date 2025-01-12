import api from "@/utils/api";

export const CreateNewsletter = async (params) => {
  try {
    const data = await api.post("newsletter", params);
    const response = data.data;
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const PublishNewsetter = async (params) => {
  try {
    const data = await api.patch(`newsletter/publish/${params}`);
    const response = data.data;
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetNewsletterList = async (page, limit, status) => {
  try {
    const response = await api.get("newsletter", {
      params: {
        page: page,
        limit: limit,
        status: status,
      },
    });

    const result = response.data;

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetNewsletterByID = async (id) => {
  try {
    const response = await api.get(`newsletter/${id}`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetNewsletterCount = async () => {
  try {
    const response = await api.get("newsletter/count");
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const SendTestMail = async (id, email) => {
  try {
    const response = await api.post(`newsletter/test/${id}`, { email });
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Error sending test email:", error);
    return error;
  }
};

export const Reccomandations = async (industry, length) => {

  try {
    
    const response = await api.post('/newsletter/suggestion', { industry, length });
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Error sending test email:", error);
    return error;
  }
}
