import React from 'react';

const Modal = ({ children }) => {
  console.log("Modal!");
  return (
    <div className="modal__container">
      <div className="modal">
        { children }
      </div>
    </div>
  );
};
export default Modal;
