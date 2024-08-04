import React, { useCallback, useEffect, useState } from "react";
import {
  ListItem,
  Image,
  DetailContainer,
  Title,
  Price,
} from "./MyAccommodationsStyle";
import { Link } from "react-router-dom";

const AccommodationItem = ({ CheckboxOption, accommodation }) => {
  /** 각 숙소 클릭 시 상세 페이지로 이동 */
  // 숙소 상세 정보를 받고 link + nanoid + 쿼리 스트링 포멧 state
  const [link, setLink] = useState("");
  const [query, setQuery] = useState("");
  // URL 인코딩 전 title String 값 state
  const [beforeTitle, setBeforeTitle] = useState(accommodation.title);

  // detail 페이지 연결은 쿼리 포멧팅 후 쿼리를 적용한 Link 컴포넌트로 연결 
  const formatObject = useCallback((obj, nanoid) => {
    setLink(`/room/my/details/${nanoid}`);
    // URL 에서 일부 특수문자를 포함 시킬 때 URL 인코딩 과정을 추가해야 함.
    obj.contents = encodeURIComponent(obj.contents);
    obj.title = encodeURIComponent(obj.title);
    obj.host_intro = encodeURIComponent(obj.host_intro);
    setQuery(`?${Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&')}`);
    return;
  },[])

  // 숙소 정보를 받아서 쿼리스트링 포멧팅 함수에 전달
  useEffect(() => {
    formatObject(accommodation, accommodation.nanoid);
    return;
  },[]);

  return (
    // Link 컴포넌트 (pathname 은 경로까지만, search 는 나머지 query)
     <Link to={{pathname: link, search: query}}>
      <ListItem>
        <Image $imageUrl={accommodation.main_image} >
          <CheckboxOption key={accommodation.nanoid} value={accommodation.nanoid}
           onClick={(e) => e.stopPropagation()} /> 
           {/* (윗 문장 e.stopPropagation(): 이벤트 전파 방지(Link는 동작안하고 체크박스만 동작하게 함) */}
        </Image>
        <DetailContainer>
          <Title>{beforeTitle}</Title>
          <Price>{Number(accommodation.price).toLocaleString()}원</Price>
        </DetailContainer>
      </ListItem>
     </Link>
  );
};

export default AccommodationItem;
