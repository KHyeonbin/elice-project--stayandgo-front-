import React from "react";
import SubHeader from "../components/layout/SubHeader";
import SubLayout from "../components/layout/SubLayout";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 30vh;

    display: flex;
    justify-content: center;
    align-items: center;
`
const UserBtn = styled.button`
    width: 200px;
    height: 65px;
    border: none;
    border-radius: 20px;
    color: white;
    background-color: #E61E51;
    transition: background-color 1s;
    cursor: pointer;

    &:hover{
        background-color: #FF6F8C;
    }
`

const AdminIntroPage: React.FC = () => {
    return (
        <>
            <SubHeader />
            <SubLayout pageTitle="관리자 페이지" children={undefined} />
            <Container>
                <Link to={'users/'}>
                    <UserBtn>회원 리스트</UserBtn>
                </Link>
            </Container>
        </>
    );
}

export default AdminIntroPage;