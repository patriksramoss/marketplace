import Hammer from "hammerjs";
export function CardSwipe() {
  var isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  var packContainer = document.querySelector(".pack");
  var allCards = document.querySelectorAll(".packCard");

  //audio
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var audioBuffers = [];

  var cardSwipe = new Array(
    "/src/assets/sound/cardSwipe/1.mp3",
    "/src/assets/sound/cardSwipe/2.mp3",
    "/src/assets/sound/cardSwipe/3.mp3",
    "/src/assets/sound/cardSwipe/4.mp3",
    "/src/assets/sound/cardSwipe/5.mp3",
    "/src/assets/sound/cardSwipe/6.mp3",
    "/src/assets/sound/cardSwipe/7.mp3",
    "/src/assets/sound/cardSwipe/8.mp3",
    "/src/assets/sound/cardSwipe/9.mp3",
    "/src/assets/sound/cardSwipe/10.mp3"
  );

  // Load audio files
  function loadAudioFiles() {
    let loadCount = 0;

    cardSwipe.forEach((url, index) => {
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((data) => audioContext.decodeAudioData(data))
        .then((buffer) => {
          audioBuffers[index] = buffer;
          loadCount++;
          if (loadCount === cardSwipe.length) {
            initCards();
          }
        })
        .catch((error) => console.error("Error loading audio file:", error));
    });
  }

  function playSwipe() {
    const source = audioContext.createBufferSource();
    const randomIndex = Math.floor(Math.random() * cardSwipe.length);
    const buffer = audioBuffers[randomIndex];

    if (buffer) {
      source.buffer = buffer;
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start();
    }
  }

  function initCards() {
    const newCards = document.querySelectorAll(".packCard:not(.removed)");

    newCards.forEach((card, index) => {
      card.style.zIndex = allCards.length - index;
    });

    if (packContainer) {
      packContainer.classList.add("loaded");
    }

    if (newCards.length === 0 && packContainer) {
      window.location.href = "/table";
    }
  }

  loadAudioFiles();

  const handlePan = (el) => {
    const hammertime = new Hammer(el);
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    hammertime.on("panstart", () => el.classList.add("moving"));
    hammertime.on("panmove", (event) => {
      if (event.deltaX === 0 && event.deltaY === 0) return;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;
      el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
    });

    hammertime.on("panend", (event) => {
      el.classList.remove("moving");
      const moveOutWidth = document.body.clientWidth;
      const moveOutHeight = document.body.clientHeight;
      const keep = Math.abs(event.deltaX) < 80 && Math.abs(event.deltaY) < 80;
      el.classList.toggle("removed", !keep);

      if (keep) {
        el.style.transform = "";
      } else {
        const endX = Math.max(
          Math.abs(event.velocityX) * moveOutWidth,
          moveOutWidth
        );
        const endY = Math.max(
          Math.abs(event.velocityY) * moveOutHeight,
          moveOutHeight
        );
        const toX = event.deltaX > 0 ? endX : -endX;
        const toY = event.deltaY > 0 ? endY : -endY;
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        el.style.transform = `translate(${toX}px, ${toY}px) rotate(${rotate}deg)`;
        playSwipe();
        initCards();
      }
    });
  };

  if (packContainer && allCards.length) {
    allCards.forEach(handlePan);
  }
}
