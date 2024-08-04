import styled from "styled-components";

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const Button = styled.button`
    width: 85px;
    height: 38px;
    font-size: 12px;
    font-weight: 500;
    padding: 10px 10px;
    margin-right: 15px;
    border: none;
    border-radius: 10px;
    background-color: #E61E51;
    transition: background-color 1s;
    cursor: pointer;
    color: white;

    &:hover{
        background-color: #F0586F;
    }
`
