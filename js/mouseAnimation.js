let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = window.innerWidth / 2;
let followerY = window.innerHeight / 2;
let earthImgBtnX = window.innerWidth / 2;
let earthImgBtnY = window.innerHeight / 2;
let clickEvent = 0;
let currentSize;

const follower = document.querySelector(".follower");
const earthImgBtn = document.querySelector(".earthImgBtn");
const clickImg = document.querySelector(".clickImg");
const astronautImg = document.querySelector(".astronautImg");
const skill_machine = document.querySelector(".skill_machine");

const intro = document.querySelector('#intro');
const main = document.querySelector('#main');

main.style.display = "none";    //숨기기

let scaleAmount = 0.5; // 크기를 키우는 양 설정
let scaleInterval;

function setZIndex(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
  
    if (rect1.bottom < rect2.bottom) {
      element1.style.zIndex = 2;
    } else {
      element1.style.zIndex = 4;
    }
  }

function animateFollower() {
    // 간단한 보간을 사용하여 부드러운 이동 구현
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    const tolerance = 25; // 허용 범위 설정

    if (mouseX > followerX + tolerance) {
        astronautImg.style.backgroundImage = "url('img/astronaut/astronaut_right.gif')";
    } else if (mouseX < followerX - tolerance) {
        astronautImg.style.backgroundImage = "url('img/astronaut/astronaut_left.gif')";
    } else if (mouseY > followerY + tolerance) {
        astronautImg.style.backgroundImage = "url('img/astronaut/astronaut_bottom.gif')";
    } else if (mouseY < followerY - tolerance) {
        astronautImg.style.backgroundImage = "url('img/astronaut/astronaut_top.gif')";
    } else {
        astronautImg.style.backgroundImage = "url('img/astronaut/astronaut.gif')";
    }

    astronautImg.style.left = followerX + "px";
    astronautImg.style.top = followerY + "px";

    // 간단한 보간을 사용하여 부드러운 이동 구현
    earthImgBtnX += (mouseX - earthImgBtnX) * 0.1;
    earthImgBtnY += (mouseY - earthImgBtnY) * 0.1;

    // 반대 방향으로 이동하도록 설정
    earthImgBtn.style.left = window.innerWidth - ((window.innerWidth * 0.3) / 2) - earthImgBtnX  + "px";
    earthImgBtn.style.top = window.innerHeight - ((window.innerHeight * 0.3) / 2)  - earthImgBtnY  + "px";

    clickImg.style.left = window.innerWidth - ((window.innerWidth * 0.2) / 2) - followerX + "px";
    clickImg.style.top = window.innerHeight - ((window.innerHeight * 0.2)) -followerY + "px";

    setZIndex(astronautImg, skill_machine);

    requestAnimationFrame(animateFollower);
}

// 마우스 클릭 이벤트를 감지하는 부분 추가
earthImgBtn.addEventListener("mousedown", function () {
    clickEvent = 1;
    // 20ms 간격으로 크기를 키우기 위한 setInterval
    scaleInterval = setInterval(function () {
        currentSize = parseFloat(getComputedStyle(earthImgBtn).getPropertyValue("transform").split(",")[3].trim());
        earthImgBtn.style.transform = "scale(" + (currentSize + scaleAmount) + ")";
            // 만약 특정 크기에 도달하면 clearInterval을 사용하여 종료
        if (currentSize >= 23) {
            clearInterval(scaleInterval);
        }
    }, 20);
    clickImg.style.display = "none";    // 클릭 이미지 숨기기
    setTimeout(function () {
        fadeOut(intro, 1000);
        fadeIn(main, 1000);
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

// 페이드 아웃 효과
function fadeOut(el, time) {
    el.style.opacity = 1;

    var last = +new Date();
    var tick = function () {
        el.style.opacity = +el.style.opacity - (new Date() - last) / time;
        last = +new Date();

        if (+el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        } else {
            el.style.display = "none"; // 투명도가 0 이하일 때만 숨기기
        }
    };

    tick();
}

// 페이드 인 효과
function fadeIn(el, time) {
    el.style.opacity = 0;
    el.style.display = "block";

    var last = +new Date();
    var tick = function () {
        el.style.opacity = +el.style.opacity + (new Date() - last) / time;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

    tick();
}

function scaleUp() {
    if(clickEvent == 0){
        earthImgBtn.style.transform = "scale(1.1)"; // 10% 크게 만들기
    }
    //clickImg.style.display = "block";   // 클릭 이미지 보이기
}

function scaleDown() {
    if(clickEvent == 0){
        earthImgBtn.style.transform = "scale(1)"; // 10% 크게 만들기
    }
    //clickImg.style.display = "none";    // 클릭 이미지 숨기기
}

// 애니메이션 시작
animateFollower();