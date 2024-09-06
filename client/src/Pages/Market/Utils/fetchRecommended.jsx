// utils/fetchContent.js
import axios from "axios";
import { API_BASE_URL } from "../../../config";

export async function fetchRecommended() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/main/contentRecommended`,
      {
        withCredentials: true,
      }
    );
    return response.data; // Return fetched content
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error; // Re-throw the error to be handled in the store
  }
}
