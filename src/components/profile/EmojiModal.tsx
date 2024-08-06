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
  align-items: center;
  justify-content: center;
`;

const EmojiModalContent = styled.div`
  width: 290px;
  height: 150px;
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  bottom: 15%;
  
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  font-size: 35px;
  cursor: pointer;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
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
