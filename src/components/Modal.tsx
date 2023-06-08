import styles from 'styles/Modal.module.scss'
import { ModalProps } from 'types/index'

export const Modal = (props: ModalProps) => {
  return (
    <div>
      <div className={styles.modalbackground}>
        <div className={styles.modal}>
          <div className={styles.title}>
            <span>{props.title}</span>
          </div>
          <span className={styles.content}>{props.content}</span>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={props.onClickOkButton}>
              <span>{props.okButtonText}</span>
            </button>
            {props.isTwoButton ? (
              <button
                className={styles.button}
                onClick={props.onClickOkButton}>
                <span>{props.cancelButtonText}</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
