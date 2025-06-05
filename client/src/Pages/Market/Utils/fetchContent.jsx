// utils/fetchContent.js
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { toJS } from "mobx";

export async function fetchContent(categoryId = null) {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/contentByCategory`, {
      params: { categoryId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}
