if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const axios = require("axios");
var moment = require('moment');
//moment().format();
const express = require("express");
const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/weather", (req, res) => {
  console.log(req.body);
  console.log(Math.floor(Math.random() * 3));
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=us`;

  axios({
    url: url,
    responseType: "json"
  }).then(data => {


    res.json(data.data);
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  console.log("Server Ready on port 3000...");
  port = 3000;
}
app.listen(port);

