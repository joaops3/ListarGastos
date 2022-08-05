import * as C from "../styles/styled";
import React, { memo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

interface ModalInterface {
  modalOn: boolean;
  setModal: () => void;
}

const Modal: React.FC<ModalInterface> = ({ modalOn, setModal }) => {
  return (
    <>
      {modalOn && (
        <div className="flex-icon">
          <C.Modal>
            <C.ButtonContainer>
              <AiOutlineClose
                className="iconclose"
                onClick={() => setModal()}
              ></AiOutlineClose>
            </C.ButtonContainer>
            <C.ModalText>Sucesso</C.ModalText>
          </C.Modal>
        </div>
      )}
    </>
  );
};

export default React.memo(Modal);
