import { createPortal } from "react-dom";
import styled from "@emotion/styled";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  min-width: 280px;
  padding: 32px 24px 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const Modal = ({ children }) => {
  return createPortal(
    <Overlay>
      <Content role="dialog" aria-modal="true">
        {children}
      </Content>
    </Overlay>,
    document.getElementById("modal-root")
  );
};

export default Modal;