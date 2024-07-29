import React from "react";
import {
  ListItem,
  Image,
  CheckBox,
  DetailContainer,
  Title,
  Description,
  Price,
} from "./MyAccommodationsStyle";

const AccommodationItem = ({ accommodation, checkedButtons, onClickHandleDetail, onChangeHandleCheckBox }) => {
  return (
    <ListItem>
      <Image $imageUrl={accommodation.imageUrl} onClick={() => onClickHandleDetail(accommodation.id)}>
        <CheckBox
          type="checkbox"
          checked={checkedButtons.includes(accommodation.id)}
          onChange={(event) => onChangeHandleCheckBox(event.target.checked, accommodation.id)}
          onClick={(event) => event.stopPropagation()} // 체크박스 클릭 시 부모(상위)태그의 클릭 이벤트 반응(버블링) 막기 위해 사용
        />
      </Image>
      <DetailContainer onClick={() => onClickHandleDetail(accommodation.id)}>
        <Title>{accommodation.title}</Title>
        <Description>{accommodation.description}</Description>
        <Price>{Number(accommodation.price).toLocaleString()}원 / 1박</Price>
      </DetailContainer>
    </ListItem>
  );
};

export default React.memo(AccommodationItem);
