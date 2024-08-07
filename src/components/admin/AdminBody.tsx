import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import loginState from '../../atoms/loginState';
import { allUserLoad } from '../../api/allUserLoad';
import { adminDeleteUser } from '../../api/profile';
import ProfileModal from "../profile/ProfileModal";
import {User, UserDetailType } from '../../model/admin/admin'

// 스타일 컴포넌트들
const AdminContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-top: 1px solid #aaa;
  overflow-y: auto;
  overflow-x: hidden;
`;

const UserManagement = styled.div`
  width: 40%;
  padding-top: 2px;
  border-right: 1px solid #aaa;
  font-size: 14px;
  overflow: auto;
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

const UserItem = styled.li.attrs<{$is_clicked: boolean}>(props => ({
  style: {backgroundColor: props.$is_clicked ? "#f87878" : "white",
          color: props.$is_clicked ? "white" : "#333"
  }
}))`
  margin-right: 5px;
  padding: 5px;
  border: none;
  font-size: 11px;
  border-radius: 15px;
  cursor: pointer;
  background-color: white;
  color: #333;
  transition: background-color 0.5s;
`;

const UserDetailInfo = styled.div`
  padding-top: 2px;
  padding-left: 15px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 60%;
  box-sizing: border-box;
  overflow: auto;
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
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
  display: flex;
  font-size: 12px;
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
  font-size: 12px;
  color: #f87878;
  cursor: pointer;
`;

// AdminBody 컴포넌트
const AdminBody: React.FC = () => {
  // 로그인 전역 상태
  const loginUser = useRecoilValue(loginState);
  
  const navigate = useNavigate();

  // 삭제 확인 모달 상태
  const [isModal, setIsModal] = useState(false);

  // 유저 목록 데이터 
  const [userAll, setUserAll] = useState<User[]>([]);

  // 유저 상세 보기 상태
  const detailDefaultValue: UserDetailType = {
    photo: '👤',
    email: 'test@test.com',
    nickname: 'test',
    name: '홍길동',
    phone: '010-1234-5678',
    isAdmin: false,
    is_admin: false,
    create_at: "",
    update_at: ""
  }
  const [userDetail, setUserDetail] = useState<UserDetailType>(detailDefaultValue);

  // 첫 페이지 진입 시
  useEffect(() => {
    if (!loginUser.is_admin) {
      alert('지정된 경로로 이동하지 않거나, 관리자가 아닙니다.');
      navigate('/');
      return;
    }
    // 유저 목록 불러오기
    loadUsers();
  }, [loginUser.is_admin, navigate]);

  // 유저 목록을 불러오는 함수
  const loadUsers = async () => {
    try {
      const res = await allUserLoad();
      if (res && res.data) {
        setUserAll(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // user list 중 특정 유저 선택
  const onClickUserItem = (v: User) => {
    setUserDetail({
      photo: v.photo,
      email: v.email,
      nickname: v.nickname,
      name: v.name,
      phone: v.phone,
      isAdmin: v.is_admin,
      is_admin: v.is_admin,
      create_at: v.create_at,
      update_at: v.update_at
    });
  };
  
  // user 지정 후 삭제 시도
  const onClickDelUser = () => {
    setIsModal(true);
  }

  /** 삭제 취소 */
  const onClickHandleCancelDelete = () => {
    setIsModal(false);
  };

  /** 삭제 확인 */
  const onClickHandleConfirmDelete = async () => {
    if (userDetail.isAdmin) {
      alert('관리자 아이디는 삭제할 수 없습니다.');
      setIsModal(false);
      return;
    }
    try {
      const res = await adminDeleteUser(userDetail.email);
      if (res.data && res.data.code === 200) {
        alert(userDetail.email + ' 유저가 정상적으로 삭제되었습니다.');
        setIsModal(false);
        // 유저 목록 새로고침
        loadUsers();
        // 상세 정보 초기화
        setUserDetail(detailDefaultValue);
      } else {
        alert("유저 삭제에 실패하였습니다.");
      }
    } catch (e) {
      console.error('삭제 중 오류:', e);
      alert("유저 삭제 중 오류가 발생했습니다.");
      setIsModal(false);
    }
  };

  return (
    <AdminContainer>
      <UserManagement>
        <Title>회원 관리</Title>
        <UserList>
          {userAll.map((v) => (
            <UserItem key={v.email} onClick={() => onClickUserItem(v)} $is_clicked={v.email === userDetail.email}>
              <span>{v.name}<br/></span>
              <span>({v.email})</span>
            </UserItem>
          ))}
        </UserList>
      </UserManagement>
      <UserDetailInfo>
        <UserDetail>
          {!isModal ?
            <>
              <Title>상세 회원 정보</Title>
              <EmojiPlaceholder>
                <Emoji>{userDetail.photo}</Emoji>
              </EmojiPlaceholder>
              <DetailItem>
                <DetailLabel>관리자 여부</DetailLabel>
                <DetailValue>{userDetail.isAdmin ? "true" : "false"}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>이메일</DetailLabel>
                <DetailValue>{userDetail.email}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>닉네임</DetailLabel>
                <DetailValue>{userDetail.nickname}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>이름</DetailLabel>
                <DetailValue>{userDetail.name}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>휴대폰 번호</DetailLabel>
                <DetailValue>{userDetail.phone}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>생성 일자</DetailLabel>
                <DetailValue>{userDetail.create_at}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>수정 일자</DetailLabel>
                <DetailValue>{userDetail.update_at}</DetailValue>
              </DetailItem>
              <UserDeleteContainer>
                <UserDelete onClick={() => onClickDelUser()}>회원 삭제</UserDelete>
              </UserDeleteContainer>
            </> :
            <ProfileModal
              message="정말 삭제하시겠습니까? 해당 유저의 숙소 및 예약(여행) 정보가 모두 제거됩니다."
              onConfirm={onClickHandleConfirmDelete}
              onCancel={onClickHandleCancelDelete}
              onClose={() => {}}
              isDelete={false}
            /> 
          }
        </UserDetail>
      </UserDetailInfo>
    </AdminContainer>
  );
};

export default AdminBody;

