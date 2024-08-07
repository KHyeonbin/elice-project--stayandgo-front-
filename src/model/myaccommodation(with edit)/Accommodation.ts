// MyAcommodations.tsx type 선언
export type searchType = {
    city: string;
    adult: number;
    child: number;
    baby: number;
}; 
// Accommodation 타입 정의
export type AccommodationType = {
  nanoid: string;
  [key: string]: any; // 추가 필드들에 대한 타입
};
export type ItemPropsType = {
    accommodation: AccommodationType;
    CheckboxOption: React.FC<any>;
    onChangeHandleCheckBox(checkedValue: unknown[]): void;
};



// MyAccommodationModal.tsx type 선언
export type MyModalPropsType = {
    message: string;
    onConfirm(): void;
    onCancel(): void;
}



// AccommodationModal.tsx type 선언
export type ModalPropsType = {
    message: string;
    onClose(): void;
}