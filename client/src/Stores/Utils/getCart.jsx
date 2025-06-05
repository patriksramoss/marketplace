import axios from "axios";
import { API_BASE_URL } from "../../config";

export async function getCart() {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/getCart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
}
