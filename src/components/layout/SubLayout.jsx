import styled from "styled-components";
import SubHeader from "./SubHeader";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../../atoms/TokenAtom";

const Container = styled.div`
  padding: 0 15px 60px 15px;
`;

const H2 = styled.h2`
  font-size: 20px;
  padding: 27px 0 25px;
`;

const SubLayout = ({ pageTitle, children }) => {
  const isLogin = useRecoilValue(isLoginSelector);
  return (
    <>
      <Container>
        <H2>{pageTitle}</H2>
        {children}
      </Container>
    </>
  );
};

export default SubLayout;
