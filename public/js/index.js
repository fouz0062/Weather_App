// console.log("I'm here");

// fetch("http://localhost:5000/weather?address=!").then((res) => {
//   res.json().then((res1) => {
//     if (res1.err) {
//       console.log(res1.err);
//     } else {
//       console.log(res1.location, res1.forecast);
//     }
//   });
// });

const weather = document.querySelector("form");
const input = document.querySelector("input");
const locationMessage = document.querySelector("#locationMessage");
const forecastMessage = document.querySelector("#forecastMessage");
const bar = document.querySelector("#icon2");
const menu = document.querySelector("#links1");

weather.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = input.value;
  locationMessage.textContent = "Loading.....";
  forecastMessage.textContent = "";
  fetch(`http://localhost:5000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.err) {
          locationMessage.textContent = data.err;
        } else {
          locationMessage.textContent = data.location;
          forecastMessage.textContent = data.forecast;
        }
      });
    }
  );
});

bar.addEventListener("click", () => {
  menu.classList.toggle("links");
});
