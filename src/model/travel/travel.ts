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
    NoReservation: React.ReactNode;
    pastPage: DefaultPage;
    setPastPage: React.Dispatch<React.SetStateAction<Page>>;
    title: string;
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
    nanoid: string;
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
    NoReservation: React.ReactNode;
    setUpcomingPage: React.Dispatch<React.SetStateAction<Page>>;
    upcomingPage: Page;
    title: string;
};


// TravelPage.tsx
export interface Option {
    value: string;
    label: string;
}

export interface Page {
    page: number;
    perPage: number;
    total: number;
    totalPage: number;
  }