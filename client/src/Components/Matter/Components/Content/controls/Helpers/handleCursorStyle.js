import Matter from "matter-js";
const handleCursorStyle = (render, mouse, spriteBodiesRef) => {
  const updateCursorStyle = () => {
    if (!render.canvas) return;
    const touchingMouse =
      Matter.Query.point(spriteBodiesRef.current, mouse.position).length > 0;
    render.canvas.style.cursor = touchingMouse ? "grab" : "default";
  };

  let mouseDown = false;

  Matter.Events.on(render.engine, "beforeUpdate", () => {
    updateCursorStyle();

    spriteBodiesRef.current.forEach((spriteBody) => {
      if (spriteBody && dropAreaRef.current) {
        const spriteBounds = Matter.Bounds.create(spriteBody.vertices);
        const dropAreaBounds = Matter.Bounds.create(
          dropAreaRef.current.vertices
        );

        if (Matter.Bounds.overlaps(spriteBounds, dropAreaBounds)) {
          Matter.Composite.remove(render.engine.world, spriteBody);
        }
      }
    });
  });

  if (render.canvas) {
    render.canvas.addEventListener("mousedown", () => {
      mouseDown = true;
      updateCursorStyle();
    });

    render.canvas.addEventListener("mouseup", () => {
      mouseDown = false;
      updateCursorStyle();
    });
  }
};

export default handleCursorStyle;
