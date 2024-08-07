import styled from "styled-components";
import { Link, useNavigate  } from "react-router-dom";
import { logoutUser } from "../../api/logoutUser";
import React from "react";
import { HeaderProps } from "../../model/main(with detail, upload)/mainTypes";

const Container = styled.div`
    top: 0;
    width: 100%;
    height: 65px;
    background-color: white;
    padding-bottom: 20px;
    border-bottom: 2px solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const LeftArea = styled.div`
    width: 200px; 
    height: 50px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 10px;
    cursor: pointer;
    color:#FF385C;
    transition: color 0.5s;
    &:hover{
        color: #FF6F8C;
    }
`
const TextLogo = styled.p`
    font-size: 23px;
    font-family: "Playwrite BE VLG", sans-serif;
    font-weight: bold;
`
const RightArea = styled(LeftArea)`
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
    margin-top: 20px;
`
const LinkDiv = styled.div`
    width: 80px;
    height: 30px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;
    transition: background-color 0.5s;

    &:hover{
        background-color: #FFEEF3;
    }
`

const LinkText = styled(Link)`
    font-size: 14px;
    font-weight: 500;
    color: #FF385C;

    transition: color 0.5s;

    &:hover{
        color: #FF6F8C;
    }
`

const AText = styled.a`
    font-size: 14px;
    font-weight: 500;
    color: #FF385C;

    transition: color 0.5s;

    &:hover{
        color: #FF6F8C;
    }
    &:focus{
        color: #FF385C;
    }
`

const Header : React.FC <HeaderProps> = ({user, isModal}) => {
    const navigate = useNavigate();

    const onClickHome = () => {
        window.location.href = '/';
    }

    const onClickLogout = () : void => {
        logoutUser()
        .then(res => {
            if(res?.data && res.data.code === 200){
                // 여행, 등록숙소 페이지에서 새로고침 시 로그인 상태 확인용 localstorage data 추가
                // : front 에서 강제로 localstorage 를 수정하더라도 그 때는 전역 상태 loginstate 에 저장된 값에 따라 
                // 데이터를 출력하기 때문에 빈 값이 나오도록 함.
                localStorage.setItem('is_logined', "false");
                window.location.href = '/';
            } else {
                alert("로그아웃 오류가 발생하였습니다.");
            }
        });
    };
    console.log(user)

    return (
        <>
            {isModal && 
                <></> 
                ||
                <>
                    <Container>
                    <LeftArea onClick={onClickHome}>
                        <TextLogo>
                            stayandgo
                        </TextLogo>
                    </LeftArea>
                    <RightArea>
                        {user.is_logined &&
                            <>
                                {user.is_admin &&
                                    <LinkDiv><LinkText to={'/admin'}>관리자</LinkText></LinkDiv>
                                }
                                <LinkDiv><LinkText to={'/upload'}>숙소등록</LinkText></LinkDiv>
                                <LinkDiv><AText onClick={onClickLogout}>로그아웃</AText></LinkDiv>
                            </>
                        ||
                            <>
                                <LinkDiv><LinkText to={'/login'}>로그인</LinkText></LinkDiv>
                            </>
                        }
                    </RightArea>
                    </Container>
                </>
            }
        </>
        
    );
}

export default Header;