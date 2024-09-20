import axios from "axios";
import { API_BASE_URL } from "../../config";

export async function clearCart() {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/clearCart`, {
      withCredentials: true, // Include cookies in the request
    });
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error; // Re-throw the error for handling at the call site
  }
}
