import Matter from "matter-js";

const runCleanup = (renderRef, runnerRef, engineRef, mouseConstraintRef) => {
  if (renderRef.current) {
    Matter.Render.stop(renderRef.current);
  }
  if (runnerRef.current) {
    Matter.Runner.stop(runnerRef.current);
  }
  if (engineRef.current) {
    Matter.World.clear(engineRef.current.world, false);
    Matter.Engine.clear(engineRef.current);
  }
  if (mouseConstraintRef.current) {
    Matter.World.remove(engineRef.current.world, mouseConstraintRef.current);
  }
  if (renderRef.current?.canvas) {
    renderRef.current.canvas.remove();
  }
};

export default runCleanup;
