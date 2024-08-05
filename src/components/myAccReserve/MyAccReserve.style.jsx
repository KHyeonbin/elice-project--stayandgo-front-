import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 60px;
`;

export const SelectDiv = styled.div`
  display: flex;
  justify-content: end;
  width: calc(100% - 30px);
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 15px auto 0;
  & > div {
    width: 100%;
    border-radius: 10px;
    > div {
      width: 100%;
      border-radius: 10px;
    }
  };
`;

export const selectCustom = {
  option: (provided, state) => {
    let backgroundColor = 'white';
    let color = '#333';
    if(state.isSelected){
        backgroundColor = '#F0586F';
        color = 'white';
    } else if(state.isFocused){
        backgroundColor = '#F07C8C';
        color = 'white';
    }
    return {
      ...provided,
      backgroundColor,
      color,
      padding: 20,
      border: "none",
      fontSize: "16px"
    };
  },
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: 'none',
    width: "220px",
    fontSize: "16px"
  }),
  menu: (provided) => ({
    ...provided,
    border: "none",
    fontSize: "16px"
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
    fontSize: "16px"
  }),
};
