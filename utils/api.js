"use client";
import axios from "axios";
import { supabase } from "./supabaseConfig";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const getAccessToken = async () => {
  const { data: session, error } = await supabase.auth.getSession();

  if (error || !session) {
    console.error(
      "Error retrieving session:",
      error?.message || "No session found"
    );
    return;
  }

  return session.session.access_token;
};

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
