import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  width: 100%;
`;

export const Button = styled.div`
  width: 85px;
  height: 38px;
  border: 1px solid #f87878;
  border-radius: 10px;
  padding: 10px 10px;
  text-align: center;
  font-size: 12px;
  color: #f87878;
  cursor: pointer;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 17px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const ListItem = styled.div`
  background-color: white;
  border-radius: 15px;
  width: 173px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin: 0 auto;
`;

export const Image = styled.div`
  background-color: #f1f1f1;
  width: 100%;
  height: 173px;
  border-radius: 15px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
`;

export const CheckBox = styled.input`
  position: relative;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 15px 0;
`;

export const Title = styled.span`
  font-size: 12px;
  color: #333333;
`;

export const Description = styled.span`
  font-size: 12px;
  color: #555555;
`;

export const Price = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #000000;
`;
