import React from 'react';
import AdminBody from '../components/admin/AdminBody';
import SubLayout from '../components/layout/SubLayout';
import styled from 'styled-components';
import { logoutUser } from '../api/logoutUser';

const AdminContainer = styled.div`
  height: 70vh;
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
  border: 1px solid #f87878;
  color: #f87878;
  border-radius: 10px;
  background: none;
  cursor: pointer;
  transition: all 1s;

  &:hover{
    color: white;
    background-color: #f87878;
  }
`;

/** 로그아웃 버튼 클릭 시 홈으로 이동 */
const onClickHandleLogout = () => {
  logoutUser()
    .then(res => {
      if (res?.data && res.data.code === 200) {
        window.location.href = '/';
      } else {
        alert("로그아웃 오류가 발생하였습니다.");
      }
    });
};

const AdminPage = () => {
  return (
    <>
      <SubLayout pageTitle="관리자 페이지">
        <AdminContainer>
          <AdminBody />
        </AdminContainer>
      </SubLayout>
      <LogoutContainer>
        <Logout onClick={onClickHandleLogout}>로그아웃</Logout>
      </LogoutContainer>
    </>
  );
};

export default AdminPage;
