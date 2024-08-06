//나의숙소 예약관리에서 항목 클릭시 나오는 모달 창
import React from "react";
import ImageSlider from "../layout/ImageSlider";
import closeImg from "../../assets/icons/close.png";
import * as Modal from "./MyAccModal.style";
import {MyAccModalProps} from "../../model/profile/myaccReserve"

const MyAccModal: React.FC<MyAccModalProps> = ({
  modalImageIndex,
  setModalImageIndex,
  closeModal,
  author,
  imageUrls,
  title,
  adult,
  child,
  baby,
  amount,
  create_at,
}) => (
  <Modal.ModalOverlay>
    <Modal.ModalContent>
      <Modal.CloseButton onClick={closeModal}>
        <Modal.CloseIcon src={closeImg} alt="닫기" />
      </Modal.CloseButton>
      <Modal.Name>{author}님의 예약</Modal.Name>
      <ImageSlider
        imageUrls={imageUrls}
        currentIndex={modalImageIndex}
        setCurrentIndex={setModalImageIndex}
        size={200}
      />
      <Modal.Title>{title}</Modal.Title>
      <Modal.TextContent>
        <Modal.GuestContent>
          <Modal.DescriptionBold>
            게스트 : 
          </Modal.DescriptionBold>
          <Modal.Description>성인 {adult}명</Modal.Description>
        </Modal.GuestContent>
        <Modal.GuestContent>
          <Modal.TextContent>
            <Modal.Description>어린이 {child}명</Modal.Description>
            <Modal.Description>유아 {baby}명</Modal.Description>
          </Modal.TextContent>
        </Modal.GuestContent>
        <Modal.GuestContent>
          <Modal.DescriptionBold>예약일 :  </Modal.DescriptionBold>
          <Modal.Description>{create_at}</Modal.Description>
        </Modal.GuestContent>
        <Modal.GuestContent>
          <Modal.DescriptionBold>총 금액 : </Modal.DescriptionBold>
          <Modal.Description>{amount.toLocaleString()}원</Modal.Description>
        </Modal.GuestContent>
      </Modal.TextContent>
    </Modal.ModalContent>
  </Modal.ModalOverlay>
);

export default MyAccModal;
