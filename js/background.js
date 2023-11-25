const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const fov = 150;
const speed = 4;

class Dot {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = getRandomColor(); // 랜덤한 색상 생성 함수 사용
  }
}

let canvas;
let context;
let tempx, tempy, tempz;
let dots = [];
let dotsLength = (innerWidth+innerHeight)/20;

function hexToRgba(hex, alpha) {
  // Remove '#' from the beginning, if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex value to separate R, G, B components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the result as an "rgba(r, g, b, alpha)" string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 랜덤한 색상 생성 함수
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setSize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  initDots();

  context.fillStyle = "#000000";

  if (innerWidth < 800) {
    context.globalAlpha = 0.3;
  } else {
    context.globalAlpha = 0.8;
  }
}

function initDots() {
  dots = [];
  dotsLength = (innerWidth+innerHeight)/20;
  let x, y, z;
  for (let i = 0; i < dotsLength; i++) {
    x = Math.random() * (innerWidth * 2) - innerWidth;
    y = Math.random() * (innerHeight * 2) - innerHeight;
    z = Math.random() * innerWidth - innerWidth / 2;
    dots.push(new Dot(x, y, z));
  }
}

function drawDots(dot) {
  let scale, x2d, y2d;
  scale = fov / (fov + dot.z);
  x2d = dot.x * scale + innerWidth/2;
  y2d = dot.y * scale + innerHeight/2;

  // 원 그라데이션 추가
  const gradient = context.createRadialGradient(x2d, y2d, 0, x2d, y2d, scale * 4);
  
  //console.log(dot.color + " " + dot.opacity);
  gradient.addColorStop(0, hexToRgba(dot.color, 1));
  gradient.addColorStop(0.5, hexToRgba(dot.color, 0.5));
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x2d, y2d, scale * 4, 0, 2 * Math.PI);
  context.fill();
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let dot;
  for (let i = 0; i < dots.length; i++) {
    dot = dots[i];
    dot.z -= speed;
    if (dot.z < -fov) {
      dot.z += (innerWidth+innerHeight)/2;
    }
    drawDots(dot);
  }
  requestAnimationFrame(render);
}

function init() {
  canvas = document.querySelector('.canvas');
  context = canvas.getContext('2d');
  setSize();
  render();
}

addEventListener('resize', setSize);
init();