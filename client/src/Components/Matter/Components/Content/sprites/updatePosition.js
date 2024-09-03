import Matter from "matter-js";
const updatePositions = (canvasContainerRef, spriteBodiesRef, dropAreaRef) => {
  if (!canvasContainerRef.current) return;

  const containerWidth = canvasContainerRef.current.offsetWidth;
  const containerHeight = canvasContainerRef.current.offsetHeight;

  spriteBodiesRef.current.forEach((spriteBody) => {
    Matter.Body.setPosition(spriteBody, {
      x: Math.random() * (containerWidth / 4) + 50,
      y: containerHeight / 2 + Math.random() * 100 - 50,
    });
  });

  if (dropAreaRef.current) {
    Matter.Body.setPosition(dropAreaRef.current, {
      x: containerWidth / 2,
      y: containerHeight / 2,
    });
  }
};

export default updatePositions;
