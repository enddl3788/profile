var mainArr = [
  ['#introduction', '#skill', '#solo', '#team'],
  ['#introduction_main', '#skill_main', '#solo_main', '#team_main']
];

const solo_moblie_container = document.querySelector('#solo_moblie_container');
const team_moblie_container = document.querySelector('#team_moblie_container');

const introduction = document.querySelector('#introduction');
const skill = document.querySelector('#skill');
const solo = document.querySelector('#solo');
const team = document.querySelector('#team');

const introduction_main = document.querySelector('#introduction_main');
const skill_main = document.querySelector('#skill_main');
const solo_main = document.querySelector('#solo_main');
const team_main = document.querySelector('#team_main');

const backBtn = document.querySelector('.backBtn');
const nextBtn = document.querySelector('.nextBtn');
const nextPageBtn = document.querySelector('#nextPageBtn');
const nextPageBtn_end = document.querySelector('#nextPageBtn_end');

nextPageBtn_end.style.display = "none";    //숨기기
backBtn.style.display = "none";    //숨기기

skill_main.style.display = "none";    //숨기기
solo_main.style.display = "none";    //숨기기
team_main.style.display = "none";    //숨기기

skill.style.display = "none";    //숨기기
solo.style.display = "none";    //숨기기
team.style.display = "none";    //숨기기

let pageName = 0;
let distancePage = 0;
let currentPage = 1;
const totalPages = 4; // 전체 페이지 수

document.addEventListener('wheel', (e) => {
  // 휠을 아래로 내릴 때
  if (e.deltaY > 0) {
    currentPage = Math.min(totalPages , currentPage + 1);
  } else { // 휠을 위로 올릴 때
    currentPage = Math.max(1 , currentPage - 1);
  }

  if (currentPage == 1) {
    goTo(`.main`);
  } else if (currentPage == 4 && pageName == 3) {
    goTo('#nextPageBtn_end');
  } else if (currentPage == 4 && pageName != 3) {
    goTo('#nextPageBtn');
  } else {
    goTo(`#main_${currentPage + distancePage}`);
  }
});

function goToTop() {
    window.scrollTo(0,0);
    currentPage = 1;
  }

function goTo(el) {
  const targetPage = document.querySelector(el);
  if (targetPage) {
    window.scrollTo({
      top: targetPage.offsetTop,
      behavior: 'smooth',
    });

  } else {
    console.error(`Page not found: ${el}`);
  }
}

function movePage(now, next, time) {
  let timeSet = time;
  const nowPage = document.querySelector(now);
  const nextPage = document.querySelector(next);

  fadeOut(nowPage, timeSet);
  setTimeout(function () {
    fadeIn(nextPage, timeSet);
  }, timeSet);
  //nowPage.style.display = "none"; 
}

function distanceSet(distance) {
  distancePage = distance * 2;
  pageName = distance;
}

function btnUpdate() {
  if (pageName == 0) {
    backBtn.style.display = "none";    //숨기기
  } else if (pageName == 3) {
    nextPageBtn_end.style.display = "block";    //보이기
    nextPageBtn.style.display = "none";    //숨기기
    nextBtn.style.display = "none";    //숨기기
  } else {
    nextPageBtn_end.style.display = "none";
    nextPageBtn.style.display = "block";
    backBtn.style.display = "block";    //보이기
    nextBtn.style.display = "block";    //보이기
  }
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const translateY = `translateX(${-scrollY/3}px)`;
    if (pageName == 2) {
      solo_moblie_container.style.transform = translateY;
    } else if (pageName == 3) {
      team_moblie_container.style.transform = translateY;
    }
});

function playMusic() {
  var audio = document.getElementById("audio");
  audio.play();
}