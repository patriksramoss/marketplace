import Matter from "matter-js";

const createEngine = () => {
  const engine = Matter.Engine.create();
  engine.world.gravity.y = 0; // Disable gravity
  return engine;
};

export default createEngine;
