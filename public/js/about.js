const bar = document.querySelector("#icon2");
const menu = document.querySelector("#links1");

bar.addEventListener("click", () => {
  menu.classList.toggle("links");
});
