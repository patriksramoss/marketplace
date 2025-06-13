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

export async function clearCart() {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/clearCart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
}

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
