import styled from "styled-components";
import { Button } from 'antd';

export const Container = styled.div`
  padding: 15px 0;
  width: 100%;
`;
export const CategoryTitle = styled.h2`
  font-size: 20px;
  margin: 5px 0 5px 15px;
  width: 200px;
`;
export const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;
export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
export const StyledButton = styled(Button)`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
  background-color: #E61E51;
  transition: background-color 1s;
  cursor: pointer;
  padding: 1px 6px;
  margin-right: 15px;
  color: white;
`
