import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Button,
  ListContainer,
  ListItem,
  Image,
  CheckBox,
  DetailContainer,
  Title,
  Description,
  Price,
} from "./MyAccommodationsStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccommodations = () => {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([]);

  /** 나의 숙소 데이터 가져오기 */
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get("/accommodations/"); // 임시 엔드포인트
        setAccommodations(response.data);
      } catch (error) {
        console.error("숙소 데이터를 불러오는데 실패했습니다.", error);

        // 가져올 숙소데이터가 없을때 더미 데이터 사용
        setAccommodations([
          {
            id: 1,
            title: "제주의 집",
            description: "[제주애서 하루] 제주 힐링 여행",
            price: "370000",
            imageUrl: "https://a0.muscache.com/im/pictures/d0945841-4745-40d5-a877-de7a28150c19.jpg?im_w=720",
            checked: false,
          },
          {
            id: 2,
            title: "부산의 집",
            description: "[부산에서 하루] 부산 힐링 여행",
            price: "420000",
            imageUrl:
              "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0MjgwMTc0OTgwMjIwNDUz/original/57709248-4e52-493b-83d5-4ad7737165a0.jpeg?im_w=320",
            checked: false,
          },
          {
            id: 3,
            title: "여수의 집",
            description: "[여수에서 하루] 여수 힐링 여행",
            price: "640000",
            imageUrl:
              "https://a0.muscache.com/im/pictures/miso/Hosting-859232603817409995/original/419280ee-b2f6-49a9-b0f6-74f71e8c9c03.jpeg?im_w=320",
            checked: false,
          },
          {
            id: 4,
            title: "제주의 집2",
            description: "[제주애서 하루] 제주 힐링 여행",
            price: "370000",
            imageUrl: "https://a0.muscache.com/im/pictures/d0945841-4745-40d5-a877-de7a28150c19.jpg?im_w=720",
            checked: false,
          },
          {
            id: 5,
            title: "부산의 집2",
            description: "[부산에서 하루] 부산 힐링 여행",
            price: "420000",
            imageUrl:
              "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0MjgwMTc0OTgwMjIwNDUz/original/57709248-4e52-493b-83d5-4ad7737165a0.jpeg?im_w=320",
            checked: false,
          },
          {
            id: 6,
            title: "여수의 집2",
            description: "[여수에서 하루] 여수 힐링 여행",
            price: "640000",
            imageUrl:
              "https://a0.muscache.com/im/pictures/miso/Hosting-859232603817409995/original/419280ee-b2f6-49a9-b0f6-74f71e8c9c03.jpeg?im_w=320",
            checked: false,
          },
        ]);
      }
    };

    fetchAccommodations();
  }, []);

  /** 각 숙소 클릭 시 상세 페이지로 이동 */
  const onClickHandleDetail = (id) => {
    navigate(`/accommodation/${id}`);
  };

  /** 체크박스 클릭 시 해당 숙소 checked 상태 변경 */
  const onChangeHandleCheckBox = (id) => {
    setAccommodations((prevAccommodations) =>
      prevAccommodations.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  };

  /** 등록삭제 버튼 클릭 시 */
  const onClickHandleDelete = () => {
    setAccommodations((prevAccommodations) => prevAccommodations.filter((item) => !item.checked));
  };

  return (
    <Container>
      <Header>
        <Button onClick={onClickHandleDelete}>등록 삭제</Button>
      </Header>
      <ListContainer>
        {accommodations.map((accommodation) => (
          <ListItem key={accommodation.id}>
            <Image $imageUrl={accommodation.imageUrl} onClick={() => onClickHandleDetail(accommodation.id)}>
              <CheckBox
                type="checkbox"
                checked={accommodation.checked}
                onChange={() => onChangeHandleCheckBox(accommodation.id)}
              />
            </Image>
            <DetailContainer>
              <Title>{accommodation.title}</Title>
              <Description>{accommodation.description}</Description>
              <Price>{accommodation.price.toLocaleString()}원 / 1박</Price>
            </DetailContainer>
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
};

export default MyAccommodations;
