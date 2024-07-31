import React from "react";
import {
  ListItem,
  Image,
  DetailContainer,
  Title,
  Price,
} from "./MyAccommodationsStyle";

const AccommodationItem = ({ keys, CheckboxOption, accommodation, onClickHandleDetail }) => {
  return (
    <ListItem>
      <Image $imageUrl={accommodation.main_image} >
        <CheckboxOption key={keys} value={accommodation.nanoid}/>
      </Image>
      <DetailContainer onClick={() => onClickHandleDetail(accommodation.nanoid)}>
        <Title>{accommodation.title}</Title>
        <Price>{Number(accommodation.price).toLocaleString()}원</Price>
      </DetailContainer>
    </ListItem>
  );
};

export default React.memo(AccommodationItem);
