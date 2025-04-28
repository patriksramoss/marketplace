import axios from "axios";
import { API_BASE_URL } from "../../../config";
import userStore from "../../../Stores/User";

export async function addToCart(itemId, quantity) {
  userStore.setLoading("cart", true);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/main/addToCart`,
      {
        itemId,
        quantity,
      },
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    userStore.setLoading("cart", false);
    return response.data;
  } catch (error) {
    userStore.setLoading("cart", false);
    console.error("Error adding to cart:", error);
    throw error; // Re-throw the error for handling at the call site
  }
}
