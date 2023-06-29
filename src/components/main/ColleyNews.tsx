import 'styles/layout/ColleyNews.scss'

const ColleyNews = () => {
  const newsItem1 =
    'https://colley.market/web/upload/news/issue_1/(%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF)%E1%84%8F%E1%85%A2%E1%84%85%E1%85%B5%E1%86%A8%E1%84%90%E1%85%A5-%E1%84%8B%E1%85%B3%E1%86%B7%E1%84%89%E1%85%B5%E1%86%A8.jpg'
  const newsItem2 =
    'https://colley.market/web/upload/news/news_15/(%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF)%E1%84%82%E1%85%B2%E1%84%89%E1%85%B3-%E1%84%8B%E1%85%A6%E1%86%AF%E1%84%86%E1%85%A9.jpg'
  const newsItem3 =
    'https://colley.market/web/upload/category/editor/2022/06/09/10c76d1d1b214a3b14c861863abc6a36.jpg'

  return (
    <div className="ColleyNews">
      <div className="Inner">
        <h2>Colley News</h2>
        <div className="NewsList">
          <div className="NewsItem">
            <img
              src={newsItem1}
              alt="안 먹어도 배불러~"
            />
            <div className="NewsContent">
              <div className="Header">
                <span>ISSUE </span>
                <span>NOW</span>
              </div>
              <div className="Title">안 먹어도 배불러~😋</div>
              <div className="Content">저장 필수✔️캐릭터 음식.ZIP</div>
            </div>
          </div>
          <div className="NewsItem">
            <img
              src={newsItem2}
              alt="세서미 스트리트 넨도로이드 발매"
            />
            <div className="NewsContent">
              <div className="Header">
                <span>NEWS </span>
                <span>NOW</span>
              </div>
              <div className="Title">세서미 스트리트 넨도로이드 발매 💥</div>
              <div className="Content">
                엘모&쿠키몬스터 3월 초까지 사전 예약 판매 ❗
              </div>
            </div>
          </div>
          <div className="NewsItem">
            <img
              src={newsItem3}
              alt="월레스와 그로밋 네컷 포토 앨범"
            />
            <div className="NewsContent">
              <div className="Header">
                <span>GOODS </span>
                <span>NOW</span>
              </div>
              <div className="Title">월레스와 그로밋 네컷 포토 앨범📸</div>
              <div className="Content">
                저귀여운 그로밋과 맥그로우 2종 디자인🎈
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ColleyNews }
