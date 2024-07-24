import React from "react";
import styled from "styled-components";

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 290px;
  height: 75px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: fixed;
  top: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const ProfileEditSuccessModal = ({ message, onClose }) => {
  return (
    <ModalBg>
      <ModalContent>
        <ModalTitle>{message}</ModalTitle>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
      </ModalContent>
    </ModalBg>
  );
};

export default ProfileEditSuccessModal;
