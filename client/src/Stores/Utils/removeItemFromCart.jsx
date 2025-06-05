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
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}
