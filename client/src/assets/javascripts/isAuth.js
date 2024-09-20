import { API_BASE_URL } from "../../config";

export const isAuthenticated = async () => {
  try {
    // Make an API request to the server to check the user's authentication status.
    const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });

    if (response.ok) {
      // Checks if response status is 200-299
      return true; // User is authenticated
    } else if (response.status === 401) {
      // User is not authenticated, handle this case quietly
      return false;
    } else {
      // Handle any other unexpected status
      console.warn("Unexpected response status:", response.status);
      return false;
    }
  } catch (error) {
    // Handle network errors or other unexpected issues without logging the error
    console.warn("Authentication check encountered an error:", error);
    return false; // Return false for any errors
  }
};
