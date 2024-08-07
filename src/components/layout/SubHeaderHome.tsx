import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eeeeee;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 700px;
  background: #fff;
  z-index: 101;
`;
const LeftArea = styled.div`
  margin-left: 10px;
`;

const PrevPageBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const SubHeaderHome = () => {
  const navigate = useNavigate();

  return (
    <Container className="subHeader">
      <LeftArea>
        <PrevPageBtn onClick={() => navigate('/')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#333"
          >
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </PrevPageBtn>
      </LeftArea>
    </Container>
  );
};

export default SubHeaderHome;
