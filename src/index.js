import "./styles.css";
import gsap from "gsap";

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

function drawLine(uberState) {
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
    drawLine(uberState);
  },
  repeat: -1, // create endless loop
});

t1.to(uberState, 2, { endArray: state2 }) // second item - animating time, [sec]
  .to(uberState, 2, { endArray: state3 })
  .to(uberState, 2, { endArray: state1 });
