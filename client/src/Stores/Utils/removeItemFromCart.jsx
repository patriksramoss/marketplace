import axios from "axios";
import { API_BASE_URL } from "../../config";

export async function removeItemFromCart(itemId) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/main/cartRemoveItem`,
      {
        itemId,
      },
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error; // Re-throw the error for handling at the call site
  }
}
