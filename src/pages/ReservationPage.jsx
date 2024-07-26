import React from "react";
import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/layout/SubHeader";
import loginState from "../atoms/loginState";
import ReservationModal from "../components/layout/ReservationModal";
import GuestModal from "../components/layout/GuestModal";
import ReservationInfo from "../components/layout/ReservationInfo";
import ReservationPrice from "../components/layout/ReservationPrice";
import {
  ImagePlaceholder,
  Flexbox,
  Section,
  SectionTitle,
  Button,
  RefundPolicy,
  DetailContainer,
  Title,
  Name,
  Description,
} from "../components/main/ReservationStyle";

const ReservationPage = ({
  title,
  description,
  name,
  initialStartDate,
  initialEndDate,
  price,
}) => {
  const setLoginUser = useSetRecoilState(loginState);
  const loginUser = useRecoilValue(loginState);
  const [dateRange, setDateRange] = useState([
    new Date(initialStartDate),
    new Date(initialEndDate),
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nights, setNights] = useState(0);
  const [guestCount, setGuestCount] = useState(1);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    // server 에 getUser 요청 후 결과에 따라 값 부여 !
    // true
    setLoginUser({
      email: "gudrjsdn8825@naver.com",
      nickName: "건우",
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
    calculateNights(new Date(initialStartDate), new Date(initialEndDate));
  }, []);

  const calculateNights = (start, end) => {
    if (start && end) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    } else {
      setNights(0);
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange([start, end]);
    if (end) {
      calculateNights(start, end);
      setShowDatePicker(false);
    }
  };

  const handleReservationRequest = () => {
    setShowConfirmationModal(true);
  };

  return (
    <>
      <Header user={loginUser} />
      <Section>
        <SectionTitle>예약 요청</SectionTitle>
        <Flexbox>
          <ImagePlaceholder />
          <DetailContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Name>호스트: {name}님</Name>
          </DetailContainer>
        </Flexbox>
      </Section>
      <Section>
        <SectionTitle>예약 정보</SectionTitle>
        <ReservationInfo
          dateRange={dateRange}
          nights={nights}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          handleDateChange={handleDateChange}
          guestCount={guestCount}
          setShowGuestModal={setShowGuestModal}
        />
      </Section>
      <Section>
        <SectionTitle>요금 세부정보</SectionTitle>
        <ReservationPrice price={price} nights={nights} />
      </Section>
      <Section>
        <RefundPolicy>
          48시간 동안 무료로 취소하실 수 있습니다. 숙박 2일 전에 취소하면 부분
          환불을 받으실 수 있습니다.
        </RefundPolicy>
        <Button onClick={handleReservationRequest}>예약 요청</Button>
      </Section>
      {showGuestModal && (
        <GuestModal
          close={() => setShowGuestModal(false)}
          guestCount={guestCount}
          setGuestCount={setGuestCount}
        />
      )}
      {showConfirmationModal && (
        <ReservationModal
          message="예약 요청이 완료되었습니다!"
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </>
  );
};

ReservationPage.defaultProps = {
  title: "전주의 집",
  description: "[옥탑방의 하루] 투룸 전주 시내 도보 관광",
  name: "혜림",
  initialStartDate: "2024-02-03",
  initialEndDate: "2024-02-05",
  price: 120000,
};

export default ReservationPage;
