import React from 'react';
import AdminBody from '../components/admin/AdminBody';
import SubHeader from "../components/layout/SubHeader";
import SubLayout from '../components/layout/SubLayout';
import styled from 'styled-components';
import { logoutUser } from '../api/logoutUser';
import { useNavigate } from 'react-router-dom';

const AdminContainer = styled.div`
  height: 60vh;
`;

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

const Logout = styled.button`
  width: 346px;
  height: 38px;
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

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  /** 로그아웃 버튼 클릭 시 홈으로 이동 */
  const onClickHandleLogout = () => {
    logoutUser()
      .then(res => {
        if (res?.data && res.data.code === 200) {
          // 여행, 등록숙소 페이지에서 새로고침 시 로그인 상태 확인용 localstorage data 추가
          // : front 에서 강제로 localstorage 를 수정하더라도 그 때는 전역 상태 loginstate 에 저장된 값에 따라 
          // 데이터를 출력하기 때문에 빈 값이 나오도록 함.
          localStorage.setItem('is_logined', "false");
          window.location.href = '/';
        } else {
          alert("로그아웃 오류가 발생하였습니다.");
        }
      });
  };

  const onClickHandleHome = () => {
    navigate('/');
  }

  return (
    <>
      <SubHeader />
      <SubLayout pageTitle="관리자 페이지">
        <AdminContainer>
          <AdminBody />
        </AdminContainer>
      </SubLayout>
      <LogoutContainer>
        <Logout onClick={onClickHandleHome}>메인 페이지로</Logout>
        <Logout onClick={onClickHandleLogout}>로그아웃</Logout>
      </LogoutContainer>
    </>
  );
};

export default AdminPage;
