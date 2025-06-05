import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { toJS } from "mobx";
import marketStore from "../../Market/store";

export async function searchItems(search) {
  try {
    marketStore.setLoading(true);
    const response = await axios.get(`${API_BASE_URL}/main/searchForItems`, {
      params: { search },
      withCredentials: true,
    });
    marketStore.setLoading(false);
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}
