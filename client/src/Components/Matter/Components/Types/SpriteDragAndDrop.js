import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { updatePositions } from "../Helpers/SpritePositioning";

import createEngine from "../Content/engine/createEngine";
import setupRenderer from "../Content/engine/setupRenderer";
import createWalls from "../Content/boundaries/createWalls";
import createSprites from "../Content/sprites/createSprites";
import createDropArea from "../Content/dropArea/createDropArea";
import addMouseControl from "../Content/controls/addMouseControl";
import runCleanup from "../Content/cleanup/runCleanup";

const SpriteDragAndDrop = (canvasContainerRef, props) => {
  const { spriteImage, dropAreaImage } = props;
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const spriteBodiesRef = useRef([]);
  const dropAreaRef = useRef(null);
  const mouseConstraintRef = useRef(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const initializeSimulation = () => {
      const engine = createEngine();
      const world = engine.world;

      const containerWidth = canvasContainerRef.current.offsetWidth;
      const containerHeight = canvasContainerRef.current.offsetHeight;

      const render = setupRenderer(canvasContainerRef, engine);
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      createWalls(world, containerWidth, containerHeight);

      const spriteBodies = createSprites(
        world,
        spriteImage,
        containerWidth,
        containerHeight,
        5
      );
      spriteBodiesRef.current = spriteBodies;

      const dropArea = createDropArea(
        world,
        containerWidth,
        containerHeight,
        dropAreaImage
      );
      dropAreaRef.current = dropArea;

      const { mouseConstraint, mouse } = addMouseControl(render, engine);
      mouseConstraintRef.current = mouseConstraint;

      let mouseDown = false;
      const updateCursorStyle = () => {
        if (!render.canvas) return;
        const touchingMouse =
          Matter.Query.point(world.bodies, mouse.position).length > 0;
        render.canvas.style.cursor = touchingMouse
          ? mouseDown
            ? "grabbing"
            : "grab"
          : "default";
      };

      Matter.Events.on(engine, "beforeUpdate", () => {
        updateCursorStyle();

        spriteBodiesRef.current.forEach((spriteBody) => {
          if (spriteBody && dropArea) {
            const spriteBounds = Matter.Bounds.create(spriteBody.vertices);
            const dropAreaBounds = Matter.Bounds.create(dropArea.vertices);

            if (Matter.Bounds.overlaps(spriteBounds, dropAreaBounds)) {
              Matter.Composite.remove(world, spriteBody);
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

      engineRef.current = engine;
      renderRef.current = render;
      runnerRef.current = runner;
    };

    initializeSimulation();
    updatePositions(canvasContainerRef, spriteBodiesRef, dropAreaRef);

    const handleResize = () => {
      updatePositions(canvasContainerRef, spriteBodiesRef, dropAreaRef);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      runCleanup(renderRef, runnerRef, engineRef, mouseConstraintRef);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasContainerRef, props]);
};

export default SpriteDragAndDrop;
