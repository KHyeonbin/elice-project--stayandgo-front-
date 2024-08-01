//예약페이지 내 예약정보 부분
import React from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import {
  Flexbox,
  ColumnBox,
  SectionDetail,
  SectionDetailBold,
  ModifyButton,
} from "./ReservationStyle";

const ReservationInfo = ({
  dateRange,
  nights,
  showDatePicker,
  setShowDatePicker,
  handleDateChange,
  guestCount,
  setShowGuestModal,
}) => {
  const today = new Date(); // 오늘 날짜를 변수에 저장

  return (
    <>
      <Flexbox>
        <ColumnBox>
          <SectionDetailBold>날짜</SectionDetailBold>
          <SectionDetail>
            {dateRange[0].toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            ~{" "}
            {dateRange[1] &&
              dateRange[1].toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            ({nights}박)
          </SectionDetail>
        </ColumnBox>
        <ModifyButton onClick={() => setShowDatePicker(!showDatePicker)}>
          수정
        </ModifyButton>
      </Flexbox>
      {showDatePicker && (
        <DatePicker
          selected={dateRange[0]}
          onChange={handleDateChange}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          selectsRange
          locale={ko}
          inline
          minDate={today}
        />
      )}
      <Flexbox>
        <ColumnBox>
          <SectionDetailBold>게스트</SectionDetailBold>
          <SectionDetail>게스트 {guestCount}명</SectionDetail>
        </ColumnBox>
        <ModifyButton onClick={() => setShowGuestModal(true)}>
          수정
        </ModifyButton>
      </Flexbox>
    </>
  );
};

export default ReservationInfo;
