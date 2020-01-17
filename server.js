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
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`;

  axios({
    url: url,
    responseType: "json"
  }).then(data => {

    // dateObj = new Date(data.data.currently.time * 1000);
    // utcString = dateObj.toUTCString();
    // //console.log(utcString)
    // var localDate = new Date(utcString);
    
    // let test = convertUTCDateToLocalDate(localDate)
    // //console.log(test)
    // time = utcString.slice(-11, -4);
 //console.log(data.data.timezone)

    res.json(data.data);
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  console.log("Server Ready on port 3000...");
  port = 3000;
}
app.listen(port);


// function convertUTCDateToLocalDate(date) {
//   var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
// //console.log(date.getTime())
// //console.log(date.getTimezoneOffset())


//   var offset = date.getTimezoneOffset() / 60;
//   var hours = date.getHours();

//   newDate.setHours(hours - offset);

//   return newDate;   
// }

// app.listen(4000, () => {
//   console.log("Server Ready on port 4000...");
// });
