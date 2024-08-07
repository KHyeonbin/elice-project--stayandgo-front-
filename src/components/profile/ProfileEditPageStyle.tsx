import styled from "styled-components";

export const ProfileEditContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const ProfileEditSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const ProfileEditEmojiPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }

  svg {
    color: white;
  }
`;

export const ProfileEmoji = styled.span`
  font-size: 75px;
  margin-bottom: 10px;
`;

export const ProfileEditForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProfileEditButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  width: 100%;
`;

export const ProfileEditSaveButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #f87878;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 50px;
`;


