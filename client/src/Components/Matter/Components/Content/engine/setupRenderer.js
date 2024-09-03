import Matter from "matter-js";

const setupRenderer = (canvasContainerRef, engine) => {
  const containerWidth = canvasContainerRef.current.offsetWidth;
  const containerHeight = canvasContainerRef.current.offsetHeight;

  const render = Matter.Render.create({
    element: canvasContainerRef.current,
    engine: engine,
    options: {
      width: containerWidth,
      height: containerHeight,
      background: "transparent",
      wireframes: false,
      showAngleIndicator: false,
    },
  });

  const canvas = render.canvas;
  canvas.style.zIndex = "0";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  Matter.Render.run(render);

  return render;
};

export default setupRenderer;
