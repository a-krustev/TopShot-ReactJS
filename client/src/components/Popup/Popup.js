import React from 'react';
import Popup from 'react-popup';

export const PopupMsg = () => (
    <Popup className="mm-popup"
    btnClass="mm-popup__btn"
    closeBtn={true}
    closeHtml={null}
    defaultOk="Ok"
    defaultCancel="Cancel"
    wildClasses={false}
    escToClose={true} />
  );