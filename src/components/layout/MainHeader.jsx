import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 65px;
    background-color: white;
    padding-bottom: 20px;
    border-bottom: 2px solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
`
const LeftArea = styled.div`
    width: 200px; 
    height: 50px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 10px;
`
const TextLogo = styled.p`
    font-size: 23px;
    font-family: "Playwrite BE VLG", sans-serif;
    font-weight: bold;
    color: #FF385C;
`
const RightArea = styled(LeftArea)`
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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

const Header = ({user, isModal}) => {
    return (
        <>
            {isModal && 
                <></> 
                ||
                <>
                    <Container>
                    <LeftArea>
                        <TextLogo>
                            stayandgo
                        </TextLogo>
                    </LeftArea>
                    <RightArea>
                        {user.is_logined &&
                            <>
                                <LinkDiv><LinkText to={'/upload'}>숙소등록</LinkText></LinkDiv>
                                <LinkDiv><LinkText to={'/'}>로그아웃</LinkText></LinkDiv>
                            </>
                        ||
                            <>
                                <LinkDiv><LinkText to={'/'}>로그인</LinkText></LinkDiv>
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