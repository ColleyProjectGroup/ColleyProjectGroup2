import { ModalProps } from 'types/index'
import styles from 'src/styles/components/Modal.module.scss'

export const Modal = (props: ModalProps) => {
  return (
    <div>
      <div className={styles.modalbackground}>
        <div className={styles.modal}>
          <div className={styles.title}>
            <span>{props.title}</span>
          </div>
          <span className={props.content ? styles.content : ''}>
            {props.content}
          </span>
          {props.children}
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={props.onClickOkButton}>
              <span>{props.okButtonText}</span>
            </button>
            {props.isTwoButton ? (
              <button
                className={styles.button}
                onClick={props.onClickCancelButton}>
                <span>{props.cancelButtonText}</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
