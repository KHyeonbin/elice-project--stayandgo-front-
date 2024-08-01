import React from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border-top: 1px solid #aaa;
  padding: 0;
`;

const UserManagement = styled.div`
  padding: 5px 10px;
  border-right: 1px solid #aaa;
  flex: 0.5; 
  font-size: 14px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const UserList = styled.ul`
  padding: 0;
  margin: 0;
`;

const UserItem = styled.li`
  padding: 5px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  cursor: pointer;
  
  &:hover {
    background-color: #f87878;
  }
`;

const UserDetailInfo = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1.5;
  box-sizing: border-box;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const EmojiPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 30px;
  cursor: pointer;
`;

const Emoji = styled.span`
  font-size: 70px;
  margin-bottom: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0 0 15px;
  padding: 10px;
  width: 100%; 
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #dddddd;
`;

const DetailLabel = styled.span`
  font-size: 14px;
  font-weight: bold;
  width: 40%; 
  display: flex;
  align-items: center;
`;

const DetailValue = styled.span`
  flex-grow: 1;
  display: flex;
  font-size: 14px;
  font-weight: 500;
`;

const UserDeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 400px;
  margin-top: 10px;
`;

const UserDelete = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  color: #f87878;
  cursor: pointer;
`;

const AdminBody = () => {
  const user = {
    photo: '👤',
    email: 'test@test.com',
    nickname: 'test',
    name: '홍길동',
    phone: '010-1234-5678',
    isAdmin: true,
  };

  return (
    <AdminContainer>
      <UserManagement>
        <Title>회원 관리</Title>
        <UserList>
          <UserItem>
            <span>{user.name}</span>
            <span>({user.email})</span>
          </UserItem>
          <UserItem>
            <span>{user.name}</span>
            <span>({user.email})</span>
          </UserItem>
        </UserList>
      </UserManagement>
      <UserDetailInfo>
        <UserDetail>
          <Title>상세 회원 정보</Title>
          <EmojiPlaceholder>
            <Emoji>{user.photo}</Emoji>
          </EmojiPlaceholder>
          <DetailItem>
            <DetailLabel>이메일</DetailLabel>
            <DetailValue>{user.email}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>닉네임</DetailLabel>
            <DetailValue>{user.nickname}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>이름</DetailLabel>
            <DetailValue>{user.name}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>휴대폰 번호</DetailLabel>
            <DetailValue>{user.phone}</DetailValue>
          </DetailItem>
          <UserDeleteContainer>
            <UserDelete>회원 삭제</UserDelete>
          </UserDeleteContainer>
        </UserDetail>
      </UserDetailInfo>
    </AdminContainer>
  );
};

export default AdminBody;
