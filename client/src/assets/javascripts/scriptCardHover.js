document.addEventListener("DOMContentLoaded", () => {
  CardHover();
});

export function CardHover() {
  "use strict";

  const mediaQuery = window.matchMedia("(min-width: 670px)");
  if (!mediaQuery.matches) return;

  document.querySelectorAll("#tilt").forEach((el) => {
    const height = el.clientHeight;
    const width = el.clientWidth;

    // Log dimensions for debugging
    // Ensure valid dimensions
    if (width <= 10 || height <= 10) {
      return;
    }

    const shine = el.querySelector("#shine");
    const rareShine = el.querySelector(".rare-shine");
    const rareTexture = el.querySelector(".rare-texture");
    const packShine = el.querySelector(".pack-shine");
    const rareShineInner = el.querySelector(".rare-shine-inner");

    // Add CSS class for animation
    if (rareShine) {
      rareShine.classList.add("animate-brightness");
    }

    const applyTransform = (xVal, yVal, scale = 1) => {
      const maxRotation = 15;
      const yRotation = maxRotation * ((xVal - width / 2) / width);
      const xRotation = -maxRotation * ((yVal - height / 2) / height);

      el.style.transform = `perspective(500px) scale(${scale}) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

      if (shine) {
        const gradientAngle = ((xVal - width / 2) / width) * 30;
        shine.style.transform = `translateY(${
          yVal - height / 2
        }px) rotate(${gradientAngle}deg) scale(1)`;
      }

      if (rareShine) {
        const opacity =
          (Math.abs(xVal / width - 0.5) * 1.2 +
            Math.abs(yVal / height - 0.5) * 1.8) /
          2;
        rareShine.style.filter = `brightness(${opacity})`;
      }

      if (rareShineInner) {
        const opacity =
          (Math.abs(xVal / width - 0.5) * 2 +
            Math.abs(yVal / height - 0.5) * 3) /
          2;
        rareShineInner.style.filter = `brightness(${opacity})`;
      }

      if (packShine) {
        const opacity =
          (Math.abs(xVal / width - 0.5) * 1.2 +
            Math.abs(yVal / height - 0.5) * 1.8) /
          2;
        packShine.style.filter = `brightness(${opacity})`;
      }
    };

    let backgroundPositionY = 0;
    const animateTexture = () => {
      backgroundPositionY = (backgroundPositionY + 1) % (height * 2);
      if (rareTexture) {
        rareTexture.style.backgroundPosition = `0px ${-backgroundPositionY}px`;
      }
      requestAnimationFrame(animateTexture);
    };

    animateTexture(); // Start the animation loop

    el.addEventListener("mousemove", (e) => {
      applyTransform(e.layerX, e.layerY, 1.1);
    });

    el.addEventListener("mouseout", () => {
      applyTransform(width / 2, height / 2, 1);
      if (rareShine) {
        rareShine.style.filter = `brightness(0)`;
      }
      if (rareShineInner) {
        rareShineInner.style.filter = `brightness(0)`;
      }
      if (packShine) {
        packShine.style.filter = `brightness(0)`;
      }
    });

    el.addEventListener("mousedown", () =>
      applyTransform(width / 2, height / 2, 0.9)
    );

    el.addEventListener("mouseup", () => {
      applyTransform(width / 2, height / 2, 1.1);
      if (rareShine) {
        rareShine.style.filter = `brightness(0)`;
      }
      if (rareShineInner) {
        rareShineInner.style.filter = `brightness(0)`;
      }
      if (packShine) {
        packShine.style.filter = `brightness(0)`;
      }
    });
  });
}
