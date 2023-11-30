const introduction = document.querySelector('#introduction');
const skill = document.querySelector('#skill');
const solo = document.querySelector('#solo');
const team = document.querySelector('#team');

const introduction_main = document.querySelector('#introduction_main');
const skill_main = document.querySelector('#skill_main');
const solo_main = document.querySelector('#solo_main');
const team_main = document.querySelector('#team_main');

skill_main.style.display = "none";    //숨기기
solo_main.style.display = "none";    //숨기기
team_main.style.display = "none";    //숨기기

skill.style.display = "none";    //숨기기
solo.style.display = "none";    //숨기기
team.style.display = "none";    //숨기기

let currentPage = 1;
const totalPages = 3; // 전체 페이지 수

document.addEventListener('wheel', (e) => {
  // 휠을 아래로 내릴 때
  if (e.deltaY > 0) {
    currentPage = Math.min(totalPages, currentPage + 1);
  } else { // 휠을 위로 올릴 때
    currentPage = Math.max(1, currentPage - 1);
  }

  goTo(`main_${currentPage}`);
});

function goToTop() {
    window.scrollTo(0,0);
    currentPage = 1;
  }

function goTo(el) {
  const pageNumber = Number(el.match(/\d+$/)[0]); // el 문자열에서 마지막 숫자를 추출
  currentPage = isNaN(pageNumber) ? 1 : pageNumber;
  const targetPage = document.getElementById(el);
  if (targetPage) {
    window.scrollTo({
      top: targetPage.offsetTop,
      behavior: 'smooth',
    });

  } else {
    console.error(`Page not found: ${el}`);
  }
}

function movePage(now, next) {
  clickEvent = 1;

  const nowPage = document.querySelector(now);
  const nextPage = document.querySelector(next);

  fadeOut(nowPage, 1000);
  fadeIn(nextPage, 2000);

  nowPage.style.display = "none"; 

  clickEvent = 0;
}