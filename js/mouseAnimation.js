let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;
const follower = document.querySelector(".follower");

function animateFollower() {
  // 간단한 보간을 사용하여 부드러운 이동 구현
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;

  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";

  requestAnimationFrame(animateFollower);
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    updateCursorPosition(touch.clientX, touch.clientY);
});

// 애니메이션 시작
animateFollower();