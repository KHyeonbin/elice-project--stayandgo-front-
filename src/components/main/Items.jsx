import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import mainPostLoad from "../../api/mainPostLoad";

const Container = styled.div`
    width: 90%;
    height: 100%; // default
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 50px;

`
const ItemDiv = styled.div`
    width: 400px;
    height: 400px;
    border: none;
    cursor: pointer;
    margin: 0 auto;
    opacity: 0;
    transition: opacity 1s;
`
const ItemBackgroundDiv = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.$background})`,
    }
}))`
    width: 400px;
    height: 300px;
    border-radius: 20px;

    background-size: cover;
    background-position: center;
`
const ItemTextDiv = styled.div`
    width: 90%;
    margin-top: 10px;
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

const Items = ({search}) => {
    // 숙소 아이템 목록 상태
    const [posts, setPosts] = useState(null);
    // 페이지네이션 정의
    const [page, setPage] = useState({
        page: 1,
        total: 0,
        totalPage: 0,
    });
    // 메인 첫 페이지 진입 시 search x, category x 인 전체 데이터를 가져옴
    useEffect(() => {
        mainPostLoad.importAll({nowpage: page.page})
        .then(res => {
            console.log(res);
            setPosts(res.posts);
            setPage(res.page)
        })
    },[])

    // IntersectionObserver 를 생성하여 targetRef 가 관찰될 때(.isIntersecting) 투명도를 n 초동안 높이기 위함
    // useRef [] 배열로 관리하기 !
    const targetRef = useRef([]);
    // scroll animation 동작 구현
    useEffect(() => {
        const osv = new IntersectionObserver((e) => {
            e.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.style.opacity = "1";
                } else {
                    entry.target.style.opacity = "0";
                }
            })
        },{
            threshold: 0.25
        });

        targetRef.current.forEach(v => {
            osv.observe(v);
        })
    },[posts]);
    console.log(posts);
    console.log(page);

// page 상태 값에 따라 하단 페이지네이션 원소 배열 생성
    // 5 페이지만 출력하여야 함
    // 테스트로 2 개 씩 2 페이지 출력으로 체크 중
    const pagenationing = useCallback(() => {
        const pageArray = [];

        // 페이지 시작점 계산
        let remainpage = page.page;
        let count = 0;
        while((remainpage - count) % 5 !== 1){
            count++;
        }
        const startpage = page.page - count;

        // 페이지 끝점 계산
        remainpage = startpage + 4;
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
    const pagenateHandle = useCallback((i) => {
        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        
        setTimeout(() => {
            
        }, 200);
    },[]);

    // 이전 버튼 클릭 시 최대 5 페이지 이동 기능
    const pagePrevHandle = useCallback(() => {
        // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 첫 페이지로)
        let i = page.page - 5;
        if(i < 1){
            i = 1;
        }

        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        setMode("loading");
        setTimeout(() => {
            setMode("list");
        }, 200);
    },[page]);

    // 다음 버튼 클릭 시 최대 5 페이지 이동 기능
    const pageNextHandle = useCallback(() => {
        // 이동할 페이지 최대 5 페이지(5 페이지가 안되면 최대한 마지막 페이지로)
        let i = page.page + 5;
        if(i > page.totalPage){
            i = page.totalPage;
        }

        setPage((current) => {
            const newPage = {...current};
            newPage.page = i;
            return newPage;
        });

        setMode("loading");
        setTimeout(() => {
            setMode("list");
        }, 200);
    },[page]);


    return (
        <Container>
            {posts && posts.map((v, i) => (
                <ItemDiv key={i} ref={element => targetRef.current[i] = element}>
                    <ItemBackgroundDiv $background={v.main_image_link} />
                    <ItemTextDiv>
                        <ItemTitle>{v.title}<br /></ItemTitle>
                        <ItemNormalText>호스트: jubilee님<br /></ItemNormalText>
                        <ItemPriceText>{"₩" + Number(v.price).toLocaleString('ko-KR')}</ItemPriceText><ItemNormalText> /인</ItemNormalText>
                    </ItemTextDiv>
                </ItemDiv>
            ))}
            <Pagenation_div>
                <Pagenation_ul>
                    <Pagenation_span>{"<<"}</Pagenation_span>
                        {pagenationing().map((v,i) => {
                            return (
                                <Pagenation_li key={i} onClick={() => pagenateHandle(v)} style={page.page === v ? {fontWeight: "bold", color: "#E61E51"} : {fontWeight: "400", color: "#797979"}}>{v}</Pagenation_li>
                            );
                        })}
                    <Pagenation_span>{">>"}</Pagenation_span>
                </Pagenation_ul>
            </Pagenation_div>
        </Container>
    );
};

export default Items;