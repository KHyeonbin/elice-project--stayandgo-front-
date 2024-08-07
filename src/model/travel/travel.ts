// TravelCard.tsx 파일 타입
export type TravelCardPropsType = {
    title: string;
    main_image: string;
    sub_images: string[];
    name: string;
    startDate: string;
    endDate: string;
    adult: number;
    child: number; 
    baby: number; 
    totalPrice: number;

};



// TravelCategory.tsx 파일 타입
export type TravelCategoryPropsType = {
    pastTravelData: TravelData[];
    noReservation: React.FC;
    pastPage: DefaultPage;
    setPastPage: DefaultPage;
};

export type TravelData = {
    title: string;
    host_nickname: string;
    start_date: string;
    end_date: string;
    amount: number;
    main_image: string;
    sub_images: string[];
    adult: number;
    child: number;
    baby: number;
};

export type DefaultPage = {
    page: number;
    perPage: number;
    total: number;
    totalPage: number;
};



// TravelModal.tsx
export type TravelModalPropsType = {
    modalImageIndex: number;
    setModalImageIndex: React.Dispatch<React.SetStateAction<number>>;
    closeModal(): void;
    name: string;
    imageUrls: string[];
    title: string;
    startDate: string;
    endDate: string;
    adult: number;
    child: number;
    baby: number;
    totalPrice: number;
};



// TravelConfirmModal.tsx
export type TravelConfirmModalPropsType = {
    message: string;
    onConfirm(): void;
    onCancel(): void;
};




// TravelUpcomingCategory.tsx
export type TravelUpcomingCategoryPropsType = {
    setSelectValue: React.Dispatch<React.SetStateAction<Option>>;
    upcomingTravelData: TravelData[];
    noReservation:React.FC;
    setUpcomingPage: React.Dispatch<React.SetStateAction<number>>;
    upcomingPage: React.Dispatch<React.SetStateAction<number>>;
};


// TravelPage.tsx
export interface Option {
    value: string;
    label: string;
}