import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/layout/SubHeader';
import loginState from '../atoms/loginState';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import HistoryCard from '../components/main/HistoryCard';
import styled from 'styled-components';
import No from '../components/layout/No';

const Title = styled.h1`
  font-size: 20px;
  line-height: 24.2px;
  margin: 25px 15px;
`;

const HistoryPage = () => {
  const setLoginUser = useSetRecoilState(loginState);
  const loginUser = useRecoilValue(loginState);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // server 에 getUser 요청 후 결과에 따라 값 부여 !
    // true
    setLoginUser({
      email: 'gudrjsdn8825@naver.com',
      nickName: '건우',
      is_admin: false,
      is_logined: false,
    });
    // false
    /*
        setLoginUser({
            email: "",
            nickName: "건우",
            is_admin: false,
            is_logined: false
        });
        */
  }, []);

  return (
    <>
      <Header user={loginUser} />
      <Title>여행</Title>
      <No></No>
      <Title>이전 여행지</Title>
      <HistoryCard />
      <HistoryCard title="부산의 집" />
      <HistoryCard title="강릉의 집" />
      <HistoryCard title="제주의 집" />
      <HistoryCard title="서울의 집" />
      <HistoryCard title="대전의 집" />
    </>
  );
};

export default HistoryPage;
