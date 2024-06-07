const menuWrapper = document.querySelector('.menu-toggle-wrapper');
const menu = window.getComputedStyle(document.querySelector('.menu-toggle-wrapper'));
const searchBox = document.querySelector('.search-box');
const search = window.getComputedStyle(document.querySelector('.search-box'));

window.onclick = (event) => {
  if (event.target.closest('.menu-toggle-button')) {
    menuWrapper.classList.toggle('show');
  } else if (!event.target.closest('.menu-toggle-wrapper')) {
    if (menu.display === 'flex') {
      menuWrapper.classList.toggle('show');
    }
  }
  if (event.target.closest('.search-toggle-btn')) {
    searchBox.classList.toggle('show-box');
  } else if (!event.target.closest('.search-box')) {
    if (search.display === 'flex') {
      searchBox.classList.toggle('show-box');
    }
  }
};
