import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 100;
`;
export const CloseButton = styled.button`
  margin: 10px 10px 0 0;
  top: 5px;
  right: 5px;
  background-color: white;
  position: absolute;
  border: none;
  cursor: pointer;
`;
export const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
`;
export const Name = styled.span`
  font-weight: bold;
  margin: 20px;
  font-size: 20px;
  line-height: 24px;
`;
export const Title = styled.span`
  margin: 10px 0;
  color: #333333;
  font-size: 16px;
  line-height: 20px;
`;
export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 5px;
`;
export const GuestContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
export const DescriptionBold = styled.span`
  margin-top: 3px;
  color: #555555;
  width: 55px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-align: start;
`;
export const Description = styled.span`
  margin-top: 5px;
  color: #555555;
  font-size: 15px;
  line-height: 15px;
  text-align: end;
`;