export async function loadIcon(iconName) {
  try {
    const iconModule = await import("@ant-design/icons");
    return iconModule[iconName] || null;
  } catch (error) {
    console.error(`Failed to load icon ${iconName}`, error);
    return null;
  }
}
