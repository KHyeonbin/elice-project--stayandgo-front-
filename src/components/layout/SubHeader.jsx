import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eeeeee;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;
`;
const LeftArea = styled.div`
  margin-left: 10px;
`;

const PrevPageBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const RightArea = styled(LeftArea)``;
const LinkDiv = styled.div`
  width: 80px;
  height: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  transition: background-color 0.5s;

  &:hover {
    background-color: #ffeef3;
  }
`;

const LinkText = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const SubHeader = ({ isLogin }) => {
  const navigate = useNavigate();

  return (
    <Container>
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
        {(isLogin && (
          <>
            <LinkDiv>
              <LinkText to={"/"}>숙소등록</LinkText>
            </LinkDiv>
            <LinkDiv>
              <LinkText to={"/"}>로그아웃</LinkText>
            </LinkDiv>
          </>
        )) || (
          <>
            <LinkDiv>
              <LinkText to={"/"}>로그인</LinkText>
            </LinkDiv>
          </>
        )}
      </RightArea>
    </Container>
  );
};

export default SubHeader;
