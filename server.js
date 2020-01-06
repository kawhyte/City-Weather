if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.post('/weather', (req, res) => {
  console.log(req.body)
 const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY }/${req.body.latitude},${req.body.longitude}?units=auto`

 axios({
  url: url,
  responseType: 'json'
}).then(data => res.json(data.data.currently))

});



let port = process.env.PORT;
if (port == null || port == "") {
  console.log("Server Ready on port 8000...");
  port = 8000;
}
app.listen(port);

// app.listen(4000, () => {
//   console.log("Server Ready on port 4000...");
// });
