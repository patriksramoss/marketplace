import axios from "axios";
import { API_BASE_URL } from "../../../config";

export async function fetchRecommended() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/main/contentRecommended`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}
