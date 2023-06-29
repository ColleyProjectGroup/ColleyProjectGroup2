import styles from 'styles/components/errorComponent.module.scss'
export const ErrorComponent = () => {
  return (
    <div className={styles.container}>
      <h1>페이지 오류 안내</h1>
      <p>홈페이지 이용에 불편을 드려 죄송합니다.</p>
      <p> 선택한 페이지를 찾을 수 없습니다.</p>
      <a href="/">메인 페이지로 이동</a>
    </div>
  )
}
