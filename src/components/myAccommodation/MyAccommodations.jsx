import React, { useState } from "react";
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

const MyAccommodations = () => {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([
    {
      id: 1,
      title: "제주의 집",
      description: "[제주애서 하루] 제주 힐링 여행",
      price: "370000",
      imageUrl: "https://a0.muscache.com/im/pictures/d0945841-4745-40d5-a877-de7a28150c19.jpg?im_w=720",
    },
    {
      id: 2,
      title: "부산의 집",
      description: "[부산에서 하루] 부산 힐링 여행",
      price: "420000",
      imageUrl:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0MjgwMTc0OTgwMjIwNDUz/original/57709248-4e52-493b-83d5-4ad7737165a0.jpeg?im_w=320",
    },
    {
      id: 3,
      title: "여수의 집",
      description: "[여수에서 하루] 여수 힐링 여행",
      price: "640000",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-859232603817409995/original/419280ee-b2f6-49a9-b0f6-74f71e8c9c03.jpeg?im_w=320",
    },
    {
      id: 4,
      title: "제주의 집2",
      description: "[제주애서 하루] 제주 힐링 여행",
      price: "370000",
      imageUrl: "https://a0.muscache.com/im/pictures/d0945841-4745-40d5-a877-de7a28150c19.jpg?im_w=720",
    },
    {
      id: 5,
      title: "부산의 집2",
      description: "[부산에서 하루] 부산 힐링 여행",
      price: "420000",
      imageUrl:
        "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0MjgwMTc0OTgwMjIwNDUz/original/57709248-4e52-493b-83d5-4ad7737165a0.jpeg?im_w=320",
    },
    {
      id: 6,
      title: "여수의 집2",
      description: "[여수에서 하루] 여수 힐링 여행",
      price: "640000",
      imageUrl:
        "https://a0.muscache.com/im/pictures/miso/Hosting-859232603817409995/original/419280ee-b2f6-49a9-b0f6-74f71e8c9c03.jpeg?im_w=320",
    },
  ]);

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
            <Image imageUrl={accommodation.imageUrl} onClick={() => onClickHandleDetail}>
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
