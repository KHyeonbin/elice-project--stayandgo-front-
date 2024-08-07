import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import homeImage from '../../assets/images/home.png';
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

const RightArea = styled.div`
  margin-right: 20px;
`;
const LinkDiv = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;

  background-image: url(${homeImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const LinkText = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const SubHeader = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    window.location.href = "/";
  }

  return (
    <Container className="subHeader">
      <LeftArea>
        <PrevPageBtn onClick={() => navigate(-1)}>
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
      <RightArea>
        <LinkDiv onClick={onClickHome} />
      </RightArea>
    </Container>
  );
};

export default SubHeader;
