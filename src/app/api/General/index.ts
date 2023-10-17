import { API_URL } from "@/utils";
import axios from "axios";

export const getCountries = async () => axios.get(`${API_URL}/countries`);
export const getPublisherCategories = async () => axios.get(`${API_URL}/publisher-categories`);
export const getPodcastGoals = async () => axios.get(`${API_URL}/podcast-goals`);
export const getPodcastCategories = async () => axios.get(`${API_URL}/podcast-categories`);
export const getTags = async () => axios.get(`${API_URL}/tags`);
export const getShares = async () => axios.get(`${API_URL}/shares`);
export const getPlans = async () => axios.get(`${API_URL}/plans`);
export const getPlan = async (id: string | number) => axios.get(`${API_URL}/plans/${id}`);
export const getProfile = async () => axios.get(`${API_URL}/profile`);
