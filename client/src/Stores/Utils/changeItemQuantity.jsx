import axios from "axios";
import { API_BASE_URL } from "../../config";

export async function changeItemQuantity(itemId, value, override) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/main/cartChangeItemQuantity`,
      {
        itemId,
        value,
        override,
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
