import React, { useState, useEffect } from "react";
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
  Section,
  SectionTitle,
  Button,
  RefundPolicy,
  DetailContainer,
  Title,
  Name,
  Description,
  Container,
  RequestContainer,
} from "../components/reservation/ReservationStyle";

const ReservationPage = ({ title, description, name, initialStartDate, initialEndDate, price }) => {
  const setLoginUser = useSetRecoilState(loginState);
  const loginUser = useRecoilValue(loginState);
  const [dateRange, setDateRange] = useState([
    new Date(initialStartDate),
    new Date(initialEndDate),
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false); //달력 기능
  const [nights, setNights] = useState(0); //숙박일수 계산
  const [guestCount, setGuestCount] = useState(1); //게스트 인원 수
  const [showGuestModal, setShowGuestModal] = useState(false); //게스트 모달
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); //예약확인 버튼 누를때 모달창 열림
  const [product, setProduct] = useState({
    image: "",
    title: "",
    description: "",
    name: "",
    price: 0,
  }); //상품 상태 변수

  useEffect(() => {
    // server 에 getUser 요청 후 결과에 따라 값 부여 !
    // true
    setLoginUser({
      email: 'gudrjsdn8825@naver.com',
      nickName: '건우',
      is_admin: false,
      is_logined: false,
    });

    //숙박일수 계산 함수(시작, 끝)
    calculateNights(new Date(initialStartDate), new Date(initialEndDate));

    // 서버에서 상품 정보를 가져오는 함수
    const fetchProductData = async () => {
      try {
        const response = await fetch("/productData.json"); // 실제 API 엔드포인트로 변경 필요
        if (!response.ok) {
          throw new Error("네트워크 응답 오류");
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
        console.error("상품정보 불러오기 실패:", error);
      }
    };

    fetchProductData();
  }, []);

  //숙박일수 계산 함수
  const calculateNights = (start, end) => {
    if (start && end) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    } else {
      setNights(0);
    }
  };

  //달력에서 시작, 끝 날짜 배열을 받아와서 상태 저장후 숙박일수 계산 및 달력닫기
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
        throw new Error("네트워크 응답 오류");
      }

      const result = await response.json();
      console.log("예약 요청 성공:", result);
      setShowConfirmationModal(true); // 예약 요청 성공 시 모달창 띄우기
    } catch (error) {
      console.error("예약 요청 실패:", error);
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
          <RequestContainer>
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
          </RequestContainer>
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

// 현재 날짜와 내일 날짜를 기본값으로 설정
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

ReservationPage.defaultProps = {
  title: "전주의 집",
  description: "[옥탑방의 하루] 투룸 전주 시내 도보 관광",
  name: "혜림",
  initialStartDate: today.toISOString().split("T")[0], // 현재 날짜
  initialEndDate: tomorrow.toISOString().split("T")[0], // 내일 날짜
  price: 120000,
};

export default ReservationPage;
