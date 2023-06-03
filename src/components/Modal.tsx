import React from 'react';
import styles from 'styles/Modal.module.scss';

export const Modal = (props) => {
  return (
    <div>
      <div className={styles.ModalBackground}>
        <div className={styles.Modal}>
          <div className={styles.Title}>
            <span>{props.title}</span>
          </div>
          <span>{props.content}</span>
          <button className={styles.Close}>
            <span>{props.buttonContent}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
