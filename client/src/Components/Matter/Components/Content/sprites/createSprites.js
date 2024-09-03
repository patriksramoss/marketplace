import Matter from "matter-js";

const createSprites = (
  world,
  sprite,
  containerWidth,
  containerHeight,
  numSprites
) => {
  const spriteWidth = 85;
  const spriteHeight = 85;
  const leftMargin = 50;

  const spritePositions = Array.from({ length: numSprites }, () => ({
    x: Math.random() * (containerWidth / 4) + leftMargin,
    y: containerHeight / 2 + Math.random() * 100 - 50,
  }));

  const spriteBodies = spritePositions.map((pos) =>
    Matter.Bodies.rectangle(pos.x, pos.y, spriteWidth, spriteHeight, {
      frictionAir: 0.05,
      restitution: 0.8,
      render: {
        sprite: {
          texture: sprite,
          xScale: 0.2,
          yScale: 0.2,
        },
      },
    })
  );

  Matter.Composite.add(world, spriteBodies);

  return spriteBodies;
};

export default createSprites;
