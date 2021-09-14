import "./styles.css";
import gsap from "gsap";
import FastSimplexNoise from "../node_modules/fast-simplex-noise";

//=============gsap=============//

const width = window.innerWidth;
const height = 500;
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.classList.add("praphcanvas");
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);

const state1 = [0, 110, 250, 300, 400, 250, 220];
const state2 = [310, 350, 300, 50, 10, 110, 150];
const state3 = [100, 50, 200, 0, 50, 110, 300];

const uberState = [...state1]; // we need to set percisely a copy of arr

function drawLine(uberState, ctx) {
  ctx.clearRect(0, 0, width, height); // clear screen
  ctx.beginPath();
  ctx.moveTo(0, uberState[0]);
  for (let i = 0; i < 7; i++) {
    ctx.lineTo((i * width) / 6, uberState[i]);
  }
  ctx.strokeStyle = "#97DE58";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

const t1 = gsap.timeline({
  onUpdate() {
    drawLine(uberState, ctx);
  },
  repeat: -1, // create endless loop
});

t1.to(uberState, 2, { endArray: state2 }) // second item - animating time, [sec]
  .to(uberState, 2, { endArray: state3 })
  .to(uberState, 2, { endArray: state1 });

//=============fast-simplex-noise=============//

let canvas1 = document.createElement("canvas");
let ctx1 = canvas1.getContext("2d");
canvas1.width = width;
canvas1.height = height;
document.body.appendChild(canvas1);
var newstate = [0, 110, 150, 310, 350, 300, 0];

var t = 0;
const noiseGen = new FastSimplexNoise({
  frequency: 0.5,
  max: 400,
  min: 0,
  octaves: 1,
});

function render() {
  t++;
  ctx1.lineJoin = "round"; // round line edges
  newstate = [];
  for (var i = 0; i < 7; i++) {
    newstate.push(noiseGen.scaled([i * 5, t / 100]));
  }
  drawLine(newstate, ctx1);
  window.requestAnimationFrame(render);
}

render();
