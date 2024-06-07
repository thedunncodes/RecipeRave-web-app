const prevPage = document.getElementById('page-prev');
const nextPageBtn = document.querySelector('.page-next');
const prevPageBtn = document.querySelector('.page-prev');
const pageIndex = document.querySelectorAll('#page-index');

const urlParams = new URLSearchParams(window.location.search);

let account = window.location.pathname;
const page = urlParams.get('page') || 1;
const start = urlParams.get('start') || 1;
const maxPage = pageIndex[0].href.slice(-1);
const end = urlParams.get('end') || maxPage;

if (!(account.slice(-1) === '/')) {
  account = `${account}/`;
}
console.log(account);

// Get all parameter entries as an iterator
for (const [key, value] of urlParams.entries()) {
  console.log(`${key}: ${value}`);
}

pageIndex.forEach((Page) => {
  Page.addEventListener('click', (event) => {
    const currentPage = Number(Page.textContent);
    console.log(currentPage);
    event.preventDefault();

    Page.href = '';
    if (!(currentPage > maxPage + 1)) {
      Page.href = `${account}?page=${(Number(currentPage) >= maxPage) ? maxPage : Number(currentPage)}&start=${(Number(currentPage) >= maxPage) ? maxPage : Number(currentPage)}&end=${((Number(currentPage) + 2) >= maxPage) ? maxPage : (Number(currentPage) + 2)}&maxPage=${maxPage}`;
    }

    window.location.href = Page.href;
  });
});

localStorage.setItem('pageTracker', JSON.stringify({ page }));
const object = localStorage.getItem('pageTracker');
const pageTracker = JSON.parse(object);

nextPageBtn.addEventListener('click', () => {
  for (let index = 0; index < pageIndex.length; index++) {
    const currentPage = Number(page);
    const newPage = currentPage + 1;
    if (!(currentPage >= maxPage)) {
      if (Number(pageIndex[index].textContent) === Number(pageTracker.page)) {
        console.log(Number(pageTracker.page) + 1);
        pageIndex[index].href = `${account}?page=${currentPage + 1}&start=${Number(start) + 1}&end=${((newPage + 2) >= maxPage) ? maxPage : (newPage + 2)}&maxPage=${maxPage}`;
        console.log(pageIndex[index].href);

        window.location.href = pageIndex[index].href;
      }
    }
  }
});

prevPageBtn.addEventListener('click', (event) => {
  console.log(`index length: ${pageIndex.length}`);
  for (let index = 0; index < pageIndex.length; index++) {
    if ((Number(page) - 1) !== 0) {
      if (Number(pageIndex[index].textContent) === Number(pageTracker.page)) {
        console.log(Number(pageTracker.page) - 1);
        pageIndex[index].href = `${account}?page=${Number(page) - 1}&start=${Number(start) - 1}&end=${(((Number(page) - 1) + 2) >= maxPage) ? maxPage : ((Number(page) - 1) + 2)}&maxPage=${maxPage}`;
        console.log(pageIndex[index].href);

        window.location.href = pageIndex[index].href;
      }
    } else if (Number(page) === 0) {
      pageIndex[index].href = `${account}?page=${Number(page)}&start=${Number(start) - 1}&end=${(((Number(page) - 1) + 2) >= maxPage) ? maxPage : ((Number(page) - 1) + 2)}&maxPage=${maxPage}`;
      window.location.href = pageIndex[index].href;
    }
  }
});

for (const currPage of pageIndex) {
  if (Number(currPage.textContent) === Number(pageTracker.page)) {
    currPage.classList.toggle('active');
  }
}