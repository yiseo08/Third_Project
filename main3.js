let articles = [];
let menus = document.querySelectorAll('#menu-list button');
menus.forEach((menu) => menu.addEventListener('click', (event) => getNewsByTopic(event)));
let searchButton = document.getElementById('search-button');
let url; // % url 선언
let page = 1;
let totalPage = 1;

const getNews = async () => {
    try {
        let header = new Headers({ 'x-api-key': 'v1of5JD3YM050dJWf652UrovKAHDay4qLtvWtkyCdAg' });
        url.searchParams.set('page', page);
        console.log('유알엘 생김', url);
        let response = await fetch(url, { headers: header }); // url이 getNews 함수 안에 없어서 %
        let data = await response.json();
        if (response.status == 200) {
            news = data.articles;
            console.log('데이터', data);
            if (data.total_hits == 0) {
                throw new Error('검색된 결과가 없습니다.');
            }
            totalPage = data.total_pages;
            page = data.page;
            render();
            pagenation();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.log('잡힌 에러는?', error.message);
        errorRender(error.message);
    }
};

const getLatestNews = async () => {
    url = new URL('https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=sport&page_size=10');
    getNews();
};

const getNewsByTopic = async (event) => {
    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=${topic}&page_size=10`);
    getNews();
};

const getNewsByKeyword = async () => {
    // 1. 검색 키워드 읽어 오기
    // 2. 이걸 가지고 유알엘에 검색 키워드 붙이기
    // 3. 헤더 준비
    // 4. 유알엘 부르기
    // 5. 데이터 가지고 오기
    // 6. 데이터 보여주기
    /* 1 */ let keyword = document.getElementById('search-input').value;
    /* 2 */ url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=kr&page_size=10`);
    /* 3, 4, 5, 6 */
    getNews();
};

const render = () => {
    let newsHTML = '';

    newsHTML = news
        .map((news) => {
            return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.media || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'}" alt="춘식이, 라이언">
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.summary == null || news.summary == '' ? '내용 없음' : news.summary.length > 200 ? news.summary.substring(0, 200) + '...' : news.summary}</p>
            <div>${news.rights || 'No source'}  * ${moment(news.published_date).fromNow()}</div>
        </div>
    </div>`;
        })
        .join(''); /* 사진 앞에 ` 없앰 */

    document.getElementById('news-board').innerHTML = newsHTML;
};

const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">${message}</div>`;
    document.getElementById('news-board').innerHTML = errorHTML;
};

const pagenation = () => {
    let pagenationHTML = '';
    // 1. 토탈페이지 수를 알아야 한다.
    // 2. 내가 현재 어떤 페이지를 복 있는지 알아야 한다.
    // 3. 페이지 그룹을 찾아야 한다.
    let pageGroup = Math.ceil(page / 5);
    // 4. 이 그룹을 베이스로 마지막 페이지가 무엇인지 찾고,
    let last = pageGroup * 5;
    // 5. 첫 번재 페이지가 무엇인지 찾고,
    let first = last - 4;
    // 6. 첫 페이지부터 마지막 페이지까지 프린트, 출력해주기
    pagenationHTML = `<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page - 1})">
      <span aria-hidden="true">&lt;</span>
    </a>
  </li>`;
    for (let i = first; i <= last; i++) {
        pagenationHTML += `<li class="page-item ${page == i ? 'active' : ''}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
    }
    pagenationHTML += `<li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page + 1})">
      <span aria-hidden="true">&gt;</span>
    </a>
  </li>`;
    document.querySelector('.pagination').innerHTML = pagenationHTML;
};
const moveToPage = (pageNumber) => {
    // 1. 이동하고 싶은 페이지를 알아야 한다.
    // 2. 이 페이지를 가지고, API를 호출해준다.
    page = pageNumber;
    console.log(pageNumber);
    getNews();
};

searchButton.addEventListener('click', getNewsByKeyword); // getNewsByKeyword를 화살표 함수로 정의하면 호이스팅 때문에 앞에서 정의한 적이 없기 때문에, 정의하고 아래쪽에서 써야 함
getLatestNews();
