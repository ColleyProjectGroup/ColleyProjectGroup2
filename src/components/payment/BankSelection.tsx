import { BankContext } from 'contexts/BankContext'
import { AccountNumberContext } from 'contexts/AccountNumberContext'
import { useContext } from 'react'
import styles from 'styles/components/payment/BankSelection.module.scss'

export const BankSelection = () => {
  const { bank, setBank } = useContext(BankContext)
  const { accountNumber, setAccountNumber } = useContext(AccountNumberContext)
  const bankSelectionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBank(e.currentTarget.value)
  }
  const accountNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <label htmlFor="banks">
        {/* BANK LISTS */}
        <span>은행</span>
        <select
          name="banks"
          id="banks"
          onChange={bankSelectionHandler}
          value={bank}>
          <option value="004">KB국민은행</option>
          <option value="088">신한은행</option>
          <option value="081">하나은행</option>
          <option value="089">케이뱅크</option>
          <option value="090">카카오뱅크</option>
          <option value="011">NH농협은행</option>
          <option value="020">우리은행</option>
        </select>
      </label>
      {/* ACCOUNT NUMBER */}
      <label>
        <span>계좌번호</span>
        <input
          type="text"
          onChange={accountNumberHandler}
        />
      </label>
    </div>
  )
}
