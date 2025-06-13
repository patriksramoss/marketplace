import axios from "axios";
import { API_BASE_URL } from "../../config";
import Container from "../../Components/Container/Container";
// ICONS
import { loadIcon } from "../../Helpers/iconLoader";

export async function getProduct(itemId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/getProduct`, {
      params: { itemId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
}

export async function addToCart(itemId, quantity) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/main/addToCart`,
      {
        itemId,
        quantity,
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

export async function fetchContent(categoryId = null) {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/contentByCategory`, {
      params: { categoryId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}

export async function searchItems(search) {
  try {
    const response = await axios.get(`${API_BASE_URL}/main/searchForItems`, {
      params: { search },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}
