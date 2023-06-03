import React from 'react';
import styles from 'styles/Modal.module.scss';

export const Modal = () => {
  return (
    <div>
      <div className={styles.ModalBackground}>
        <div className={styles.Modal}>
          <div className={styles.Title}>
            <span>title</span>
          </div>
          <span>이용 약관에 동의하세요</span>
          <button className={styles.Close}>
            <span>close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
