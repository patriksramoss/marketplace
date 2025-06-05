import Matter from "matter-js";

const createDropArea = (
  world,
  containerWidth,
  containerHeight,
  dropAreaImage
) => {
  const dropAreaWidth = 200;
  const dropAreaHeight = 200;

  const dropArea = Matter.Bodies.rectangle(
    containerWidth / 2,
    containerHeight / 2,
    dropAreaWidth,
    dropAreaHeight,
    {
      isStatic: true,
      render: {
        sprite: dropAreaImage
          ? {
              texture: dropAreaImage,
              xScale: 0.2,
              yScale: 0.2,
            }
          : undefined,
        fillStyle: dropAreaImage ? undefined : "red",
      },
    }
  );

  Matter.Composite.add(world, dropArea);
  return dropArea;
};

export default createDropArea;
