import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { IoSettingsOutline } from "react-icons/io5";
import Container from "../../../Components/Container/Container";

// ICONS
import { loadIcon } from "../../../Helpers/iconLoader";

export async function fetchCategories() {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/categories`, {
      withCredentials: true,
    });

    if (response.data && Array.isArray(response.data)) {
      const categories = await Promise.all(
        response.data.map(async (cat) => {
          const IconComponent = await loadIcon(cat.icon);
          return {
            id: cat._id,
            title: cat.name,
            icon: IconComponent ? <IconComponent /> : null,
            description: cat.description,
            subcategories: cat.subcategories.map((sub) => ({
              id: sub._id,
              name: sub.name,
              description: sub.description,
              content: <Container loader={true} container={false} />,
            })),
            content: <Container loader={true} container={false} />,
          };
        })
      );
      return categories;
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
