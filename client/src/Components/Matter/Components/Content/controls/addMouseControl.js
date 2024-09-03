import Matter from "matter-js";

const addMouseControl = (render, engine) => {
  const mouse = Matter.Mouse.create(render.canvas);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Matter.Composite.add(engine.world, mouseConstraint);
  render.mouse = mouse;

  return { mouseConstraint, mouse };
};

export default addMouseControl;
