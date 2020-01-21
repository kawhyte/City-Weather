// DOM elements
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
let background_image = document.getElementById("bg").style.background;
const name = document.getElementById("name");
const focus = document.getElementById("focus");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const temperatureDescription = document.querySelector(
  ".temperature-decription"
);
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimezone = document.querySelector(".location-timezone");
const temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");
const temperatureF = document.querySelector(".degree-section > span");
const newTime = document.querySelector(".new-time");
const searchElement = document.querySelector("[data-city-search]");

function defaultValue() {
  document.getElementById("bg").style.background =
    "url('./img/sunset_bg.svg') center/cover";

    
}

window.onload = defaultValue;

//document.addEventListener("DOMContentLoaded", function() {
  // Google API
  
//   document.getElementById('name').onkeyup=function(e){
//     if(e.keyCode==13){
//       console.log("sigh "+e);
//         //document.getElementById('mybtn').click();
//     }
// }
//activatePlacesSearch();
//   console.log("Entered main ELtnr")
//  name.addEventListener('keypress', function(e){
//     console.log("EEEEE "+e.type)
//     console.log("EEEEE "+ e.which )
//     console.log("EEEEE "+e.keyCode)
//     console.log("EEEEE "+e.keyCode)
//   })

//function activatePlacesSearch(){
  
//let searchElement = document.getElementById('name');
//const searchBox = new google.maps.places.SearchBox(searchElement);
const searchBox = new google.maps.places.Autocomplete(searchElement);

console.log("searchBox"+ searchBox)
console.log("test")
  

  
 
//set focus
// function setFocus(e) {
//   if (e.type === "keypress") {
//     if (e.which === 13 || e.keyCode === 13) {
//       localStorage.setItem("focus", e.target.innerText);
//       focus.blur();
//     }
//   } else {
//     localStorage.setItem("focus", e.target.innerText);
//   }
// }


  google.maps.event.addListener(searchBox,"place_changed", () => {
  //searchBox.addListener("places_changed", () => {
    
    console.log('test2')
    //const place = searchBox.getPlaces()[0];
    const place = searchBox.getPlace();

    if (place == null) {
      console.log("place is null");
      return;
    }
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    fetch("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude
      })
    })
      .then(res => res.json())
      .then(data => {
        setWeatherData(data, place.formatted_address);
      });

    searchElement.value = null;
    document.getElementById("buildings").classList.remove("fade-in");
  });

  const icon = new Skycons({ color: "#FFF" });
  const locationElement = document.querySelector("[data-location]");
  const statusElement = document.querySelector("[data-status]");
  const temperatureElement = document.querySelector("[data-temperature]");
  const precipitationElement = document.querySelector("[data-precipitation]");
  const windElement = document.querySelector("[data-wind]");
  const timeElement = document.querySelector("[data-time]");
  const humidityElement = document.querySelector("[data-humidity]");
  icon.set("icon", "clear-day");
  icon.play();

  function setWeatherData(data, place) {
    locationElement.textContent = place;
    temperatureElement.textContent = Math.floor(data.currently.temperature) + "°";
    precipitationElement.textContent = `${data.currently.precipProbability *
      100}%`;
    windElement.textContent = data.currently.windSpeed;
    humidityElement.textContent = data.currently.humidity;
    statusElement.textContent = data.currently.summary;
    timeElement.textContent = moment
      .tz(moment(), data.timezone)
      .format("h:mm:a");

    icon.set("icon", data.currently.icon);
    icon.play();

    //Sky background
    setSkyColor(moment.tz(moment(), data.timezone).format("H"));
     //Build weather condition
    weatherRecipe(data.currently.summary)
    setBuildings()
  }
//}

function setBuildings(){

let number = Math.ceil(Math.random() * 5); // add random number here 
  console.log("Building random number is:  " + number);
    let buildings = {
      1: "./img/chicago.svg",
      2: "./img/world_3020.svg",
      3: "./img/miami.svg",
      4:"./img/buildings.svg",
      5:"./img/mountain_1.svg"
    };


    console.log(buildings[number])
    if (
      typeof buildings[number] === "undefined" &&
      buildings[number] === null
    ) {
      console.log( "Here")
      document.getElementById("buildings").style.src =
        "./img/chicago.svg";
      return;
    }

    document.getElementById("buildings").src = buildings[number];

    document.getElementById("buildings").classList.add("fade-in");

}

function weatherRecipe(currentWeather) {

 if (wordInString(currentWeather, "snow")) {
  letItSnow();
  //setInterval(drawFlakes, 30);
} else if (wordInString(currentWeather, "rain")) {
  makeItRain();
} else if (wordInString(currentWeather, "sunny")) {
  //makeItRain();
} else if (wordInString(currentWeather, "cloudy")) {
  //letItSnow();
} else {
  //letItSnow();
}


  }

  function wordInString(s, word) {
    return new RegExp("\\b" + word + "\\b", "i").test(s);
  }

  //RAIN//
  function makeItRain() {
    canvas = document.getElementById("sky");
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      var w = canvas.width;
      var h = canvas.height;
      ctx.strokeStyle = "rgba(174,194,224,0.5)";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      var init = [];
      var maxParts = 1000;
      for (var a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: Math.random() * 1,
          xs: -4 + Math.random() * 4 + 2,
          ys: Math.random() * 10 + 10
        });
      }
      var particles = [];
      for (var b = 0; b < maxParts; b++) {
        particles[b] = init[b];
      }
      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (var c = 0; c < particles.length; c++) {
          var p = particles[c];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          ctx.stroke();
        }
        move();
      }
      function move() {
        for (var b = 0; b < particles.length; b++) {
          var p = particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) {
            p.x = Math.random() * w;
            p.y = -20;
          }
        }
      }
      setInterval(draw, 30);
    }
  }
  //RAIN END//



 /// Snow effect  //
  function letItSnow(){
    let canvas = document.getElementById("sky");
    let ctx = canvas.getContext("2d");
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    let mf = 100;
    let flakes = [];
    for (let i = 0; i < mf; i++) {
      flakes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 5 + 2,
        d: Math.random() + 1
      });
    }
    // draw flakes
    function drawFlakes() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "white";
      ctx.beginPath();
      for (let i = 0; i < mf; i++) {
        let f = flakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      moveFlakes();
    }
    // animate flakes
    let angle = 0;
    function moveFlakes() {
      angle += 0.01;
      for (let i = 0; i < mf; i++) {
        let f = flakes[i];
        f.y += Math.pow(f.d, 2) + 1;
        f.x += Math.sin(angle) * 2;
        if (f.y > H) {
          flakes[i] = { x: Math.random() * W, y: 0, r: f.r, d: f.d };
        }
      }
    }
    setInterval(drawFlakes, 30);
  }
  //SNOW END//





  // //set background
  function setSkyColor(hour) {

    console.log("From Greeting: " + hour);
    let skyGradient = {
      1: "#00000c",
      2: "linear-gradient(to bottom, #020111 85%,#191621 100%)",
      3: "linear-gradient(to bottom, #020111 10%,#3a3a52 100%)",
      4: "linear-gradient(to bottom, #20202c 0%,#515175 100%)",
      5: "linear-gradient(to bottom, #40405c 0%,#6f71aa 80%,#8a76ab 100%)",
      6: "linear-gradient(to bottom, #4a4969 0%,#7072ab 50%,#cd82a0 100%)",
      7: "linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)",
      8: "linear-gradient(to bottom, #82addb 0%,#ebb2b1 100%)",
      9: "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)",
      10: "linear-gradient(to bottom, #b7eaff 0%,#94dfff 100%)",
      11: "linear-gradient(to bottom, #90dffe 0%,#38a3d1 100%)",
      13: "linear-gradient(to bottom, #57c1eb 0%,#246fa8 100%)",
      14: "linear-gradient(to bottom, #2d91c2 0%,#1e528e 100%)",
      15: "linear-gradient(to bottom, #2473ab 0%,#1e528e 70%,#5b7983 100%)",
      16: "linear-gradient(to bottom, #1e528e 0%,#265889 50%,#9da671 100%)",
      17: "linear-gradient(to bottom, #1e528e 0%,#728a7c 50%,#e9ce5d 100%)",
      18: "linear-gradient(to bottom, #154277 0%,#576e71 30%,#e1c45e 70%,#b26339 100%)",
      19: "linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%",
      20: "linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%",
      21: "linear-gradient(to bottom, #010A10 30%,#59230B 80%,#2F1107 100%",
      22: "linear-gradient(to bottom, #090401 50%,#4B1D06 100%",
      23: "linear-gradient(to bottom, #00000c 80%,#150800 100%",
      24: "#00000c"
    };


    console.log(skyGradient[hour])
    if (
      typeof skyGradient[hour] === "undefined" &&
      skyGradient[hour] === null
    ) {
      console.log( "Here")
      document.getElementById("bg").style.background =
        "url('./img/clear_blue_sky.svg') center/cover";
      return;
    }

    document.getElementById("bg").style.background = skyGradient[hour];
  }
//});

function converTime(localTimeZone) {
  let militaryTime = moment.tz(moment(), localTimeZone).format("h:mm:a");
  let hour = moment.tz(moment(), localTimeZone).format("HH");

  console.log("Military Time " + militaryTime);

  if (hour > 12) {
    moment.tz(moment(), localTimeZone).format("hh:mm:");
  } else {
    moment.tz(moment(), localTimeZone).format("hh:mm:a");
  }
  // Time
  // newlocalTime = new Date(localTime*1000);
  // console.log("newlocalTime "+newlocalTime);

  console.log("Convert - hour " + hour);
  console.log("Convert - min " + minutes);
  //console.log(hour +":"+ minutes)

  //setGreeting(hour);
  // 12 Format
  hour = hour % 12 || 12;
  //console.log("Minutes:" + minutes);
  //console.log("Hour:" + hour);
  //return localTime;
  return hour + ":" + minutes;

  //timeElement.textContent = `${hour}+${minutes} +${
  //  hour < 12 ? " AM" : " PM"
  //}`;
  // newTime.innerHTML = `${hour}<span>:</span>${minutes} <span>${
  //    hour < 12 ? " AM" : " PM"
  //  }</span>`;

  //
}
//       temperatureDegree.textContent = Math.round(temperature);
//       temperatureDescription.textContent = summary;
//       locationTimezone.textContent = data.timezone;
//       console.log("time" + time)
//       console.log(time * 1000)

//       // Time
//       localTime = new Date(time *1000);
//       let hour = localTime.getHours();
//       let minutes = localTime.getMinutes();
//       console.log(time);
//       console.log(localTime);
//       console.log(hour +":"+ minutes)
//       setGreeting(hour);
//       // 12 Format
//       hour = hour % 12 || 12;
//       console.log("Hour:" + hour);
//       newTime.innerHTML = `${hour}<span>:</span>${minutes} <span>${
//         hour < 12 ? " AM" : " PM"
//       }</span>`;

window.addEventListener("load", () => {
  //   let long, lat;
  //   //const proxy = "https://cors-anywhere.herokuapp.com/";
  //   //let api = `${proxy}https://api.darksky.net/forecast/148e03bac53ba45c90e6d64486bc1e62/39.530895,-119.814972`;
  //   // if (navigator.geolocation) {
  //   //   navigator.geolocation.getCurrentPosition(position => {
  //   //     // long = position.coords.longitude;
  //   //     // lat = position.coords.latitude;
  //   //     // api = `${proxy}https://api.darksky.net/forecast/148e03bac53ba45c90e6d64486bc1e62/${lat},${long}`;
  //   //     api = `${proxy}https://api.darksky.net/forecast/148e03bac53ba45c90e6d64486bc1e62/${-119.814972},${-119.814972}`;
  //   //   });
  //   // }
  //   //document.body.style.backgroundImage = "url('/img/background_night.svg')";
  //   fetch(api)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //       // const { temperature, summary, icon } = data.currently;
  //       const { temperature, time } = data.currently;
  //       const { summary, icon } = data.hourly;
  //       temperatureDegree.textContent = Math.round(temperature);
  //       temperatureDescription.textContent = summary;
  //       locationTimezone.textContent = data.timezone;
  //       console.log("time" + time)
  //       console.log(time * 1000)
  //       // Time
  //       localTime = new Date(time *1000);
  //       let hour = localTime.getHours();
  //       let minutes = localTime.getMinutes();
  //       console.log(time);
  //       console.log(localTime);
  //       console.log(hour +":"+ minutes)
  //       setGreeting(hour);
  //       // 12 Format
  //       hour = hour % 12 || 12;
  //       console.log("Hour:" + hour);
  //       newTime.innerHTML = `${hour}<span>:</span>${minutes} <span>${
  //         hour < 12 ? " AM" : " PM"
  //       }</span>`;
  //       console.log(icon);
  //       let newword = icon.replace(/-/g, " ").toUpperCase();
  //       console.log(newword);
  //       console.log(wordInString(newword, "cloudy"));
  //       //Build weather condition
  //       if (wordInString(newword, "snow")) {
  //         //setInterval(drawFlakes, 30);
  //       }
  //       else if (wordInString(newword, "rain")){
  //         makeItRain()
  //       }
  //       else if (wordInString(newword, "sunny")){
  //       }
  //       else if (wordInString(newword, "cloudy")){
  //       }
  //       else {
  //         makeItRain()
  //       }
  //       // setIcons
  //       setIcons(icon, document.querySelector(".icon"));
  //       let celsius = Math.round((temperature - 32) * (5 / 9));
  //       temperatureF.addEventListener("click", () => {
  //         console.log(temperatureF);
  //         if (temperatureF.innerHTML === "F") {
  //           temperatureSpan.textContent = "C";
  //           temperatureDegree.innerHTML = celsius;
  //         } else if (temperatureF.innerHTML === "C") {
  //           temperatureSpan.textContent = "F";
  //           temperatureDegree.innerHTML = Math.round(temperature);
  //         }
  //       });
  //     });
  //   // set skycons image
  //   function setIcons(icon, iconID) {
  //     const skycons = new Skycons({ color: "white" });
  //     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  //     skycons.play();
  //     return skycons.set(iconID, Skycons[currentIcon]);
  //   }
  //   function wordInString(s, word) {
  //     return new RegExp("\\b" + word + "\\b", "i").test(s);
  //   }

  // //RAIN//
  // function makeItRain(){
  // canvas = document.getElementById("sky");
  //  W = window.innerWidth;
  // H = window.innerHeight;
  // canvas.width = W;
  //  canvas.height = H;
  //   if(canvas.getContext) {
  //      ctx = canvas.getContext('2d');
  //     var w = canvas.width;
  //     var h = canvas.height;
  //     ctx.strokeStyle = 'rgba(174,194,224,0.5)';
  //     ctx.lineWidth = 1;
  //     ctx.lineCap = 'round';
  //     var init = [];
  //     var maxParts = 1000;
  //     for(var a = 0; a < maxParts; a++) {
  //       init.push({
  //         x: Math.random() * w,
  //         y: Math.random() * h,
  //         l: Math.random() * 1,
  //         xs: -4 + Math.random() * 4 + 2,
  //         ys: Math.random() * 10 + 10
  //       })
  //     }
  //     var particles = [];
  //     for(var b = 0; b < maxParts; b++) {
  //       particles[b] = init[b];
  //     }
  //     function draw() {
  //       ctx.clearRect(0, 0, w, h);
  //       for(var c = 0; c < particles.length; c++) {
  //         var p = particles[c];
  //         ctx.beginPath();
  //         ctx.moveTo(p.x, p.y);
  //         ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
  //         ctx.stroke();
  //       }
  //       move();
  //     }
  //     function move() {
  //       for(var b = 0; b < particles.length; b++) {
  //         var p = particles[b];
  //         p.x += p.xs;
  //         p.y += p.ys;
  //         if(p.x > w || p.y > h) {
  //           p.x = Math.random() * w;
  //           p.y = -20;
  //         }
  //       }
  //     }
  //     setInterval(draw, 30);
  //   }
  // }
  // //RAIN END//
  // //set background
  // function setGreeting(hour) {
  //   //let today = new Date();
  //   //let hour = today.getHours();
  //  console.log("From Greeting: "+ hour);
  //   if (hour <= 12) {
  //     // greeting.textContent = "Good morning!";
  //     document.getElementById("bg").style.background = "url('/img/clear_blue_sky.svg') center/cover"
  //     console.log(background_image)
  //      //background_image.style.background = `url(/img/tomato.svg) no-repeat center/cover;`
  //   } else if (hour > 12 && hour < 18) {
  //     document.getElementById("bg").style.background = "url('/img/city_night.svg') center/cover"
  //     // greeting.textContent = "Good afternoon!";
  //     // mainIcon.src = `img/post-meridiem.svg`
  //   } else {
  //     document.getElementById("bg").style.background = "url('/img/background_night.svg') center/cover"
  //     // greeting.textContent = "Good evening!";
  //     // mainIcon.src = `img/post-meridiem_evening.svg`
  //   }
  // }
});



//Get name
// function getName() {
//   if (localStorage.getItem("name") === null) {
//     name.textContent = "Friend";
//   } else {
//     name.textContent = localStorage.getItem("name");
//   }
// }
//Set name
// function setName(e) {
//   if (e.type === "keypress") {
//     if (e.which === 13 || e.keyCode === 13) {
//       localStorage.setItem("name", e.target.innerText);
//       name.blur();
//     }
//   } else {
//     localStorage.setItem("name", e.target.innerText);
//   }
// }

//Get focus
// function getFocus() {
//   if (
//     localStorage.getItem("focus") === null ||
//     localStorage.getItem("focus") === ""
//   ) {
//     focus.textContent = "Please add a task";
//   } else {
//     focus.textContent = localStorage.getItem("focus");
//   }
// }

//set focus
// function setFocus(e) {
//   if (e.type === "keypress") {
//     if (e.which === 13 || e.keyCode === 13) {
//       localStorage.setItem("focus", e.target.innerText);
//       focus.blur();
//     }
//   } else {
//     localStorage.setItem("focus", e.target.innerText);
//   }
// }





