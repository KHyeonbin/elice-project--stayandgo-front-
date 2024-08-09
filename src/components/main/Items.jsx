import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import mainPostLoad from "../../api/mainPostLoad";
import main_no_data from '../../assets/images/main_no_data.png';
import OneItem from "./OneItem";
import loading from '../../assets/icons/loading.png';

const Container = styled.div`
    width: 100%;
    height: 100%; // default
    margin-top: 20px;
    display: flex;
    gap: 30px;
    flex-direction: column;
    align-items: center;
`
// 피드백 반영 (NoItem 스타일드컴포넌트 작성)
const NoItemContainer = styled.div`
    padding-top: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NoItem = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.$main_no_data})`
    }
}))`
    width: 100px;
    height: 100px;
`
const NoItemSpan = styled.span`
    font-size: 20px;
    color: #E61E51;
`

const Pagenation_div = styled.div`
    width: 100%;
    font-size: 17px;
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
const Loading_div = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40%;
`
const Loading_img = styled.img`
    /* 회전 애니메이션 */
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
`

const Items = ({page, setPage, startSearch, category}) => {
    // 숙소 아이템 목록 상태
    const [posts, setPosts] = useState(null);
    // is loading
    const [isLoading, setIsLoading] = useState(false);
    
    // 메인 첫 페이지 진입 시 search x, category x 인 전체 데이터를 가져옴
    // 1. 일단 페이지 정보를 먼저 세팅 (페이지 정보는 case1. 검색 버튼으로 검색 시작, case2. category 변동 에만 추가로 필요함)
    // 2. 이후 페이지 조절 시 페이지에 맞도록 포스트 검색 진행
    useEffect(() => {
        if(page && page.page === 1){
            mainPostLoad.getPostsPage({search: startSearch, category, mymode: false})
            .then(res => {
                setPage(res);
            });
            mainPostLoad.getPostsRead({nowpage: page.page, search: startSearch, category, mymode: false})
            .then(res => {
                setPosts(res);
            });
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 250);
        } else if(page && page.page > 1) {
            mainPostLoad.getPostsRead({nowpage: page.page, search: startSearch, category, mymode: false})
            .then(res => {
                setPosts(res);
            });
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 250);
        }        
    },[startSearch, category, page.page]);

    
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
    console.log(category)
    // 이전 버튼 클릭 시 최대 5 페이지 이동 기능
    const pagePrevHandle = () => {
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

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
       
    };

    // 다음 버튼 클릭 시 최대 5 페이지 이동 기능
    const pageNextHandle = () => {
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

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    };

    return (
        <Container>
            {!isLoading
                &&
            <>    
                {posts && posts.map((v, i) => (
                    <OneItem key={i} v={v} startSearch={startSearch} />
                ))}
                {posts && posts.length === 0 &&
                    <NoItemContainer>
                        <NoItem $main_no_data={main_no_data}></NoItem>
                        <NoItemSpan>데이터가 존재하지 않습니다</NoItemSpan>
                    </NoItemContainer>  
                ||
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
                }
            </>
            ||
                <Loading_div>
                    <Loading_img src={loading} style={{animation: "spin 0.5s 3 linear"}} />
                </Loading_div>
            } 
        </Container>
    );
};

export default Items;