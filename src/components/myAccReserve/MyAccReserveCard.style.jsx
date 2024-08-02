import styled from "styled-components";
import { Checkbox } from 'antd';

export const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 15px;
  width: 300px;
  height: 111px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  position: relative;
`;
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
`;
export const Title = styled.span`
  margin-top: 16px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19.36px;
`;
export const Name = styled.span`
  margin-top: 16px;
  font-size: 14px;
  line-height: 16.94px;
`;
export const DateContainer = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
`;
export const StartDate = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  width: 50%;
  color: #555555;
  font-size: 14px;
  line-height: 16.94px;
  border-right: 2px solid #dddddd;
`;
export const EndDate = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;
  width: 50%;
  color: #555555;
  font-size: 14px;
  line-height: 16.94px;
`;
export const DescriptionBold = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 14px;
  line-height: 16.94px;
`;
export const Description = styled.span`
  margin-top: 3px;
  color: #555555;
  font-size: 12px;
  line-height: 14.52px;
`;
export const CheckboxOption = styled(Checkbox)`
  position: absolute;
  right: 5px;
  top: 5px;

  .ant-checkbox-inner {
    width: 24px;  
    height: 24px; 
    border-radius: 5px; 
  }

  .ant-checkbox-inner:after {
    width: 7px; 
    height: 12px;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #E61E51 !important;
    border: 1px solid #F0586F !important;
  }
`;