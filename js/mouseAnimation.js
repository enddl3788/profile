let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;
let earthImgBtnX = 0;
let earthImgBtnY = 0;

const follower = document.querySelector(".follower");
const earthImgBtn = document.querySelector(".earthImgBtn");
const clickImg = document.querySelector(".clickImg");

const background = document.querySelector('background');
const main = document.querySelector('main');


let scaleAmount = 0.5; // 크기를 키우는 양 설정
let scaleInterval;

function animateFollower() {
    // 간단한 보간을 사용하여 부드러운 이동 구현
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    
    // 간단한 보간을 사용하여 부드러운 이동 구현
    earthImgBtnX += (mouseX - earthImgBtnX) * 0.1;
    earthImgBtnY += (mouseY - earthImgBtnY) * 0.1;

    // 반대 방향으로 이동하도록 설정
    earthImgBtn.style.left = window.innerWidth - ((window.innerWidth * 0.3) / 2) - earthImgBtnX  + "px";
    earthImgBtn.style.top = window.innerHeight - ((window.innerHeight * 0.3) / 2)  - earthImgBtnY  + "px";

    // clickImg를 follower 하단에 위치하도록 수정
    clickImg.style.left = window.innerWidth - ((window.innerWidth * 0.2) / 2) - followerX + "px";
    clickImg.style.top = window.innerHeight - ((window.innerHeight * 0.2)) -followerY + "px";

    requestAnimationFrame(animateFollower);
}

// 마우스 클릭 이벤트를 감지하는 부분 추가
earthImgBtn.addEventListener("mousedown", function () {
    // 20ms 간격으로 크기를 키우기 위한 setInterval
    scaleInterval = setInterval(function () {
        let currentSize = parseFloat(getComputedStyle(earthImgBtn).getPropertyValue("transform").split(",")[3].trim());
        earthImgBtn.style.transform = "scale(" + (currentSize + scaleAmount) + ")";
    }, 20);
    clickImg.style.display = "none";    // 클릭 이미지 숨기기
    setTimeout(function () {
        // 1초 간격으로 투명도를 조절하여 점점 사라지게 함
        let opacity = 1;
        const interval = setInterval(function () {
            opacity -= 0.01; // 1%씩 감소
            background.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(interval); // 투명도가 0이 되면 interval 종료
            }
        }, 10);
    }, 1000);
});


document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    updateCursorPosition(touch.clientX, touch.clientY);
});

document.addEventListener("DOMContentLoaded", function () {
    var cursor = document.querySelector('.cursor');

    function updateCursorPosition(x, y) {
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    }

    document.addEventListener("mousemove", function (e) {
        updateCursorPosition(e.clientX, e.clientY);
    });

    document.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        updateCursorPosition(touch.clientX, touch.clientY);
    });
});

function scaleUp() {
    earthImgBtn.style.transform = "scale(1.1)"; // 10% 크게 만들기
    //clickImg.style.display = "block";   // 클릭 이미지 보이기
}

function scaleDown() {
    earthImgBtn.style.transform = "scale(1)"; // 원래 크기로 되돌리기
    //clickImg.style.display = "none";    // 클릭 이미지 숨기기
}

// 애니메이션 시작
animateFollower();