// PriceDetails.js
import React from "react";
import { Flexbox, SectionDetail } from "../main/ReservationStyle";

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
    <Flexbox>
      <SectionDetail>총 합계</SectionDetail>
      <SectionDetail>
        ₩{(price * nights + (price * nights) / 10).toLocaleString()}
      </SectionDetail>
    </Flexbox>
  </>
);

export default ReservationPrice;
