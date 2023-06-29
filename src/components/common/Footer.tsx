import styles from 'src/styles/layout/footer.module.scss'
import icon from '/public/instagramIcon.svg'

export const Footer = () => {
  return (
    <div className={styles.sideSpace}>
      <div className={styles.container}>
        <div className={styles.sideLeft}>
          <div className={styles.csinfo}>
            <span className={styles.tel}>02 543 1218</span>
            <span className={styles.call}>
              통화량이 많을 때는 Q&A 게시판을 이용해주세요. <br />
              MON-FRI 10:00~18:00, LUNCH 13:00~14:00 / SAT-SUN·HOLIDAY OFF
            </span>
          </div>
          <div className={styles.companyinfo}>
            <span>주식회사 콜리</span>
            <span>
              서울특별시 강남구 논현로 709 (논현동) 로얄토토 논현동사옥 5층 콜리
              I 사업자번호 : 371-81-01287
              <a
                href="/"
                className={styles.businessInfo}>
                [사업자정보확인]
              </a>
              I 통신판매업신고 : 2016-서울마포-1355
            </span>
            <span>
              대표자(성명) : 양승철 I CPO : 김남혁 I MAIL : pay@colley.kr
            </span>
            <span>CALL CENTER : 02-543-1218 I FAX : 02-3144-7780</span>
            <span>입금계좌: 기업은행 063-088821-04-058</span>
          </div>
          <div className={styles.bottom}>
            <span className={styles.copyright}>
              Copyright © 콜리. All rights reserved. Hosting by cafe24
            </span>
            <ul>
              <li>
                <a>회사소개</a>
              </li>
              <li>
                <a>이용약관</a>
              </li>
              <li>
                <a>개인정보처리방침</a>
              </li>
              <li>
                <a>이용안내</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.sideRight}>
          <ul className={styles.community}>
            <li>Community</li>
            <li>
              <a>Notice</a>
            </li>

            <li>
              <a>Review</a>
            </li>

            <li>
              <a>Q&A</a>
            </li>
          </ul>
          <ul className={styles.shopping}>
            <li>Shopping</li>
            <li>
              <a href="/mypage">MY PAGE</a>
            </li>

            <li>
              <a href="/mypage/order">ORDER</a>
            </li>

            <li>
              <a href="/mypage/wishlist">WISHLIST</a>
            </li>
          </ul>
          <a href="https://www.instagram.com/colley.kr/">
            <img
              src={icon}
              alt="Instagram"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
