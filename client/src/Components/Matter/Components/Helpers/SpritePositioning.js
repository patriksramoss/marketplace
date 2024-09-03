import Matter from "matter-js";

export const updatePositions = (
  canvasContainerRef,
  spriteBodiesRef,
  dropAreaRef
) => {
  if (!canvasContainerRef.current) return;

  const containerWidth = canvasContainerRef.current.offsetWidth;
  const containerHeight = canvasContainerRef.current.offsetHeight;
  const isSmallScreen = window.matchMedia("(max-width: 40rem)").matches;

  if (dropAreaRef.current) {
    if (isSmallScreen) {
      Matter.Body.setPosition(dropAreaRef.current, {
        x: containerWidth / 2,
        y: containerHeight - 500,
      });
    } else {
      Matter.Body.setPosition(dropAreaRef.current, {
        x: containerWidth - 200,
        y: containerHeight / 2,
      });
    }
  }

  spriteBodiesRef.current.forEach((spriteBody) => {
    if (isSmallScreen) {
      Matter.Body.setPosition(spriteBody, {
        x: Math.random() * (containerWidth - 100),
        y: Math.random() * (containerHeight / 2) + 400,
      });
    } else {
      Matter.Body.setPosition(spriteBody, {
        x: Math.random() * (containerWidth / 4) + 50,
        y: containerHeight / 2 + Math.random() * 100 - 50,
      });
    }
  });
};
