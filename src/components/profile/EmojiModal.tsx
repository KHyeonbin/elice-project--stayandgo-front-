import React from "react";
import styled from "styled-components";
import { EmojiModalProps } from "../../model/profile/profile"

const EmojiModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 50%;
`;

const EmojiModalContent = styled.div`
  width: 310px;
  height: auto;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  position: relative;

  @media (max-width: 400px) {
    width: 80%;
    padding: 15px;
  }
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 400px) {
    font-size: 25px;
    padding: 0;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1px;
  right: 3px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

/** 개인정보 수정 프로필 이모지 모달 */
const EmojiModal: React.FC<EmojiModalProps> = ({ onSelect, onClose }) => {
  const emojis = ["🧒🏻", "👦🏻", "👧🏻", "👨🏻", "👩🏻", "👶🏻", "👱🏻‍♂️", "👱🏻‍♀️", "👨🏻‍🦳", "👵🏻"];

  return (
    <EmojiModalOverlay>
      <EmojiModalContent>
        {emojis.map((emoji) => (
          <EmojiButton key={emoji} onClick={() => onSelect(emoji)}>
            {emoji}
          </EmojiButton>
        ))}
        <CloseButton onClick={onClose}>x</CloseButton>
      </EmojiModalContent>
    </EmojiModalOverlay>
  );
};

export default EmojiModal;
