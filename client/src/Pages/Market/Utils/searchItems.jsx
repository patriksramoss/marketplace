// utils/fetchContent.js
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { toJS } from "mobx";

export async function searchItems(search) {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/searchForItems`, {
      params: { search },
      withCredentials: true,
    });
    console.log("searchForItems API");
    return response.data; // Return fetched content
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error; // Re-throw the error to be handled in the store
  }
}
