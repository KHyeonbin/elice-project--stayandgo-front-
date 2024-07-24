// PriceDetails.js
import React from "react";
import {
  Flexbox,
  SectionDetail,
  SectionDetailBold,
  TotalBox,
} from "./ReservationStyle";

const ReservationPrice = ({ price, nights }) => (
  <>
    <Flexbox>
      <SectionDetail>
        ₩{price.toLocaleString()} x {nights}박
      </SectionDetail>
      <SectionDetail>₩{(price * nights).toLocaleString()}</SectionDetail>
    </Flexbox>
    <Flexbox>
      <SectionDetail>서비스 수수료(10%)</SectionDetail>
      <SectionDetail>₩{((price * nights) / 10).toLocaleString()}</SectionDetail>
    </Flexbox>
    <TotalBox>
      <SectionDetailBold>총 합계</SectionDetailBold>
      <SectionDetail>
        ₩{(price * nights + (price * nights) / 10).toLocaleString()}
      </SectionDetail>
    </TotalBox>
  </>
);

export default ReservationPrice;
