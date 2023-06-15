import styles from 'styles/components/payment/BankSelection.module.scss'
export const BankSelection = () => {
  return (
    <div className={styles.container}>
      <label htmlFor="banks">
        <span>은행</span>
        {/* <div>DROPDOWN</div> */}
        <select
          name="banks"
          id="banks">
          <option value="kb">kb</option>
          <option value="sh">sh</option>
          <option value="nh">nh</option>
          <option value="wr">wr</option>
        </select>
      </label>
      <label>
        <span>계좌번호</span>
        <input type="text" />
      </label>
    </div>
  )
}
