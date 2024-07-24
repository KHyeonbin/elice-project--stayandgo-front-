// ReservationInfo.js
import React from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import {
  ColumnBox,
  SectionDetail,
  Flexbox,
  ModifyButton,
} from "../main/ReservationStyle";

const ReservationInfo = ({
  dateRange,
  nights,
  showDatePicker,
  setShowDatePicker,
  handleDateChange,
  guestCount,
  setShowGuestModal,
}) => (
  <>
    <Flexbox>
      <ColumnBox>
        <SectionDetail>날짜</SectionDetail>
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
      />
    )}
    <Flexbox>
      <ColumnBox>
        <SectionDetail>게스트</SectionDetail>
        <SectionDetail>게스트 {guestCount}명</SectionDetail>
      </ColumnBox>
      <ModifyButton onClick={() => setShowGuestModal(true)}>수정</ModifyButton>
    </Flexbox>
  </>
);

export default ReservationInfo;
