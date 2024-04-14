import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
}

function Modal({ visible, children }: ModalProps) {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper visible={visible}>
        <ModalInner className="modal-inner">{children}</ModalInner>
      </ModalWrapper>
    </>
  );
}

const ModalWrapper = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div<{ visible: boolean }>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 600px;
  max-width: 600px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 30px 45px;
  svg {
    float: right;
  }

  @media screen and (min-width: 280px) and (max-width: 349px) {
    padding: 15px 22px;
    width: 15rem;
  }

  @media screen and (min-width: 350px) and (max-width: 569px) {
    padding: 15px 22px;
    width: 20rem;
  }

  @media screen and (min-width: 570px) and (max-width: 800px) {
    width: 30rem;
  }
`;

export default Modal;
