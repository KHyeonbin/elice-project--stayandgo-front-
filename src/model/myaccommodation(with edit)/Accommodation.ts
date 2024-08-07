// MyAcommodations.tsx type 선언
export type searchType = {
    city: string,
    adult: number,
    child: number,
    baby: number,
}; 
// Accommodation 타입 정의
export type AccommodationType = {
    nanoid: string,
    main_image: string,
    title: string,
    price: number | string;
};
export type ItemPropsType = {
    accommodation: AccommodationType,
    CheckboxOption: React.FC<any>,
    key: number,
    children?: React.ReactNode; // children 속성 추가
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