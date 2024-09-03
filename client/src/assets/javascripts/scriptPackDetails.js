export function PackDetails() {
  const collectionItems = document.querySelectorAll(".collection-item-pack");

  collectionItems.forEach((collectionItem) => {
    collectionItem.addEventListener("click", (e) => {
      const clicked = e.target.closest("div.collection-item-pack");
      location.href = `/pack/${clicked.id}`;
    });
  });

  return () => {
    // Cleanup event listeners if necessary
    collectionItems.forEach((collectionItem) => {
      collectionItem.removeEventListener("click", handleItemClick);
    });
  };
}
