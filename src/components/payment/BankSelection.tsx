import { AccountNumberContext, BankContext } from 'contexts/index'
import { useEffect, useRef } from 'react'
import { useContext, useReducer, Reducer } from 'react'

import { childProps } from 'types/index'

import styles from 'styles/components/payment/BankSelection.module.scss'

export const BankSelection = ({ setValid }: childProps) => {
  const { bank, setBank } = useContext(BankContext)
  const { accountNumber, setAccountNumber } = useContext(AccountNumberContext)
  const accountMax = useRef<HTMLInputElement>(null)

  const accountNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const acc = e.currentTarget.value.toString()
    if (acc === '' || /^[0-9\b]+$/.test(acc)) {
      setAccountNumber(e.currentTarget.value)
    }
  }
  const bankSelectionHandler = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBank(e.currentTarget.value)
    setAccountNumber('')
  }

  const reducer: Reducer<number, string> = (
    state: number,
    action: string
  ): number => {
    const actionHandlers = new Map<string, number>()
      .set('004', 12)
      .set('088', 12)
      .set('020', 13)
      .set('081', 14)
      .set('089', 12)
      .set('090', 13)
      .set('011', 13)

    if (actionHandlers.has(action)) {
      return actionHandlers.get(action) as number
    }

    return state
  }

  const [max, dispatch] = useReducer(reducer, 12)

  useEffect(() => {
    dispatch(bank)
  }, [bank])

  useEffect(() => {
    accountMax.current?.maxLength === accountNumber.length
      ? setValid(true)
      : setValid(false)
  }, [setValid, bank, accountMax, accountNumber])

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
          ref={accountMax}
          maxLength={max}
          onChange={accountNumberHandler}
          required
        />
      </label>
    </div>
  )
}
