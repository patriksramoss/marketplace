import GlowParticle from "./glowParticle.js";

//BLUE & GREEN
// const COLORS = [
//   { r: 0, g: 0, b: 173 },
//   { r: 0, g: 91, b: 173 },
//   { r: 0, g: 131, b: 173 },
//   { r: 0, g: 167, b: 173 },
//   { r: 2, g: 222, b: 174 },
// ];

//BLUE PRUPLE ISH
// const COLORS = [
//   { r: 185, g: 131, b: 255 },
//   { r: 148, g: 179, b: 253 },
//   { r: 148, g: 218, b: 255 },
//   { r: 153, g: 254, b: 255 },
// ];

//COLOR MIX
const COLORS = [
  { r: 255, g: 87, b: 87 }, // Red - #FF5757
  { r: 255, g: 202, b: 58 }, // Yellow - #FFCA3A
  { r: 85, g: 239, b: 196 }, // Green - #55EFC4
  { r: 72, g: 149, b: 239 }, // Blue - #4895EF
  { r: 163, g: 97, b: 255 }, // Purple - #A361FF
];

// const COLORS = [
//   { r: 251, g: 141, b: 160 },
//   { r: 251, g: 107, b: 144 },
//   { r: 251, g: 107, b: 144 },
// ];

//purple
// const COLORS = [
//   { r: 137, g: 0, b: 98 },
//   { r: 190, g: 0, b: 128 },
//   { r: 255, g: 0, b: 143 },
//   { r: 62, g: 0, b: 148 },
//   { r: 102, g: 0, b: 215 },
// ];

// const COLORS = [
//   { r: 45, g: 74, b: 227 },
//   { r: 250, g: 255, b: 89 },
//   { r: 255, g: 104, b: 248 },
//   { r: 54, g: 233, b: 84 },
//   { r: 44, g: 209, b: 252 },
// ];

// const COLORS = [
//   { r: 248, g: 225, b: 214 },
//   { r: 250, g: 255, b: 89 },
//   { r: 54, g: 233, b: 84 },
//   { r: 45, g: 74, b: 227 },
//   { r: 248, g: 145, b: 134 },
// ];

export default class BackgroundAnimation {
  constructor(element) {
    this.canvas = document.createElement("canvas");
    this.span = document.createElement("span");

    this.canvas.className = "background-canvas";
    this.span.className = "background-span";

    element.appendChild(this.canvas);
    element.appendChild(this.span);

    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.totalParticles = 5;
    this.particles = [];
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.maxRadius =
      Math.sqrt(this.stageWidth ** 2.2 + this.stageHeight ** 2) / 2;
    this.minRadius = this.maxRadius;
    // Throttle the resize event to improve performance
    let resizeTimeout;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(this.resize.bind(this), 200);
      },
      false
    );

    this.isScrolling = false;
    window.addEventListener("scroll", this.handleScroll.bind(this));

    this.resize();

    this.createParticles();

    // Save the current time to calculate deltaTime in animate
    this.lastTime = performance.now();
    // window.requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame((t) => this.animate(t));
  }

  handleScroll() {
    // User started scrolling
    this.isScrolling = true;
    // Cancel the animation
    window.cancelAnimationFrame(this.animationFrameId);
    // Set a timeout to check if scrolling has stopped after a delay
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      // Restart the animation
      this.animationFrameId = window.requestAnimationFrame((t) =>
        this.animate(t)
      );
    }, 100); // 100ms delay
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    // this.stageHeight = document.documentElement.scrollHeight;

    this.canvas.width = this.canvas.width && this.stageWidth * this.pixelRatio;
    this.canvas.height =
      this.canvas.width && this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // this.ctx.globalCompositeOperation = "xor";
    // this.ctx.globalCompositeOperation = "saturation";
    // this.ctx.globalCompositeOperation = "lighter";
    // this.ctx.globalCompositeOperation = "overlay";
    // this.ctx.globalCompositeOperation = "color-dodge";
    // this.ctx.globalCompositeOperation = "color-burn";
    // this.ctx.globalCompositeOperation = "hard-light";
    // this.ctx.globalCompositeOperation = "soft-light";
    // this.ctx.globalCompositeOperation = "difference";
    // this.ctx.globalCompositeOperation = "exclusion";
    // this.ctx.globalCompositeOperation = "hue";
    // this.ctx.globalCompositeOperation = "color";
    // this.ctx.globalCompositeOperation = "luminosity";

    // this.createParticles();
  }

  createParticles() {
    let curColor = 0;
    this.particles = [];

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        (Math.random() * (this.stageWidth * 0.47)) / 4,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      );

      if (++curColor >= COLORS.length) {
        curColor = 0;
      }

      this.particles[i] = item;
    }
  }

  destroy() {
    // Cancel the animation frame to stop the animation
    window.cancelAnimationFrame(this.animationFrameId);

    // Remove the canvas element from the DOM
    this.canvas.remove();

    // Nullify properties to help with garbage collection
    this.ctx = null;
    this.canvas = null;
    this.particles = null;
  }

  animate(t) {
    if (this.isScrolling || !this.ctx) return;

    let deltaTime = t - this.lastTime;
    this.lastTime = t;

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight, deltaTime);
    }

    // Save the ID of the animation frame so we can cancel it later
    this.animationFrameId = window.requestAnimationFrame(
      this.animate.bind(this)
    );
  }
}
