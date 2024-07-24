import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;

const GuestModal = ({ close, guestCount, setGuestCount }) => (
  <>
    <Overlay onClick={close} />
    <Modal>
      <h2>게스트 수 변경</h2>
      <Flexbox>
        <button onClick={() => setGuestCount((prev) => Math.max(prev - 1, 1))}>
          -
        </button>
        <span>{guestCount}명</span>
        <button onClick={() => setGuestCount((prev) => prev + 1)}>+</button>
      </Flexbox>
      <Button onClick={close}>확인</Button>
    </Modal>
  </>
);

export default GuestModal;
