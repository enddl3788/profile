let currentPage = 1;
const totalPages = 3; // 전체 페이지 수

document.addEventListener('wheel', (e) => {
  // 휠을 아래로 내릴 때
  if (e.deltaY > 0) {
    currentPage = Math.min(totalPages, currentPage + 1);
  } else { // 휠을 위로 올릴 때
    currentPage = Math.max(1, currentPage - 1);
  }

  // 해당 페이지로 스크롤 이동
  const targetPage = document.getElementById(`main_${currentPage}`);
  if (targetPage) {
    window.scrollTo({
      top: targetPage.offsetTop,
      behavior: 'smooth',
    });
  } else {
    console.error(`Page not found: main_${currentPage}`);
  }
});

function goToTop() {
    window.scrollTo(0,0);
  }