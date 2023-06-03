import React from 'react';
import { Footer, Modal } from 'components';

export const Home = () => {
  return (
    <div>
      Home
      <Modal
        content={'이용 약관에 동의하세요'}
        title={'Title'}
        buttonContent={'close'}
      />
      <Footer />
    </div>
  );
};
