import { API_BASE_URL, API_BASE_CLIENT_URL } from "../../config";

export const isAuthenticated = async () => {
  try {
    // Make an API request to the server to check the user's authentication status.
    const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });
    if (response.status === 200) {
      // User is authenticated on the server.
      return true;
    } else {
      // User is not authenticated on the server.
      return false;
    }
  } catch (error) {
    console.error("Authentication check error:", error);
    return false; // Handle errors gracefully
  }
};
