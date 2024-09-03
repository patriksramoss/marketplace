export function CardShine() {
  "use strict";

  const mediaQuery = window.matchMedia("(min-width: 670px)");
  if (mediaQuery.matches) {
    let elements = document.querySelectorAll("#tilt");

    elements.forEach((el) => {
      const height = el.clientHeight;
      const width = el.clientWidth;
      const shine = el.querySelector("#shine"); // Ensure this is the correct selector

      el.addEventListener("mousemove", function (e) {
        const xVal = e.layerX;
        const yVal = e.layerY;

        const yRotation = 20 * ((xVal - width / 2) / width);
        const xRotation = -20 * ((yVal - height / 2) / height);

        const transformString = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        el.style.transform = transformString;

        const shineY = (yVal / height - 0.5) * 1000;
        shine.style.transform = `translateY(${shineY}px)`;
      });

      el.addEventListener("mouseout", function () {
        el.style.transform =
          "perspective(500px) scale(1) rotateX(0) rotateY(0)";
        shine.style.transform = "translateY(0px)";
      });

      el.addEventListener("mousedown", function () {
        el.style.transform =
          "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
      });

      el.addEventListener("mouseup", function () {
        el.style.transform =
          "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
      });
    });
  }
}
