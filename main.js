 const getLatestNews = async () => {
    let url = new URL('https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=sport&page_size=10');
    let header = new Headers({ 'x-api-key':'v1of5JD3YM050dJWf652UrovKAHDay4qLtvWtkyCdAg' });
    let response = await fetch(url, {headers: header});
    let data = await response.json();
    news = data.articles;
    console.log(news);
    render();
 };

let menuList = document.getElementById('menu-list')
menuList.addEventListener('click', move_section);
function move_section() {
    location.href=
} 
 
 const render = () => {
    let newsHTML = '';

    newsHTML = news
        .map((news) => {
            return `<div class = "row news">
        <div class = "col-lg-4">
            <img class = "news-img-size" src="${news.media || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs9LwOn1Ld0xMxxeV1cMeySnCfmBkIuc06QsG2jqu36Wek8tmIQOikUbRhWG-M-A3sNSk&usqp=CAU'}" alt="춘식이">
        </div>
        <div class = "col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.summary == null || news.summary == '' ? '내용없음' : news.summary/length > 200 ? news.summary.substring(0, 200) + '...' : news.summary}</p>
            <div>${news.right || 'No source'} * ${moment(news.published_date).fromNow()}</div>
        </div>
    </div>`;
        })
        .join('');
    document.getElementById('news-board').innerHTML = newsHTML;
 };
 getLatestNews();