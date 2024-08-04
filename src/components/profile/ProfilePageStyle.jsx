import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: start;
  padding-bottom: 31px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ProfileEmoji = styled.span`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

export const ProfileName = styled.h3`
  font-size: 16px;
  font-weight: 400;
  color: #333333;
`;

export const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const ProfileLabel = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
`;

export const ProfileEdit = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    transform: rotate(180deg);
  }
`;

export const ProfileDelete = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
`;

export const ProfileLogout = styled.button`
  width: 100%;
  height: 56px;
  font-size: 14px;
  border: 1px solid #333333;
  color: #333333;
  border-radius: 10px;
  background: none;
  cursor: pointer;
  margin-top: 30%;
`;
