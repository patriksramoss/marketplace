import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { IoSettingsOutline } from "react-icons/io5";
import Container from "../../../Components/Container/Container";

export async function fetchCategories() {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/categories`, {
      withCredentials: true,
    });

    return response.data.map((cat) => ({
      id: cat._id, // MongoDB ID
      title: cat.name,
      icon: <IoSettingsOutline />, // Default icon, replace if needed
      description: cat.description,
      subcategories: cat.subcategories.map((sub) => ({
        id: sub._id, // MongoDB ID
        name: sub.name,
        description: sub.description,
        content: <Container loader={true} container={false} />,
      })),
      content: <Container loader={true} container={false} />,
    }));
  } catch (error) {
    console.error("Error fetching categoriesSecondary:", error);
    throw error; // Re-throw the error to be handled in the store
  }
}
