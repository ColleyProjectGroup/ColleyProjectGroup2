import { AccountNumberContext, BankContext } from 'contexts/index'
import { useEffect } from 'react'
import { useContext, useReducer } from 'react'

import styles from 'styles/components/payment/BankSelection.module.scss'

export const BankSelection = () => {
  const { bank, setBank } = useContext(BankContext)
  const { accountNumber, setAccountNumber } = useContext(AccountNumberContext)

  const accountNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const acc = e.currentTarget.value.toString()
    if (acc === '' || /^[0-9\b]+$/.test(acc)) {
      setAccountNumber(e.currentTarget.value)
    }
  }
  const bankSelectionHandler = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    await setBank(e.currentTarget.value)
  }

  function reducer(state: number, action: string) {
    switch (action) {
      case '004':
        return (state = 12)
      case '088':
        return (state = 12)
      case '020':
        return (state = 13)
      case '081':
        return (state = 14)
      case '089':
        return (state = 12)
      case '090':
        return (state = 13)
      case '011':
        return (state = 13)
      default:
        return (state = 12)
    }
  }
  const [max, dispatch] = useReducer(reducer, 12)
  useEffect(() => {
    dispatch(bank)
  }, [bank])

  return (
    <div className={styles.container}>
      <label htmlFor="banks">
        {/* BANK LISTS */}
        <span>은행</span>
        <select
          name="banks"
          id="banks"
          value={bank}
          onChange={bankSelectionHandler}
          required>
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
          value={accountNumber}
          maxLength={max}
          onChange={accountNumberHandler}
          required
        />
      </label>
    </div>
  )
}
