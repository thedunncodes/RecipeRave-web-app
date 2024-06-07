document.addEventListener('DOMContentLoaded', () => {
  const categoryMenus = document.querySelectorAll('.category-content-menu');
  const category = document.querySelector('input[name=category]');

  categoryMenus.forEach((menu) => {
    menu.addEventListener('click', () => {
      category.value = menu.innerHTML.trim();

      categoryMenus.forEach((subMenu) => {
        if (subMenu.classList.contains('category-content-active')) {
          subMenu.classList.toggle('category-content-active');
        }
      });
      menu.classList.toggle('category-content-active');
    });
  });
});
