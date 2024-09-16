export async function loadIcon(iconName) {
  try {
    const iconModule = await import("@ant-design/icons");
    return iconModule[iconName] || null; // Return the icon component if found
  } catch (error) {
    console.error(`Failed to load icon ${iconName}`, error);
    return null; // Return null if import fails
  }
}
