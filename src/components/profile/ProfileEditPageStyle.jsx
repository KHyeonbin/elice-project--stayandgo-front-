import styled from "styled-components";

export const ProfileEditContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

export const ProfileEditSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const ProfileEditImgContainer = styled.div`
  margin-bottom: 20px;
`;

export const ProfileEditImgPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  cursor: pointer;

  svg {
    color: white;
  }
`;

export const ProfileEditForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProfileEditInput = styled.input`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #dddddd;
  outline: none;

  &:focus {
    border: 1px solid #f87878;
  }
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
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  padding: 5px 0;
`;
