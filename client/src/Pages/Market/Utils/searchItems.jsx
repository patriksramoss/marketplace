// utils/fetchContent.js
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { toJS } from "mobx";
import marketStore from "../../Market/store";

export async function searchItems(search) {
  try {
    console.log("111111111111111");
    marketStore.setLoading(true);
    const response = await axios.get(`${API_BASE_URL}/main/searchForItems`, {
      params: { search },
      withCredentials: true,
    });
    console.log("search", search);
    console.log("data", response.data);
    marketStore.setLoading(false);
    return response.data; // Return fetched content
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error; // Re-throw the error to be handled in the store
  }
}
