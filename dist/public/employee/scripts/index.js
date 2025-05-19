const buttons = document.querySelectorAll('.menu-btn');
const currentPage = window.location.pathname;

buttons.forEach(btn => {
  if (btn.href.includes(`${currentPage}`)) {
    btn.classList.add('active');
  }
});