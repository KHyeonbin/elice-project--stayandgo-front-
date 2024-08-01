import React from 'react';
import AdminBody from './AdminBody';
import SubLayout from '../layout/SubLayout';
import styled from 'styled-components';

const AdminContainer = styled.div`
  height: 70vh;
  overflow-y: auto;
`;

const LogoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Logout = styled.button`
  width: 346px;
  height: 56px;
  font-size: 14px;
  border: 1px solid #333333;
  border-radius: 10px;
  background: none;
  cursor: pointer;
`;

const AdminPage = () => {
  return (
    <>
      <SubLayout pageTitle="관리자 페이지">
        <AdminContainer>
          <AdminBody />
        </AdminContainer>
      </SubLayout>
      <LogoutContainer>
        <Logout>로그아웃</Logout>
      </LogoutContainer>
    </>
  );
};

export default AdminPage;
