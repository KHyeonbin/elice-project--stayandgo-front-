import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import mainPostLoad from "../../api/mainPostLoad";

const Container = styled.div`
    width: 100%;
    height: 100%; // default
    margin-top: 20px;
    display: flex;
    gap: 30px;
    flex-direction: column;
    align-items: center;
`
const ItemDiv = styled.div`
    width: 90%;
    height: 500px;
    border: none;
    cursor: pointer;
`
const ItemBackgroundDiv = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.$background})`,
    }
}))`
    width: 100%;
    height: 400px;
    border-radius: 20px;

    background-size: cover;
    background-repeat: no-repeat;

`
const ItemTextDiv = styled.div`
    width: 90%;
    padding-top: 10px;
`
const ItemTitle = styled.span`
    font-size: 15px;
    font-weight: 500;
`
const ItemNormalText = styled.span`
    font-size: 13px;
    font-weight: 400;
`
const ItemPriceText = styled.span`
    font-size: 13px;
    font-weight: 600;
`

const Pagenation_div = styled.div`
    width: 100%;
    font-size: 20px;
    margin: 0 auto;
    margin-bottom: 100px;
`
const Pagenation_ul = styled.ul`
    width: 100%;
    height: 100%;
    // ul list 그룹의 기본 들여쓰기 제거 (padding-left 0)
    padding-left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Pagenation_span = styled.span`
    cursor: pointer;
    font-weight: bold;
    transition: color 0.5s;
    color: #797979;
 
    &:hover {
        color: #E61E51;
    }
`
const Pagenation_li = styled.li`
    width: 10px;
    list-style: none;
    cursor: pointer;
    transition: color 0.5s;
    color: #797979;

    &:hover {
        color: #E61E51;
    }
`

const Items = ({startSearch, category}) => {
    // 숙소 아이템 목록 상태
    const [posts, setPosts] = useState(null);
    // 페이지네이션 정의 (초기 1페이지만 지정함(perPage 수정은 server 에서 담당)
    const [page, setPage] = useState({
        page: 1,
        perPage: 0,
        total: 0,
        totalPage: 0,
    });
    // 메인 첫 페이지 진입 시 search x, category x 인 전체 데이터를 가져옴
    // 1. 일단 페이지 정보를 먼저 세팅
    useEffect(() => {
        mainPostLoad.getPostsPage({search: startSearch, category})
        .then(res => {
            setPage(res);
        });
    },[startSearch, category]);

    // 2. 이후 페이지 조절 시 페이지에 맞도록 포스트 검색 진행
    useEffect(() => {
        mainPostLoad.getPostsRead({nowpage: page.page, search: startSearch, category})
        .then(res => {
            setPosts(res);
        });
    },[page]);

    // page 상태 값에 따라 하단 페이지네이션 원소 배열 생성
    // 5 페이지만 출력하여야 함
    // 테스트로 2 개 씩 2 페이지 출력으로 체크 중
    const pagenationing = useCallback(() => {
        const pageArray = [];

        // 페이지 시작점 계산
        let remainpage = page.page;
        let count = 0;
        while((remainpage - count) % 2 !== 1){
            count++;
        }
        const startpage = page.page - count;

        // 페이지 끝점 계산
        remainpage = startpage + 1;
        if(remainpage > page.totalPage){
            remainpage = page.totalPage;
        }
        const lastpage = remainpage;

        for(let i = startpage;i <= lastpage; i++){
            pageArray.push(i);
        }
        return pageArray;
    },[page]);

    // 선택한 페이지로 이동 기능
    const pagenateHandle = (i) => {
        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
      
    };
    console.log(page)
    console.log(posts)
    // 이전 버튼 클릭 시 최대 5 페이지 이동 기능
    const pagePrevHandle = () => {
        // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 첫 페이지로)
        let i = page.page - page.perPage;
        if(i < 1){
            i = 1;
        }

        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
       
    };

    // 다음 버튼 클릭 시 최대 5 페이지 이동 기능
    const pageNextHandle = () => {
        // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 마지막 페이지로)
        let i = page.page + page.perPage;
        if(i > page.totalPage){
            i = page.totalPage;
        }

        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
      
    };


    return (
        <Container>
            {posts && posts.map((v, i) => (
                <ItemDiv key={i}>
                    <ItemBackgroundDiv $background={v.main_image/*v.main_image_link*/} />
                    <ItemTextDiv>
                        <ItemTitle>{v.title}<br /></ItemTitle>
                        <ItemNormalText>호스트: jubilee님<br /></ItemNormalText>
                        <ItemPriceText>{"₩" + Number(v.price).toLocaleString('ko-KR')}</ItemPriceText><ItemNormalText> /인</ItemNormalText>
                    </ItemTextDiv>
                </ItemDiv>
            ))}
            <Pagenation_div>
                <Pagenation_ul>
                    <Pagenation_span onClick={pagePrevHandle}>{"<<"}</Pagenation_span>
                        {pagenationing().map((v,i) => {
                            return (
                                <Pagenation_li key={i} onClick={() => pagenateHandle(v)} style={page.page === v ? {fontWeight: "bold", color: "#E61E51"} : {fontWeight: "400", color: "#797979"}}>{v}</Pagenation_li>
                            );
                        })}
                    <Pagenation_span onClick={pageNextHandle}>{">>"}</Pagenation_span>
                </Pagenation_ul>
            </Pagenation_div>
        </Container>
    );
};

export default Items;