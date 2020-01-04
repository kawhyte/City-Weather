window.onload =  function() {

//Snow effect
let canvas = document.getElementById("sky");
let ctx =  canvas.getContext("2d");

let W = window.innerWidth;
let H = window.innerHeight;

canvas.width = W;
canvas.height =  H;

let mf = 100;
let flakes  = [];

for (let i = 0; i < mf; i++) {
  flakes.push({
    x:Math.random() * W,
    y:Math.random() * H,
    r:Math.random() * 5+2,
    d:Math.random() + 1
  })
  
}
// draw flakes
function drawFlakes(){

  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < mf; i++) {
    let f = flakes[i];
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI*2,true);
    
  }
  ctx.fill();
  moveFlakes();
}

// animate flakes
let angle  =  0;

function moveFlakes(){
 angle += 0.01;
 for (let i = 0; i< mf; i++) {
   let f= flakes[i];

   f.y += Math.pow(f.d, 2) + 1;
   f.x += Math.sin ( angle) *2;

   if(f.y > H){
    flakes[i] = {x: Math.random()*W, y: 0, r: f.r, d: f.d}
   };
 }
}
setInterval(drawFlakes, 30);
}