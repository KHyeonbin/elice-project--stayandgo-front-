import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/layout/SubHeader";
import Footer from "../components/layout/MainFooter";
import loginState from "../atoms/loginState";
import ReservationModal from "../components/reservation/ReservationModal";
import GuestModal from "../components/reservation/GuestModal";
import ReservationInfo from "../components/reservation/ReservationInfo";
import ReservationPrice from "../components/reservation/ReservationPrice";
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
} from "../components/reservation/ReservationStyle";

const Container = styled.div`
  padding-bottom: 60px;
`;

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
  const [product, setProduct] = useState({
    image: "",
    title: "",
    description: "",
    name: "",
    price: 0,
  });

  useEffect(() => {
    // server 에 getUser 요청 후 결과에 따라 값 부여 !
    // true
    setLoginUser({
      email: "gudrjsdn8825@naver.com",
      nickName: "건우",
      is_admin: false,
      is_logined: false,
    });

    calculateNights(new Date(initialStartDate), new Date(initialEndDate));

    // 서버에서 상품 정보를 가져오는 함수
    const fetchProductData = async () => {
      try {
        const response = await fetch("/productData.json"); // 실제 API 엔드포인트로 변경 필요
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct({
          image: data.image,
          title: data.title,
          description: data.description,
          name: data.hostName,
          price: data.price,
        });
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProductData();
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

  //예약요청시 서버로 넘기는 함수
  const sendReservationRequest = async () => {
    const reservationData = {
      title,
      name,
      price,
      startDate: dateRange[0],
      endDate: dateRange[1],
      guestCount,
      totalPrice: price * nights,
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Reservation request successful:", result);
      setShowConfirmationModal(true); // 예약 요청 성공 시 모달창 띄우기
    } catch (error) {
      console.error("There was a problem with the reservation request:", error);
    }
  };

  const handleReservationRequest = () => {
    sendReservationRequest();
  };

  return (
    <>
      <Header user={loginUser} />
      <Container>
        <Section>
          <SectionTitle>예약 요청</SectionTitle>
          <Flexbox>
            {product.image ? (
              <img src={product.image} alt={product.title} />
            ) : (
              <ImagePlaceholder />
            )}
            <DetailContainer>
              <Title>{product.title}</Title>
              <Description>{product.description}</Description>
              <Name>호스트: {product.name}님</Name>
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
          <ReservationPrice price={product.price} nights={nights} />
        </Section>
        <Section>
          <RefundPolicy>
            48시간 동안 무료로 취소하실 수 있습니다. 숙박 2일 전에 취소하면 부분
            환불을 받으실 수 있습니다.
          </RefundPolicy>
          <Button onClick={handleReservationRequest}>예약 요청</Button>
        </Section>
      </Container>
      <Footer user={loginUser} />
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
