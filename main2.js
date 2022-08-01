let articles = [];
let menus = document.querySelectorAll('#menu-list button');
menus.forEach((menu) => menu.addEventListener('click', (event) => getNewsByTopic(event)));
let searchButton = document.getElementById('search-button');

// console.log('버튼', searchButton);

function search_keyword() {}

const getLatestNews = async () => {
    let url = new URL('https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=sport&page_size=10');
    let header = new Headers({ 'x-api-key': 'v1of5JD3YM050dJWf652UrovKAHDay4qLtvWtkyCdAg' });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log(news);
    render();
};

const getNewsByTopic = async (event) => {
    let topic = event.target.textContent.toLowerCase();
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=${topic}&page_size=10`);
    let header = new Headers({ 'x-api-key': 'v1of5JD3YM050dJWf652UrovKAHDay4qLtvWtkyCdAg' });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log('데이터가 나온다', data);
    render();
};

const getNewsByKeyword = async () => {
    // 1. 검색 키워드 읽어 오기
    // 2. 이걸 가지고 유알엘에 검색 키워드 붙이기
    // 3. 헤더 준비
    // 4. 유알엘 부르기
    // 5. 데이터 가지고 오기
    // 6. 데이터 보여주기
    /* 1 */ let keyword = document.getElementById('search-input').value;
    /* 2 */ let url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=kr&page_size=10`);
    /* 3, 4, 5, 6 */
    let header = new Headers({ 'x-api-key': 'v1of5JD3YM050dJWf652UrovKAHDay4qLtvWtkyCdAg' });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    render();
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
searchButton.addEventListener('click', getNewsByKeyword); // getNewsByKeyword를 화살표 함수로 정의하면 호이스팅 때문에 앞에서 정의한 적이 없기 때문에, 정의하고 아래쪽에서 써야 함
getLatestNews();
