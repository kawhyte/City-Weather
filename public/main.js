// DOM elements
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
let background_image = document.getElementById("bg").style.background;
//const name = document.getElementById("name");
const focus = document.getElementById("focus");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const temperatureDescription = document.querySelector(".temperature-decription");
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimezone = document.querySelector(".location-timezone");
const temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");
const temperatureF = document.querySelector(".degree-section > span");
const newTime = document.querySelector(".new-time");

// Google API
const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox (searchElement);
searchBox.addListener('places_changed', ()=>{
  
  const place = searchBox.getPlaces()[0]

  if (place == null ) {return};
 const latitude = place.geometry.location.lat()
 const longitude = place.geometry.location.lng()

 fetch('/weather', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    latitude: latitude,
    longitude: longitude
  })
}).then(res => res.json()).then(data => {
 console.log(data)
  setWeatherData(data, place.formatted_address)
})

})

const icon = new Skycons({ color: '#FFF' })
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place) {
  locationElement.textContent = place
  statusElement.textContent = data.summary
  temperatureElement.textContent = data.temperature
  precipitationElement.textContent = `${data.precipProbability * 100}%`
  windElement.textContent = data.windSpeed
  icon.set('icon', data.icon)
  icon.play()
}

// window.addEventListener("load", () => {
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

//   /// Snow effect  //

//   let canvas = document.getElementById("sky");
//   let ctx = canvas.getContext("2d");

//   let W = window.innerWidth;
//   let H = window.innerHeight;

//   canvas.width = W;
//   canvas.height = H;

//   let mf = 100;
//   let flakes = [];

//   for (let i = 0; i < mf; i++) {
//     flakes.push({
//       x: Math.random() * W,
//       y: Math.random() * H,
//       r: Math.random() * 5 + 2,
//       d: Math.random() + 1
//     });
//   }
//   // draw flakes
//   function drawFlakes() {
//     ctx.clearRect(0, 0, W, H);
//     ctx.fillStyle = "white";
//     ctx.beginPath();
//     for (let i = 0; i < mf; i++) {
//       let f = flakes[i];
//       ctx.moveTo(f.x, f.y);
//       ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
//     }
//     ctx.fill();
//     moveFlakes();
//   }

//   // animate flakes
//   let angle = 0;

//   function moveFlakes() {
//     angle += 0.01;
//     for (let i = 0; i < mf; i++) {
//       let f = flakes[i];

//       f.y += Math.pow(f.d, 2) + 1;
//       f.x += Math.sin(angle) * 2;

//       if (f.y > H) {
//         flakes[i] = { x: Math.random() * W, y: 0, r: f.r, d: f.d };
//       }
//     }
//   }
// //SNOW END//

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



// });



//Zero
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}
//  set time
// function setAMPM(){
//   if (hour < 12) {
//   greeting.textContent = "Good morning!";
//   mainIcon.src = `img/ante-meridiem.svg`
// } else if (hour < 18) {
//   greeting.textContent = "Good afternoon!";
//   mainIcon.src = `img/post-meridiem.svg`
// } else {
//   greeting.textContent = "Good evening!";
//   mainIcon.src = `img/post-meridiem_evening.svg`
// }
// }

//set background
// function setGreeting() {
//   let today = new Date();
//   let hour = today.getHours();

//   if (hour < 12) {
//     greeting.textContent = "Good morning!";
//     // mainIcon.src = `img/ante-meridiem.svg`
//   } else if (hour < 18) {
//     greeting.textContent = "Good afternoon!";
//     // mainIcon.src = `img/post-meridiem.svg`
//   } else {
//     greeting.textContent = "Good evening!";
//     // mainIcon.src = `img/post-meridiem_evening.svg`
//   }
// }

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

//Get focus
async function getMantra() {
  const response = await fetch("quotes.json");
  const myJson = await response.json();
  const myJsonSize = JSON.stringify(myJson).length;
  //console.log(myJsonSize);
  num = Math.floor(Math.random() * Math.floor(100));
  //console.log(num);

  if (myJson[num].text === null || myJson[num].from === null) {
    quote.textContent =
      "A hero is one who knows how to hang on for one minute longer.";
    author.textContent = "Norwegian proverb";
  } else {
    quote.textContent = myJson[num].text;
    author.textContent = myJson[num].from;
  }
  //   if ( === null || mantraData.text) {
  //     mantra.textContent = "Inhale love. Exhale gratitude.";
  //   } else {

  //var json = JSON.parse(myJson);

  //console.log(myJson);
  // console.log(JSON.stringify(myJson[num].from));
  //console.log(JSON.stringify(myJson).length);

  //}
}

//name.addEventListener("keypress", setName);
//name.addEventListener("blur", setName);
// focus.addEventListener("keypress", setFocus);
// focus.addEventListener("blur", setFocus);

//run
getMantra();
// setAMPM();
// getFocus();
// showTime();
// setGreeting();
//getName();

//foobar()
