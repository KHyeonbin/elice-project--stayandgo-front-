import styled from "styled-components";

export const ImagePlaceholder = styled.div`
  width: 111px;
  height: 111px;
  background-color: #d9d9d9;
  border-radius: 15px;
  margin-right: 5px;
`;

export const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 8px;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  margin-top: 16px;
  font-weight: bold;
  color: #000000;
  font-size: 16px;
  line-height: 19.36px;
`;

export const Name = styled.span`
  margin-top: 16px;
  font-size: 14px;
  line-height: 16.94px;
`;

export const Description = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 12px;
  line-height: 14.52px;
`;

export const Section = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  width: 360px;
  margin: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  line-height: 24.2px;
  font-weight: bold;
  margin-bottom: 25px;
`;

export const SectionDetail = styled.span`
  font-size: 14px;
  line-height: 16.94px;
  margin-bottom: 4px;
`;

export const SectionDetailBold = styled.span`
  font-size: 14px;
  line-height: 16.94px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const ModifyButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 12px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;

export const RefundPolicy = styled.div`
  color: #888;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
`;
