const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utilities/geocode");
const forecast = require("./utilities/forecast");

const app = express();
const viewsPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");
console.log(viewsPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    name: "use this site to get your weather",
    title: "Weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    // name: "",
    createdBy: "Fouziya Ashik",
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "New help",
    title: "Help",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "please provide valid search" });
  }
  geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(longitude, latitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    error: "page not found",
  });
});

//port
app.listen(5000, () => {
  console.log("up and running");
});

// console.log(path.join(__dirname, "../public/about.html"));

// app.use(express.static(path.join(__dirname, "../public")));
//root page
// app.get("", (req, res) => {
//   res.send("home page");
// });

//help page
// app.get("/help", (req, res) => {
//   res.send("help page");
// });

//about page
// app.get("/about", (req, res) => {
//   res.send("<h1>about page</h1>");
// });

//weather page
// app.get("/weather", (req, res) => {
//   res.send({
//     forecast: "partly cloud",
//     location: "Denmark",
//     features: [{ forecast: "partly cloud", location: "Denmark" }],
//   });
// });

// console.log(__dirname);
// console.log(__filename);
