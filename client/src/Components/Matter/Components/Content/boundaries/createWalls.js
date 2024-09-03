import Matter from "matter-js";

const createWalls = (world, containerWidth, containerHeight) => {
  const boundaryOptions = {
    isStatic: true,
    render: {
      visible: true,
      fillStyle: "#000000",
      strokeStyle: "#000000",
      lineWidth: 0,
    },
  };

  const wallThickness = 200;

  Matter.Composite.add(world, [
    Matter.Bodies.rectangle(
      containerWidth / 2,
      -wallThickness / 2,
      containerWidth,
      wallThickness,
      boundaryOptions
    ),
    Matter.Bodies.rectangle(
      containerWidth / 2,
      containerHeight + wallThickness / 2,
      containerWidth,
      wallThickness,
      boundaryOptions
    ),
    Matter.Bodies.rectangle(
      -wallThickness / 2,
      containerHeight / 2,
      wallThickness,
      containerHeight,
      boundaryOptions
    ),
    Matter.Bodies.rectangle(
      containerWidth + wallThickness / 2,
      containerHeight / 2,
      wallThickness,
      containerHeight,
      boundaryOptions
    ),
  ]);
};

export default createWalls;
