import { API_BASE_URL } from "../../config";

export const isAuthenticated = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 200) {
      return true;
    } else if (response.status === 201) {
      return false;
    } else {
      console.warn("Unexpected response status:", response.status);
      return false;
    }
  } catch (error) {
    return false;
  }
};
