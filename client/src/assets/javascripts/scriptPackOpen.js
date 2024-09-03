const openPack = document.querySelectorAll(".open-pack");

openPack.forEach((openPack) => {
  openPack.addEventListener("click", (e) => {
    const clicked = e.target.closest("div.open-pack");

    location.href = `/main/pack/open/${clicked.id}`;
  });
});
