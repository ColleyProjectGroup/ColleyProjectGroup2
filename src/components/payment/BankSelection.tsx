import styles from 'styles/components/payment/BankSelection.module.scss'

export const BankSelection = () => {
  return (
    <div className={styles.container}>
      <label htmlFor="banks">
        {/* BANK LISTS */}
        <span>은행</span>
        <select
          name="banks"
          id="banks">
          <option value="kb">KB국민은행</option>
          <option value="sh">신한은행</option>
          <option value="kebhana">하나은행</option>
          <option value="kbank">케이뱅크</option>
          <option value="kakao">카카오뱅크</option>
          <option value="nh">NH농협은행</option>
          <option value="woori">우리은행</option>
        </select>
      </label>
      {/* ACCOUNT NUMBER */}
      <label>
        <span>계좌번호</span>
        <input type="text" />
      </label>
    </div>
  )
}
